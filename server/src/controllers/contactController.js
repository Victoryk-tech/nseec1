import Contact from "../models/Contact.js";
import { success, created, error, notFound, badRequest } from "../utils/response.js";
import { paginate, paginatedResponse } from "../utils/pagination.js";
import { sendContactConfirmationEmail, sendContactReplyEmail } from "../emails/services/contactEmail.js";
import { sendNewContactNotification } from "../emails/services/notificationEmail.js";
import { notifyRoles } from "../utils/notificationHelper.js";
import logger from "../utils/logger.js";

export const submitContact = async (req, res) => {
  const { name, email, subject, message } = req.body;
  try {
    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
    });

    // Confirmation to sender
    sendContactConfirmationEmail({ name, email, subject }).catch((err) =>
      logger.error("Contact confirmation email failed:", err.message)
    );

    // Notification to admin
    const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_REPLY_TO;
    if (adminEmail) {
      sendNewContactNotification({ to: adminEmail, contact }).catch((err) =>
        logger.error("Contact admin notification failed:", err.message)
      );
    }

    // Dashboard notification for all admins
    notifyRoles(["superAdmin", "admin"], {
      type: "CONTACT_RECEIVED",
      title: "New Contact Message",
      message: `${name} sent a message — "${subject}"`,
      link: "/dashboard/contacts",
      actorName: name,
      resource: "contact",
      resourceId: String(contact._id),
    }).catch(() => {});

    logger.info(`[CONTACT] New submission from ${email} — subject: "${subject}"`);
    return created(
      res,
      "Your message has been received. We'll get back to you within 2–3 business days.",
      { id: contact._id }
    );
  } catch (err) {
    logger.error("Submit contact error:", err);
    return error(res);
  }
};

export const getContacts = async (req, res) => {
  try {
    const { page, limit, skip } = paginate(req.query);
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.priority) filter.priority = req.query.priority;
    if (req.query.search) {
      const re = new RegExp(req.query.search, "i");
      filter.$or = [{ name: re }, { email: re }, { subject: re }];
    }

    const [data, total] = await Promise.all([
      Contact.find(filter)
        .populate("assignedTo", "name email")
        .populate("replies.sentBy", "name")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Contact.countDocuments(filter),
    ]);

    return success(res, "Contacts retrieved", paginatedResponse(data, total, page, limit));
  } catch (err) {
    logger.error("Get contacts error:", err);
    return error(res);
  }
};

export const getContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: { status: "read" } },
      { new: true }
    )
      .populate("assignedTo", "name email")
      .populate("replies.sentBy", "name");

    if (!contact) return notFound(res, "Contact not found");
    return success(res, "Contact retrieved", { contact });
  } catch (err) {
    return error(res);
  }
};

export const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!contact) return notFound(res, "Contact not found");
    return success(res, "Contact updated", { contact });
  } catch (err) {
    return error(res);
  }
};

export const replyToContact = async (req, res) => {
  const { message } = req.body;
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return notFound(res, "Contact not found");

    contact.replies.push({ message, sentBy: req.user._id });
    contact.status = "replied";
    await contact.save();

    await sendContactReplyEmail({
      name: contact.name,
      email: contact.email,
      subject: contact.subject,
      replyMessage: message,
    }).catch(() => {});

    return success(res, "Reply sent successfully", { contact });
  } catch (err) {
    logger.error("Reply contact error:", err);
    return error(res);
  }
};

export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return notFound(res, "Contact not found");
    return success(res, "Contact deleted");
  } catch (err) {
    return error(res);
  }
};

export const getContactStats = async (req, res) => {
  try {
    const [total, newCount, read, replied, archived] = await Promise.all([
      Contact.countDocuments(),
      Contact.countDocuments({ status: "new" }),
      Contact.countDocuments({ status: "read" }),
      Contact.countDocuments({ status: "replied" }),
      Contact.countDocuments({ status: "archived" }),
    ]);
    return success(res, "Contact stats", { total, new: newCount, read, replied, archived });
  } catch (err) {
    return error(res);
  }
};
