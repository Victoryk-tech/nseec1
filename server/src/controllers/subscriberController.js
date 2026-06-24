import Subscriber from "../models/Subscriber.js";
import { success, created, error, notFound, badRequest } from "../utils/response.js";
import { paginate, paginatedResponse } from "../utils/pagination.js";
import { sendSubscriberWelcomeEmail, sendUnsubscribeConfirmationEmail } from "../emails/services/subscriberEmail.js";
import { sendNewSubscriberNotification } from "../emails/services/notificationEmail.js";
import { notifyRoles } from "../utils/notificationHelper.js";
import logger from "../utils/logger.js";

export const getSubscribers = async (req, res) => {
  try {
    const { page, limit, skip } = paginate(req.query);
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.search) {
      const re = new RegExp(req.query.search, "i");
      filter.$or = [{ name: re }, { email: re }];
    }

    const [data, total] = await Promise.all([
      Subscriber.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Subscriber.countDocuments(filter),
    ]);

    return success(res, "Subscribers retrieved", paginatedResponse(data, total, page, limit));
  } catch (err) {
    logger.error("Get subscribers error:", err);
    return error(res);
  }
};

export const getSubscriber = async (req, res) => {
  try {
    const sub = await Subscriber.findById(req.params.id);
    if (!sub) return notFound(res, "Subscriber not found");
    return success(res, "Subscriber retrieved", { subscriber: sub });
  } catch (err) {
    return error(res);
  }
};

export const addSubscriber = async (req, res) => {
  const { email, name, source } = req.body;
  const isWebsite = source === "website";
  try {
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      if (existing.status === "unsubscribed") {
        existing.status = "active";
        existing.name = name || existing.name;
        await existing.save();
        const msg = isWebsite
          ? "Welcome back! You've been re-added to our newsletter."
          : "Subscriber re-activated successfully.";
        return success(res, msg, { subscriber: existing });
      }
      const msg = isWebsite
        ? "This email is already on our mailing list."
        : "This email is already subscribed.";
      return badRequest(res, msg);
    }

    const sub = await Subscriber.create({
      email,
      name,
      source: source || "dashboard",
      ipAddress: req.ip,
    });

    const unsubscribeUrl = `${process.env.CLIENT_URL}/unsubscribe?token=${sub.unsubscribeToken}`;
    await sendSubscriberWelcomeEmail({ name, email, unsubscribeUrl }).catch(() => {});
    await sendNewSubscriberNotification({ to: process.env.ADMIN_EMAIL, subscriber: sub }).catch(() => {});

    notifyRoles(["superAdmin", "admin"], {
      type: "SUBSCRIBER_JOINED",
      title: "New Newsletter Subscriber",
      message: `${name || email} subscribed to the NSSEC newsletter`,
      link: "/dashboard/subscribers",
      actorName: name || email,
      resource: "subscriber",
      resourceId: String(sub._id),
    }).catch(() => {});

    const msg = isWebsite
      ? "You're subscribed! Check your inbox for a welcome email."
      : "Subscriber added successfully.";
    return created(res, msg, { subscriber: sub });
  } catch (err) {
    logger.error("Add subscriber error:", err);
    return error(res);
  }
};

export const updateSubscriber = async (req, res) => {
  try {
    const sub = await Subscriber.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!sub) return notFound(res, "Subscriber not found");
    return success(res, "Subscriber updated", { subscriber: sub });
  } catch (err) {
    return error(res);
  }
};

export const deleteSubscriber = async (req, res) => {
  try {
    const sub = await Subscriber.findByIdAndDelete(req.params.id);
    if (!sub) return notFound(res, "Subscriber not found");
    return success(res, "Subscriber deleted");
  } catch (err) {
    return error(res);
  }
};

export const getSubscriberStats = async (req, res) => {
  try {
    const [total, active, unsubscribed, bounced, thisMonth] = await Promise.all([
      Subscriber.countDocuments(),
      Subscriber.countDocuments({ status: "active" }),
      Subscriber.countDocuments({ status: "unsubscribed" }),
      Subscriber.countDocuments({ status: "bounced" }),
      Subscriber.countDocuments({ createdAt: { $gte: new Date(new Date().setDate(1)) } }),
    ]);

    return success(res, "Subscriber stats", { total, active, unsubscribed, bounced, thisMonth });
  } catch (err) {
    return error(res);
  }
};

export const unsubscribeByToken = async (req, res) => {
  const { token } = req.params;
  try {
    const sub = await Subscriber.findOne({ unsubscribeToken: token }).select("+unsubscribeToken");
    if (!sub) return notFound(res, "Invalid unsubscribe link");

    if (sub.status === "unsubscribed") {
      return success(res, "You are already unsubscribed.");
    }

    sub.status = "unsubscribed";
    sub.unsubscribedAt = new Date();
    await sub.save();

    await sendUnsubscribeConfirmationEmail({ name: sub.name, email: sub.email }).catch(() => {});

    return success(res, "You have been unsubscribed successfully.");
  } catch (err) {
    return error(res);
  }
};

export const exportSubscribers = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    const subs = await Subscriber.find(filter).select("name email status source createdAt").lean();

    const csv = [
      "Name,Email,Status,Source,Subscribed At",
      ...subs.map((s) => `"${s.name || ""}","${s.email}","${s.status}","${s.source || ""}","${new Date(s.createdAt).toISOString()}"`),
    ].join("\n");

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=subscribers.csv");
    return res.send(csv);
  } catch (err) {
    return error(res);
  }
};
