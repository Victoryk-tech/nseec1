import { Building2, Users, Award, School, Shield, BookOpen, Settings, UserCheck } from "lucide-react";

export const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export const NIGERIAN_STATES = [
  "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno",
  "Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT - Abuja","Gombe",
  "Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos",
  "Nasarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto",
  "Taraba","Yobe","Zamfara",
];

export const STEPS = [
  { id: 0, title: "General Information",       shortTitle: "General",      icon: Building2, desc: "School identity & location" },
  { id: 1, title: "Staff & Learners",           shortTitle: "Staff",        icon: Users,     desc: "Staff strength & learner population" },
  { id: 2, title: "Achievements & Standards",   shortTitle: "Achievements", icon: Award,     desc: "Exam results & student activities" },
  { id: 3, title: "Learning Environment",       shortTitle: "Facilities",   icon: School,    desc: "Infrastructure & facilities" },
  { id: 4, title: "Care, Guidance & Safety",    shortTitle: "Care",         icon: Shield,    desc: "Welfare, discipline & safety" },
  { id: 5, title: "Teaching & Curriculum",      shortTitle: "Teaching",     icon: BookOpen,  desc: "Quality of teaching & curriculum" },
  { id: 6, title: "Leadership & Management",    shortTitle: "Leadership",   icon: Settings,  desc: "Management records & effectiveness" },
  { id: 7, title: "Evaluator Section",          shortTitle: "Evaluator",    icon: UserCheck, desc: "Evaluator observations & sign-off" },
];

export const QUALITY     = ["Very Good", "Good", "Fair", "Poor"];
export const YES_NO      = ["Yes", "No"];
export const AVAIL       = ["Available", "Not Available"];
export const PERFORMANCE = ["Very Good", "Good", "Fair", "Poor"];

export const INITIAL_FORM = {
  // Section 0
  schoolName: "", schoolEmail: "", state: "", lga: "", gps: "",
  schoolAddress: "", location: "", session: "", yearEstablished: "",
  schoolTelephone: "", schoolType: "", categoryOfSchool: "", schoolClass: "",
  attendanceTeaching: "", attendanceNonTeaching: "",
  // Section 1
  teachingStaffMale: "", teachingStaffFemale: "",
  nonTeachingStaffMale: "", nonTeachingStaffFemale: "",
  permanentStaff: "", temporaryStaff: "",
  totalBoys: "", totalGirls: "", learnersWithSpecialNeeds: "", dropoutCount: "",
  dropoutReasons: [],
  // Section 2
  internalExamResults: "", waecResults: "", necoResults: "", nbaisResults: "", nabtebResults: "",
  waecPerformance: "", necoPerformance: "", nbaisPerformance: "", nabtebPerformance: "",
  schoolPrefects: "", learnersRepCouncil: "", communityContribution: "",
  coCurricularActivities: "", breaktime: "", orderlyMovement: "", selfEsteemDisplay: "", genderEquality: "",
  // Section 3
  classroomsRating: "", classroomFurniture: "", adminBlock: "", staffOffices: "",
  laboratories: "", sportingFacilities: "", clinic: "", hostels: "", diningHall: "",
  guidanceCounsellingUnit: "", guidanceCounsellingPersonnel: "", library: "", ict: "",
  waterFacility: "", electricitySupply: "", alternativePower: "", incinerator: "", schoolFarm: "",
  // Section 4
  casesOfIndiscipline: "", typesOfIndiscipline: [],
  openDays: "", extraSupport: "", specialNeedsProvision: "",
  documentedSchoolRules: "", learnersSafeToReport: "", genderIncentives: "",
  mentorPatron: "", mentoringByTeachers: "", securityFenced: "", fireExtinguishers: "",
  securityEmergencyNumber: "", safeSchoolsInitiative: "", othersQualityCare: "", schoolEnvironment: "",
  // Section 5
  lessonPlan: "", learningObjectivesPlan: "", learningObjectivesBoard: "",
  knowledgeOfTopic: "", classroomManagement: "", learningResource: "",
  teachingMethodology: "", learnersParticipation: "", lessonEvaluation: "",
  nationalCurriculum: "", examinationSyllabus: [],
  internalExamResultsCurriculum: "", externalExamResults: "", externalExamPerformance: "",
  clubsAndSocieties: "", schemeOfWork: "", continuousAssessmentRecords: "",
  // Section 6
  visionMissionStatement: "", attendanceRegister: "", logbook: "",
  rewardBook: "", punishmentBook: "", visitorsBook: "", schoolSelfEvaluation: "",
  laurelsWon: "", recentMonitoring: "", recentMonitoringYear: "", recentMonitoringAgency: [],
  recordKeeping: "", committeeSystem: "", monitoringSupervision: "",
  empoweringVP: "", teachersMotivation: "",
  principalName: "", principalPhone: "", visitDate: "",
  // Section 7
  schoolDoesWell:       ["", "", ""],
  areasForImprovement:  ["", "", ""],
  recommendations:      ["", "", ""],
  evaluatorName: "", leadEvaluatorName: "",
};

export const STEP_VALIDATION = {
  0: (f) => !!f.schoolName.trim() && !!f.state,
  7: (f) => !!f.evaluatorName.trim(),
};

export const canProceed = (step, form) => {
  if (STEP_VALIDATION[step]) return STEP_VALIDATION[step](form);
  return true;
};
