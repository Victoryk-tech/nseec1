import mongoose from "mongoose";

const { Schema } = mongoose;

const MandESubmissionSchema = new Schema(
  {
    // ── Submission metadata ───────────────────────────────────────────────
    submissionType: {
      type: String,
      enum: ["web", "pdf"],
      required: true,
      default: "web",
    },
    status: {
      type: String,
      enum: ["pending", "reviewed", "archived"],
      default: "pending",
      index: true,
    },
    pdfUrl: String,
    pdfCloudinaryId: String,
    submittedAt: { type: Date, default: Date.now },
    reviewedBy: { type: Schema.Types.ObjectId, ref: "User" },
    reviewedAt: Date,
    adminNotes: String,

    // ── Section 0: General Information ──────────────────────────────────
    schoolName: { type: String, required: true, trim: true },
    schoolEmail: { type: String, trim: true, lowercase: true },
    state: { type: String, trim: true },
    lga: { type: String, trim: true },
    gps: String,
    schoolAddress: String,
    location: String,
    session: String,
    yearEstablished: Number,
    schoolTelephone: String,
    schoolType: { type: String, enum: ["public", "private", ""] },
    categoryOfSchool: { type: String, enum: ["day", "boarding", "day_boarding", ""] },
    schoolClass: { type: String, enum: ["boys", "girls", "co_education", ""] },
    attendanceTeaching: Number,
    attendanceNonTeaching: Number,

    // ── Staff Strength ────────────────────────────────────────────────
    teachingStaffMale: Number,
    teachingStaffFemale: Number,
    nonTeachingStaffMale: Number,
    nonTeachingStaffFemale: Number,
    permanentStaff: Number,
    temporaryStaff: Number,

    // ── Learners Population ───────────────────────────────────────────
    totalBoys: Number,
    totalGirls: Number,
    learnersWithSpecialNeeds: Number,
    dropoutCount: Number,
    dropoutReasons: [String],

    // ── Section 1: Achievements & Standards ──────────────────────────
    internalExamResults: String,
    waecResults: String,
    necoResults: String,
    nbaisResults: String,
    nabtebResults: String,
    waecPerformance: String,
    necoPerformance: String,
    nbaisPerformance: String,
    nabtebPerformance: String,
    schoolPrefects: String,
    learnersRepCouncil: String,
    communityContribution: String,
    coCurricularActivities: String,
    breaktime: String,
    orderlyMovement: String,
    selfEsteemDisplay: String,
    genderEquality: String,

    // ── Section 2: Learning & Environment ────────────────────────────
    classroomsRating: { type: Number, min: 1, max: 4 },
    classroomFurniture: String,
    adminBlock: String,
    staffOffices: String,
    laboratories: String,
    sportingFacilities: String,
    clinic: String,
    hostels: String,
    diningHall: String,
    guidanceCounsellingUnit: String,
    guidanceCounsellingPersonnel: String,
    library: String,
    ict: String,
    waterFacility: String,
    electricitySupply: String,
    alternativePower: String,
    incinerator: String,
    schoolFarm: String,
    otherRevenue: String,

    // ── Section 3: Quality of Care, Guidance & Safety ────────────────
    casesOfIndiscipline: String,
    typesOfIndiscipline: [String],
    openDays: String,
    extraSupport: String,
    specialNeedsProvision: String,
    documentedSchoolRules: String,
    learnersSafeToReport: String,
    genderIncentives: String,
    mentorPatron: String,
    mentoringByTeachers: String,
    securityFenced: String,
    fireExtinguishers: String,
    securityEmergencyNumber: String,
    safeSchoolsInitiative: String,
    othersQualityCare: String,
    schoolEnvironment: String,

    // ── Section 4: Quality of Teaching & Learning ────────────────────
    lessonPlan: String,
    learningObjectivesPlan: String,
    learningObjectivesBoard: String,
    knowledgeOfTopic: String,
    classroomManagement: String,
    learningResource: String,
    teachingMethodology: String,
    learnersParticipation: String,
    lessonEvaluation: String,

    // ── Section 5: Quality of Curriculum & Other Activities ─────────
    nationalCurriculum: String,
    examinationSyllabus: [String],
    internalExamResultsCurriculum: String,
    externalExamResults: String,
    externalExamPerformance: String,
    clubsAndSocieties: String,
    schemeOfWork: String,
    continuousAssessmentRecords: String,

    // ── Section 6: Leadership & Management ───────────────────────────
    visionMissionStatement: String,
    attendanceRegister: String,
    logbook: String,
    rewardBook: String,
    punishmentBook: String,
    visitorsBook: String,
    schoolSelfEvaluation: String,
    laurelsWon: String,
    recentMonitoring: String,
    recentMonitoringYear: String,
    recentMonitoringAgency: [String],
    recordKeeping: String,
    committeeSystem: String,
    monitoringSupervision: String,
    empoweringVP: String,
    teachersMotivation: String,
    principalName: String,
    principalPhone: String,
    visitDate: Date,

    // ── Evaluator Section ─────────────────────────────────────────────
    schoolDoesWell: [String],
    areasForImprovement: [String],
    recommendations: [String],
    evaluatorName: String,
    leadEvaluatorName: String,
  },
  { timestamps: true }
);

MandESubmissionSchema.index({ createdAt: -1 });
MandESubmissionSchema.index({ state: 1, status: 1 });
MandESubmissionSchema.index({ schoolName: "text", state: "text", evaluatorName: "text" });

export default mongoose.model("MandESubmission", MandESubmissionSchema);
