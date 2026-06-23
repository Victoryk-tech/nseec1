import MandESubmission from "../models/MandESubmission.js";
import { uploadToCloudinary } from "../config/cloudinary.js";
import { sendMandEConfirmationEmail, sendMandEAdminNotification } from "../emails/services/mandEEmail.js";
import { success, created, error, badRequest, notFound } from "../utils/response.js";
import logger from "../utils/logger.js";

// ── POST /api/v1/mande/submit ─────────────────────────────────────────────
export const submitWebForm = async (req, res) => {
  try {
    const body = req.body;

    if (!body.schoolName?.trim()) {
      return badRequest(res, "School name is required");
    }

    const submission = new MandESubmission({
      submissionType: "web",
      ...body,
      dropoutReasons: body.dropoutReasons || [],
      typesOfIndiscipline: body.typesOfIndiscipline || [],
      examinationSyllabus: body.examinationSyllabus || [],
      recentMonitoringAgency: body.recentMonitoringAgency || [],
      schoolDoesWell: body.schoolDoesWell || [],
      areasForImprovement: body.areasForImprovement || [],
      recommendations: body.recommendations || [],
    });

    await submission.save();

    // Send emails (non-blocking)
    const emailData = {
      schoolName: submission.schoolName,
      schoolEmail: submission.schoolEmail,
      state: submission.state,
      submissionType: "web",
      submissionId: submission._id.toString(),
    };

    Promise.all([
      sendMandEConfirmationEmail(emailData).catch((e) => logger.error("M&E confirmation email failed", e)),
      sendMandEAdminNotification(emailData).catch((e) => logger.error("M&E admin notification failed", e)),
    ]);

    return created(res, "M&E form submitted successfully", {
      submissionId: submission._id,
      schoolName: submission.schoolName,
    });
  } catch (err) {
    logger.error("submitWebForm error", err);
    return error(res, "Failed to submit M&E form. Please try again.");
  }
};

// ── POST /api/v1/mande/submit-pdf ─────────────────────────────────────────
export const submitPdf = async (req, res) => {
  try {
    const { schoolName, schoolEmail, state, evaluatorName } = req.body;

    if (!schoolName?.trim()) {
      return badRequest(res, "School name is required");
    }
    if (!req.file) {
      return badRequest(res, "PDF file is required");
    }
    if (req.file.mimetype !== "application/pdf") {
      return badRequest(res, "Only PDF files are accepted");
    }

    let pdfUrl = "";
    let pdfCloudinaryId = "";

    try {
      const result = await uploadToCloudinary(req.file.buffer, {
        folder: "nssec/mande-submissions",
        resource_type: "raw",
        format: "pdf",
        public_id: `mande_${Date.now()}_${schoolName.trim().toLowerCase().replace(/\s+/g, "_")}`,
      });
      pdfUrl = result.secure_url;
      pdfCloudinaryId = result.public_id;
    } catch (uploadErr) {
      logger.error("Cloudinary PDF upload failed", uploadErr);
      return error(res, "Failed to upload PDF. Please try again.");
    }

    const submission = new MandESubmission({
      submissionType: "pdf",
      schoolName: schoolName.trim(),
      schoolEmail: schoolEmail?.trim()?.toLowerCase() || "",
      state: state?.trim() || "",
      evaluatorName: evaluatorName?.trim() || "",
      pdfUrl,
      pdfCloudinaryId,
    });

    await submission.save();

    const emailData = {
      schoolName: submission.schoolName,
      schoolEmail: submission.schoolEmail,
      state: submission.state,
      submissionType: "pdf",
      submissionId: submission._id.toString(),
    };

    Promise.all([
      sendMandEConfirmationEmail(emailData).catch((e) => logger.error("M&E PDF confirmation email failed", e)),
      sendMandEAdminNotification(emailData).catch((e) => logger.error("M&E PDF admin notification failed", e)),
    ]);

    return created(res, "M&E PDF submitted successfully", {
      submissionId: submission._id,
      schoolName: submission.schoolName,
      pdfUrl,
    });
  } catch (err) {
    logger.error("submitPdf error", err);
    return error(res, "Failed to submit M&E PDF. Please try again.");
  }
};

// ── GET /api/v1/mande (admin) ─────────────────────────────────────────────
export const listSubmissions = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit) || 20));
    const skip = (page - 1) * limit;
    const { status, state, type, search } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (state) filter.state = new RegExp(state, "i");
    if (type) filter.submissionType = type;
    if (search) filter.$text = { $search: search };

    const [submissions, total] = await Promise.all([
      MandESubmission.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select("schoolName schoolEmail state submissionType status createdAt pdfUrl evaluatorName principalName")
        .lean(),
      MandESubmission.countDocuments(filter),
    ]);

    return success(res, "Submissions retrieved", {
      submissions,
      pagination: { total, page, limit, pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    logger.error("listSubmissions error", err);
    return error(res, "Failed to retrieve submissions");
  }
};

// ── GET /api/v1/mande/:id (admin) ─────────────────────────────────────────
export const getSubmission = async (req, res) => {
  try {
    const submission = await MandESubmission.findById(req.params.id).lean();
    if (!submission) return notFound(res, "Submission not found");
    return success(res, "Submission retrieved", { submission });
  } catch (err) {
    logger.error("getSubmission error", err);
    return error(res, "Failed to retrieve submission");
  }
};

// ── PATCH /api/v1/mande/:id/status (admin) ────────────────────────────────
export const updateSubmissionStatus = async (req, res) => {
  try {
    const { status, adminNotes } = req.body;
    const allowed = ["pending", "reviewed", "archived"];
    if (!allowed.includes(status)) {
      return badRequest(res, `Status must be one of: ${allowed.join(", ")}`);
    }

    const update = { status };
    if (adminNotes !== undefined) update.adminNotes = adminNotes;
    if (status === "reviewed") {
      update.reviewedBy = req.user?._id;
      update.reviewedAt = new Date();
    }

    const submission = await MandESubmission.findByIdAndUpdate(
      req.params.id,
      { $set: update },
      { new: true, runValidators: true }
    ).lean();

    if (!submission) return notFound(res, "Submission not found");
    return success(res, "Status updated", { submission });
  } catch (err) {
    logger.error("updateSubmissionStatus error", err);
    return error(res, "Failed to update submission status");
  }
};
