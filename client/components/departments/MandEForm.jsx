"use client";
import { useState, useRef, useCallback } from "react";
import {
  Download, Upload, CheckCircle, AlertCircle, Loader2, FileText,
  ArrowLeft, ArrowRight, Building2, Users, Award, BookOpen,
  Shield, Settings, UserCheck, ChevronRight, School, X,
} from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

const NIGERIAN_STATES = [
  "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno",
  "Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT - Abuja","Gombe",
  "Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos",
  "Nasarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto",
  "Taraba","Yobe","Zamfara",
];

const STEPS = [
  { id: 0, title: "General Information", icon: Building2 },
  { id: 1, title: "Staff & Learners", icon: Users },
  { id: 2, title: "Achievements & Standards", icon: Award },
  { id: 3, title: "Learning Environment", icon: School },
  { id: 4, title: "Care, Guidance & Safety", icon: Shield },
  { id: 5, title: "Teaching & Curriculum", icon: BookOpen },
  { id: 6, title: "Leadership & Management", icon: Settings },
  { id: 7, title: "Evaluator Section", icon: UserCheck },
];

const QUALITY = ["Very Good", "Good", "Fair", "Poor"];
const YES_NO = ["Yes", "No"];
const AVAIL = ["Available", "Not Available"];
const PERFORMANCE = ["Very Good", "Good", "Fair", "Poor"];

const INITIAL_FORM = {
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
  schoolDoesWell: ["", "", ""],
  areasForImprovement: ["", "", ""],
  recommendations: ["", "", ""],
  evaluatorName: "", leadEvaluatorName: "",
};

// ── Reusable field components ─────────────────────────────────────────────

const cls = (err) =>
  `w-full rounded-xl border px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 ${
    err
      ? "border-red-400 bg-red-50/40 focus:ring-red-200"
      : "border-gray-200 bg-white focus:border-[#24c2c2] focus:ring-[#24c2c2]/20"
  }`;

function Field({ label, required, error, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{error}</p>}
    </div>
  );
}

function Input({ label, name, value, onChange, type = "text", required, error, placeholder }) {
  return (
    <Field label={label} required={required} error={error}>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cls(error)}
      />
    </Field>
  );
}

function Select({ label, name, value, onChange, options, required, error, placeholder = "Select..." }) {
  return (
    <Field label={label} required={required} error={error}>
      <select name={name} value={value} onChange={onChange} className={cls(error)}>
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>
        ))}
      </select>
    </Field>
  );
}

function RadioGroup({ label, name, value, onChange, options, required }) {
  return (
    <Field label={label} required={required}>
      <div className="flex flex-wrap gap-3 mt-1">
        {options.map((o) => {
          const val = o.value ?? o;
          const lbl = o.label ?? o;
          return (
            <label key={val} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border cursor-pointer text-sm transition-all ${
              value === val
                ? "border-[#24c2c2] bg-[#24c2c2]/10 text-[#0e4f6b] font-semibold"
                : "border-gray-200 text-gray-600 hover:border-[#24c2c2]/50"
            }`}>
              <input type="radio" name={name} value={val} checked={value === val} onChange={onChange} className="sr-only" />
              <span className={`w-3.5 h-3.5 rounded-full border-2 flex-shrink-0 transition-colors ${
                value === val ? "border-[#24c2c2] bg-[#24c2c2]" : "border-gray-300"
              }`} />
              {lbl}
            </label>
          );
        })}
      </div>
    </Field>
  );
}

function CheckboxGroup({ label, name, values, onChange, options }) {
  const toggle = (val) => {
    const next = values.includes(val) ? values.filter((v) => v !== val) : [...values, val];
    onChange({ target: { name, value: next } });
  };
  return (
    <Field label={label}>
      <div className="flex flex-wrap gap-2 mt-1">
        {options.map((o) => {
          const val = o.value ?? o;
          const lbl = o.label ?? o;
          const checked = values.includes(val);
          return (
            <button type="button" key={val} onClick={() => toggle(val)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-medium transition-all ${
                checked
                  ? "border-[#24c2c2] bg-[#24c2c2]/10 text-[#0e4f6b]"
                  : "border-gray-200 text-gray-500 hover:border-[#24c2c2]/40"
              }`}>
              <span className={`w-3.5 h-3.5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                checked ? "border-[#24c2c2] bg-[#24c2c2]" : "border-gray-300"
              }`}>
                {checked && <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5 3.5-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              </span>
              {lbl}
            </button>
          );
        })}
      </div>
    </Field>
  );
}

function SectionTitle({ children }) {
  return (
    <h3 className="text-[#0e4f6b] font-bold text-sm uppercase tracking-widest border-b border-[#24c2c2]/20 pb-2 mb-5 pt-2">
      {children}
    </h3>
  );
}

// ── Step renderers ────────────────────────────────────────────────────────

function Step0({ form, onChange, errors }) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="sm:col-span-2">
          <Input label="School Name" name="schoolName" value={form.schoolName} onChange={onChange} required error={errors.schoolName} placeholder="Full official name of the school" />
        </div>
        <Input label="School Email" name="schoolEmail" value={form.schoolEmail} onChange={onChange} type="email" placeholder="school@example.edu.ng" />
        <Input label="School Telephone" name="schoolTelephone" value={form.schoolTelephone} onChange={onChange} placeholder="+234..." />
        <Select label="State" name="state" value={form.state} onChange={onChange} options={NIGERIAN_STATES} required error={errors.state} />
        <Input label="Local Government Area (LGA)" name="lga" value={form.lga} onChange={onChange} placeholder="LGA name" />
        <div className="sm:col-span-2">
          <Input label="School Address" name="schoolAddress" value={form.schoolAddress} onChange={onChange} placeholder="Full address" />
        </div>
        <Input label="GPS Coordinates" name="gps" value={form.gps} onChange={onChange} placeholder="e.g. 9.0579° N, 7.4951° E" />
        <Select label="Location" name="location" value={form.location} onChange={onChange} options={["Urban", "Rural", "Semi-urban"]} />
        <Input label="Academic Session" name="session" value={form.session} onChange={onChange} placeholder="e.g. 2024/2025" />
        <Input label="Year Established" name="yearEstablished" value={form.yearEstablished} onChange={onChange} type="number" placeholder="e.g. 1985" />
      </div>

      <RadioGroup label="School Type" name="schoolType" value={form.schoolType} onChange={onChange}
        options={[{ value: "public", label: "Public" }, { value: "private", label: "Private" }]} />

      <RadioGroup label="Category of School" name="categoryOfSchool" value={form.categoryOfSchool} onChange={onChange}
        options={[
          { value: "day", label: "Day" },
          { value: "boarding", label: "Boarding" },
          { value: "day_boarding", label: "Day & Boarding" },
        ]} />

      <RadioGroup label="School Class" name="schoolClass" value={form.schoolClass} onChange={onChange}
        options={[
          { value: "boys", label: "Boys" },
          { value: "girls", label: "Girls" },
          { value: "co_education", label: "Co-education" },
        ]} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input label="Teaching Staff Attendance (Day of Visit)" name="attendanceTeaching" value={form.attendanceTeaching} onChange={onChange} type="number" placeholder="Number present" />
        <Input label="Non-Teaching Staff Attendance" name="attendanceNonTeaching" value={form.attendanceNonTeaching} onChange={onChange} type="number" placeholder="Number present" />
      </div>
    </div>
  );
}

function Step1({ form, onChange }) {
  return (
    <div className="space-y-5">
      <SectionTitle>Staff Strength</SectionTitle>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Input label="Teaching — Male" name="teachingStaffMale" value={form.teachingStaffMale} onChange={onChange} type="number" />
        <Input label="Teaching — Female" name="teachingStaffFemale" value={form.teachingStaffFemale} onChange={onChange} type="number" />
        <Input label="Non-Teaching — Male" name="nonTeachingStaffMale" value={form.nonTeachingStaffMale} onChange={onChange} type="number" />
        <Input label="Non-Teaching — Female" name="nonTeachingStaffFemale" value={form.nonTeachingStaffFemale} onChange={onChange} type="number" />
        <Input label="Permanent Staff" name="permanentStaff" value={form.permanentStaff} onChange={onChange} type="number" />
        <Input label="Temporary Staff" name="temporaryStaff" value={form.temporaryStaff} onChange={onChange} type="number" />
      </div>

      <SectionTitle>Learners Population</SectionTitle>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Input label="Total Boys" name="totalBoys" value={form.totalBoys} onChange={onChange} type="number" />
        <Input label="Total Girls" name="totalGirls" value={form.totalGirls} onChange={onChange} type="number" />
        <Input label="Learners with Special Needs" name="learnersWithSpecialNeeds" value={form.learnersWithSpecialNeeds} onChange={onChange} type="number" />
        <Input label="Dropout Count" name="dropoutCount" value={form.dropoutCount} onChange={onChange} type="number" />
      </div>

      <CheckboxGroup label="Reasons for Dropout" name="dropoutReasons" values={form.dropoutReasons} onChange={onChange}
        options={[
          "Poor Academic Performance", "Early Marriage/Teenage Pregnancy",
          "Lack of Motivation", "Health Issues", "Financial Challenges",
          "Peer Influence", "Family Problems", "Bullying & Abuses",
        ]} />
    </div>
  );
}

function Step2({ form, onChange }) {
  return (
    <div className="space-y-5">
      <SectionTitle>Internal Examination Results</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Internal Exam Results (Summary)" name="internalExamResults" value={form.internalExamResults} onChange={onChange} placeholder="Brief summary" />
      </div>

      <SectionTitle>External Examination Results</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { key: "waec", label: "WAEC" }, { key: "neco", label: "NECO" },
          { key: "nbais", label: "NBAIS" }, { key: "nabteb", label: "NABTEB" },
        ].map(({ key, label }) => (
          <div key={key} className="space-y-3">
            <RadioGroup label={`${label} Results`} name={`${key}Results`} value={form[`${key}Results`]} onChange={onChange}
              options={AVAIL} />
            {form[`${key}Results`] === "Available" && (
              <Select label={`${label} Performance`} name={`${key}Performance`} value={form[`${key}Performance`]} onChange={onChange} options={PERFORMANCE} />
            )}
          </div>
        ))}
      </div>

      <SectionTitle>Student Leadership & Activities</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <RadioGroup label="School Prefects System in Place" name="schoolPrefects" value={form.schoolPrefects} onChange={onChange} options={YES_NO} />
        <RadioGroup label="Learners Representative Council" name="learnersRepCouncil" value={form.learnersRepCouncil} onChange={onChange} options={YES_NO} />
        <RadioGroup label="Community Contribution Activities" name="communityContribution" value={form.communityContribution} onChange={onChange} options={YES_NO} />
        <RadioGroup label="Co-Curricular Activities Running" name="coCurricularActivities" value={form.coCurricularActivities} onChange={onChange} options={YES_NO} />
        <RadioGroup label="Breaktime is Adequate & Orderly" name="breaktime" value={form.breaktime} onChange={onChange} options={YES_NO} />
        <RadioGroup label="Orderly Movement Observed" name="orderlyMovement" value={form.orderlyMovement} onChange={onChange} options={YES_NO} />
        <RadioGroup label="Learners Display Self-Esteem" name="selfEsteemDisplay" value={form.selfEsteemDisplay} onChange={onChange} options={YES_NO} />
        <RadioGroup label="Gender Equality Practised" name="genderEquality" value={form.genderEquality} onChange={onChange} options={YES_NO} />
      </div>
    </div>
  );
}

function Step3({ form, onChange }) {
  const facilityFields = [
    { name: "classroomFurniture", label: "Classroom Furniture" },
    { name: "adminBlock", label: "Administrative Block" },
    { name: "staffOffices", label: "Staff Offices" },
    { name: "laboratories", label: "Laboratories" },
    { name: "sportingFacilities", label: "Sporting Facilities" },
    { name: "clinic", label: "Clinic / Health Bay" },
    { name: "hostels", label: "Hostels" },
    { name: "diningHall", label: "Dining Hall" },
    { name: "guidanceCounsellingUnit", label: "Guidance & Counselling Unit" },
    { name: "guidanceCounsellingPersonnel", label: "Guidance & Counselling Personnel" },
    { name: "library", label: "Library" },
    { name: "ict", label: "ICT Facilities" },
    { name: "waterFacility", label: "Water Facility" },
    { name: "electricitySupply", label: "Electricity Supply" },
    { name: "alternativePower", label: "Alternative Power Source" },
    { name: "incinerator", label: "Incinerator" },
    { name: "schoolFarm", label: "School Farm" },
  ];

  return (
    <div className="space-y-5">
      <SectionTitle>Classroom Rating</SectionTitle>
      <Select label="Overall Classrooms Rating" name="classroomsRating" value={form.classroomsRating} onChange={onChange}
        options={[
          { value: "4", label: "4 — Very Good" },
          { value: "3", label: "3 — Good" },
          { value: "2", label: "2 — Fair" },
          { value: "1", label: "1 — Poor" },
        ]} />

      <SectionTitle>Facilities Assessment</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {facilityFields.map(({ name, label }) => (
          <Select key={name} label={label} name={name} value={form[name]} onChange={onChange}
            options={[...AVAIL, ...QUALITY].filter((v, i, a) => a.indexOf(v) === i)} />
        ))}
      </div>
    </div>
  );
}

function Step4({ form, onChange }) {
  return (
    <div className="space-y-5">
      <RadioGroup label="Cases of Indiscipline Reported" name="casesOfIndiscipline" value={form.casesOfIndiscipline} onChange={onChange} options={YES_NO} />

      {form.casesOfIndiscipline === "Yes" && (
        <CheckboxGroup label="Types of Indiscipline" name="typesOfIndiscipline" values={form.typesOfIndiscipline} onChange={onChange}
          options={["Bullying", "Fighting", "Disobedience to rules", "Theft", "All", "Disobedience to teachers"]} />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <RadioGroup label="Open Days Organised" name="openDays" value={form.openDays} onChange={onChange} options={YES_NO} />
        <RadioGroup label="Extra Support for Slow Learners" name="extraSupport" value={form.extraSupport} onChange={onChange} options={YES_NO} />
        <RadioGroup label="Provision for Learners with Special Needs" name="specialNeedsProvision" value={form.specialNeedsProvision} onChange={onChange} options={YES_NO} />
        <RadioGroup label="Documented School Rules" name="documentedSchoolRules" value={form.documentedSchoolRules} onChange={onChange} options={YES_NO} />
        <RadioGroup label="Learners Feel Safe to Report Issues" name="learnersSafeToReport" value={form.learnersSafeToReport} onChange={onChange} options={YES_NO} />
        <RadioGroup label="Gender Incentives in Place" name="genderIncentives" value={form.genderIncentives} onChange={onChange} options={YES_NO} />
        <RadioGroup label="Mentor/Patron System" name="mentorPatron" value={form.mentorPatron} onChange={onChange} options={YES_NO} />
        <RadioGroup label="Teacher Mentoring Programme" name="mentoringByTeachers" value={form.mentoringByTeachers} onChange={onChange} options={YES_NO} />
        <RadioGroup label="School Compound Fenced/Secured" name="securityFenced" value={form.securityFenced} onChange={onChange} options={YES_NO} />
        <RadioGroup label="Fire Extinguishers Available" name="fireExtinguishers" value={form.fireExtinguishers} onChange={onChange} options={YES_NO} />
        <RadioGroup label="Safe Schools Initiative Active" name="safeSchoolsInitiative" value={form.safeSchoolsInitiative} onChange={onChange} options={YES_NO} />
        <RadioGroup label="School Environment (conducive/not)" name="schoolEnvironment" value={form.schoolEnvironment} onChange={onChange}
          options={["Conducive", "Not Conducive"]} />
      </div>
      <Input label="Security Emergency Number" name="securityEmergencyNumber" value={form.securityEmergencyNumber} onChange={onChange} placeholder="Emergency contact number" />
      <Input label="Other Remarks (Care & Safety)" name="othersQualityCare" value={form.othersQualityCare} onChange={onChange} />
    </div>
  );
}

function Step5({ form, onChange }) {
  const teachingFields = [
    { name: "lessonPlan", label: "Lesson Plan" },
    { name: "learningObjectivesPlan", label: "Learning Objectives in Plan" },
    { name: "learningObjectivesBoard", label: "Learning Objectives on Board" },
    { name: "knowledgeOfTopic", label: "Teacher Knowledge of Topic" },
    { name: "classroomManagement", label: "Classroom Management" },
    { name: "learningResource", label: "Learning Resources Used" },
    { name: "teachingMethodology", label: "Teaching Methodology" },
    { name: "learnersParticipation", label: "Learners Participation" },
    { name: "lessonEvaluation", label: "Lesson Evaluation" },
  ];

  return (
    <div className="space-y-5">
      <SectionTitle>Quality of Teaching & Learning</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {teachingFields.map(({ name, label }) => (
          <Select key={name} label={label} name={name} value={form[name]} onChange={onChange} options={QUALITY} />
        ))}
      </div>

      <SectionTitle>Quality of Curriculum</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <RadioGroup label="National Curriculum Followed" name="nationalCurriculum" value={form.nationalCurriculum} onChange={onChange} options={YES_NO} />
        <RadioGroup label="Scheme of Work Available" name="schemeOfWork" value={form.schemeOfWork} onChange={onChange} options={AVAIL} />
        <RadioGroup label="Continuous Assessment Records" name="continuousAssessmentRecords" value={form.continuousAssessmentRecords} onChange={onChange} options={AVAIL} />
        <RadioGroup label="Clubs and Societies Active" name="clubsAndSocieties" value={form.clubsAndSocieties} onChange={onChange} options={YES_NO} />
      </div>

      <CheckboxGroup label="Examination Syllabus Followed" name="examinationSyllabus" values={form.examinationSyllabus} onChange={onChange}
        options={["WASSCE", "NECO", "NABTEB", "Others"]} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Internal Exam Results (Curriculum)" name="internalExamResultsCurriculum" value={form.internalExamResultsCurriculum} onChange={onChange} placeholder="Brief summary" />
        <Input label="External Exam Results" name="externalExamResults" value={form.externalExamResults} onChange={onChange} placeholder="Brief summary" />
        <Select label="External Exam Performance" name="externalExamPerformance" value={form.externalExamPerformance} onChange={onChange} options={PERFORMANCE} />
      </div>
    </div>
  );
}

function Step6({ form, onChange }) {
  const mgmtFields = [
    { name: "visionMissionStatement", label: "Vision & Mission Statement Displayed" },
    { name: "attendanceRegister", label: "Attendance Register" },
    { name: "logbook", label: "Logbook" },
    { name: "rewardBook", label: "Reward Book" },
    { name: "punishmentBook", label: "Punishment Book" },
    { name: "visitorsBook", label: "Visitors' Book" },
    { name: "schoolSelfEvaluation", label: "School Self Evaluation Report" },
    { name: "recordKeeping", label: "Record Keeping" },
    { name: "committeeSystem", label: "Committee System Functioning" },
    { name: "monitoringSupervision", label: "Monitoring & Supervision" },
    { name: "empoweringVP", label: "Empowering Vice Principal" },
    { name: "teachersMotivation", label: "Teacher Motivation Strategies" },
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {mgmtFields.map(({ name, label }) => (
          <RadioGroup key={name} label={label} name={name} value={form[name]} onChange={onChange} options={AVAIL} />
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Laurels / Awards Won" name="laurelsWon" value={form.laurelsWon} onChange={onChange} placeholder="List recent awards" />
        <RadioGroup label="Recent Monitoring Conducted" name="recentMonitoring" value={form.recentMonitoring} onChange={onChange} options={YES_NO} />
        {form.recentMonitoring === "Yes" && (
          <Input label="Year of Recent Monitoring" name="recentMonitoringYear" value={form.recentMonitoringYear} onChange={onChange} placeholder="e.g. 2024" />
        )}
      </div>

      {form.recentMonitoring === "Yes" && (
        <CheckboxGroup label="Agency that Conducted Monitoring" name="recentMonitoringAgency" values={form.recentMonitoringAgency} onChange={onChange}
          options={["FEQAS", "NSSEC", "State Ministry of Education", "SSSEB", "Others"]} />
      )}

      <SectionTitle>Principal Details</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Principal Name" name="principalName" value={form.principalName} onChange={onChange} placeholder="Full name" />
        <Input label="Principal Phone" name="principalPhone" value={form.principalPhone} onChange={onChange} placeholder="+234..." />
        <Input label="Date of Visit" name="visitDate" value={form.visitDate} onChange={onChange} type="date" />
      </div>
    </div>
  );
}

function Step7({ form, setForm }) {
  const updateArr = (field, idx, val) => {
    setForm((prev) => {
      const arr = [...prev[field]];
      arr[idx] = val;
      return { ...prev, [field]: arr };
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
        This section is to be completed by the NSSEC evaluator who conducted the monitoring visit.
      </div>

      <SectionTitle>What the School Does Well (3 Observations)</SectionTitle>
      {[0, 1, 2].map((i) => (
        <div key={i}>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Observation {i + 1}</label>
          <input value={form.schoolDoesWell[i]} onChange={(e) => updateArr("schoolDoesWell", i, e.target.value)}
            className={cls(false)} placeholder={`What the school does well — ${i + 1}`} />
        </div>
      ))}

      <SectionTitle>Areas for Improvement (3 Observations)</SectionTitle>
      {[0, 1, 2].map((i) => (
        <div key={i}>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Area {i + 1}</label>
          <input value={form.areasForImprovement[i]} onChange={(e) => updateArr("areasForImprovement", i, e.target.value)}
            className={cls(false)} placeholder={`Area for improvement — ${i + 1}`} />
        </div>
      ))}

      <SectionTitle>Recommendations (3)</SectionTitle>
      {[0, 1, 2].map((i) => (
        <div key={i}>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Recommendation {i + 1}</label>
          <input value={form.recommendations[i]} onChange={(e) => updateArr("recommendations", i, e.target.value)}
            className={cls(false)} placeholder={`Recommendation — ${i + 1}`} />
        </div>
      ))}

      <SectionTitle>Evaluator Signatures</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Evaluator Name</label>
          <input name="evaluatorName" value={form.evaluatorName}
            onChange={(e) => setForm((p) => ({ ...p, evaluatorName: e.target.value }))}
            className={cls(false)} placeholder="Full name of evaluator" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Lead Evaluator Name</label>
          <input name="leadEvaluatorName" value={form.leadEvaluatorName}
            onChange={(e) => setForm((p) => ({ ...p, leadEvaluatorName: e.target.value }))}
            className={cls(false)} placeholder="Full name of lead evaluator" />
        </div>
      </div>
    </div>
  );
}

// ── PDF Upload mode ───────────────────────────────────────────────────────

function PdfMode({ onSuccess }) {
  const [fields, setFields] = useState({ schoolName: "", schoolEmail: "", state: "", evaluatorName: "" });
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const fileRef = useRef();

  const onChange = (e) => setFields((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f?.type === "application/pdf") setFile(f);
    else setSubmitError("Only PDF files are accepted.");
  }, []);

  const validate = () => {
    const errs = {};
    if (!fields.schoolName.trim()) errs.schoolName = "School name is required";
    if (!fields.state) errs.state = "State is required";
    if (!file) errs.file = "Please upload the completed PDF form";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);

    try {
      const fd = new FormData();
      Object.entries(fields).forEach(([k, v]) => fd.append(k, v));
      fd.append("pdf", file);

      const res = await fetch(`${API_BASE}/mande/submit-pdf`, { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Submission failed");
      onSuccess(data.data?.submissionId);
    } catch (err) {
      setSubmitError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Download blank form */}
      <div className="bg-[#0e4f6b]/5 border border-[#24c2c2]/30 rounded-2xl p-5">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#24c2c2]/10 flex items-center justify-center flex-shrink-0">
            <FileText className="w-5 h-5 text-[#24c2c2]" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-[#0e4f6b] text-sm mb-1">Download Blank Form</p>
            <p className="text-xs text-gray-500 mb-3">Download the NSSEC M&E instrument, fill it offline, then upload the completed PDF below.</p>
            <a
              href="/departments/CORRECTED%20COPY%20%20OF%20NSSEC%20M%20%26%20E%20MANUAL%202025%20-%202.docx"
              download="NSSEC-MandE-Form-2025.docx"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0e4f6b] text-white text-sm font-semibold rounded-xl hover:bg-[#0a3d57] transition-colors"
            >
              <Download className="w-4 h-4" />
              Download Blank Form
            </a>
          </div>
        </div>
      </div>

      {/* School info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="School Name" required error={errors.schoolName}>
          <input name="schoolName" value={fields.schoolName} onChange={onChange} className={cls(errors.schoolName)} placeholder="Official school name" />
        </Field>
        <Field label="School Email" error={errors.schoolEmail}>
          <input name="schoolEmail" type="email" value={fields.schoolEmail} onChange={onChange} className={cls(false)} placeholder="school@example.edu.ng" />
        </Field>
        <Field label="State" required error={errors.state}>
          <select name="state" value={fields.state} onChange={onChange} className={cls(errors.state)}>
            <option value="">Select state...</option>
            {NIGERIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>
        <Field label="Evaluator Name" error={errors.evaluatorName}>
          <input name="evaluatorName" value={fields.evaluatorName} onChange={onChange} className={cls(false)} placeholder="Name of evaluator (optional)" />
        </Field>
      </div>

      {/* PDF upload */}
      <Field label="Upload Completed PDF Form" required error={errors.file}>
        <div
          onDrop={onDrop}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onClick={() => fileRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
            dragOver ? "border-[#24c2c2] bg-[#24c2c2]/5" :
            file ? "border-[#24c2c2]/60 bg-[#24c2c2]/5" : "border-gray-200 hover:border-[#24c2c2]/40"
          }`}
        >
          <input ref={fileRef} type="file" accept=".pdf,application/pdf" className="sr-only"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) setFile(f); }} />
          {file ? (
            <div className="flex items-center justify-center gap-3">
              <FileText className="w-6 h-6 text-[#24c2c2]" />
              <div className="text-left">
                <p className="text-sm font-semibold text-[#0e4f6b]">{file.name}</p>
                <p className="text-xs text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              <button type="button" onClick={(e) => { e.stopPropagation(); setFile(null); }}
                className="ml-2 text-gray-400 hover:text-red-400">
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <Upload className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Drag & drop PDF here, or <span className="text-[#24c2c2] font-semibold">browse</span></p>
              <p className="text-xs text-gray-400 mt-1">PDF only · Max 50MB</p>
            </>
          )}
        </div>
      </Field>

      {submitError && (
        <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>{submitError}</span>
        </div>
      )}

      <button type="submit" disabled={loading}
        className="w-full py-3.5 bg-[#24c2c2] hover:bg-[#1a9999] disabled:opacity-60 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
        {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Uploading...</> : <><Upload className="w-4 h-4" /> Submit PDF Form</>}
      </button>
    </form>
  );
}

// ── Main form ─────────────────────────────────────────────────────────────

export default function MandEForm() {
  const [mode, setMode] = useState(null);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [successId, setSuccessId] = useState(null);
  const topRef = useRef();

  const scrollTop = () => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const n = { ...prev };
      delete n[name];
      return n;
    });
  }, []);

  const validateStep0 = () => {
    const errs = {};
    if (!form.schoolName.trim()) errs.schoolName = "School name is required";
    if (!form.state) errs.state = "State is required";
    return errs;
  };

  const next = () => {
    if (step === 0) {
      const errs = validateStep0();
      if (Object.keys(errs).length) { setErrors(errs); scrollTop(); return; }
    }
    setErrors({});
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
    scrollTop();
  };

  const prev = () => { setStep((s) => Math.max(s - 1, 0)); scrollTop(); };

  const buildPayload = () => {
    const numFields = [
      "yearEstablished", "attendanceTeaching", "attendanceNonTeaching",
      "teachingStaffMale", "teachingStaffFemale", "nonTeachingStaffMale", "nonTeachingStaffFemale",
      "permanentStaff", "temporaryStaff", "totalBoys", "totalGirls",
      "learnersWithSpecialNeeds", "dropoutCount", "classroomsRating",
    ];
    const payload = { ...form };
    numFields.forEach((f) => {
      if (payload[f] !== "" && payload[f] !== undefined) {
        payload[f] = Number(payload[f]) || undefined;
      } else {
        delete payload[f];
      }
    });
    payload.schoolDoesWell = form.schoolDoesWell.filter(Boolean);
    payload.areasForImprovement = form.areasForImprovement.filter(Boolean);
    payload.recommendations = form.recommendations.filter(Boolean);
    if (form.visitDate) payload.visitDate = new Date(form.visitDate).toISOString();
    return payload;
  };

  const handleSubmit = async () => {
    setSubmitError("");
    const errs = validateStep0();
    if (Object.keys(errs).length) { setErrors(errs); setStep(0); scrollTop(); return; }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/mande/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload()),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Submission failed");
      setSuccessId(data.data?.submissionId);
    } catch (err) {
      setSubmitError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Success screen ──
  if (successId) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="w-20 h-20 rounded-full bg-[#24c2c2]/10 flex items-center justify-center mb-6">
          <CheckCircle className="w-10 h-10 text-[#24c2c2]" />
        </div>
        <h2 className="font-playfair text-2xl font-bold text-[#0e4f6b] mb-3">Submission Received</h2>
        <p className="text-gray-600 max-w-md mb-4">
          Your M&E form has been submitted successfully. You will receive a confirmation email if you provided your school email address.
        </p>
        <div className="bg-[#24c2c2]/10 border border-[#24c2c2]/30 rounded-xl px-6 py-3 mb-8">
          <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-1">Submission ID</p>
          <p className="font-mono text-sm font-bold text-[#0e4f6b]">{successId}</p>
        </div>
        <button
          onClick={() => { setSuccessId(null); setMode(null); setStep(0); setForm(INITIAL_FORM); }}
          className="px-6 py-2.5 border border-[#24c2c2] text-[#24c2c2] text-sm font-semibold rounded-xl hover:bg-[#24c2c2]/10 transition-colors"
        >
          Submit Another Form
        </button>
      </div>
    );
  }

  // ── Mode selector ──
  if (!mode) {
    return (
      <div className="py-10">
        <p className="text-center text-gray-600 mb-8 text-sm">Choose how you would like to submit the M&E instrument:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {[
            {
              key: "web",
              icon: BookOpen,
              title: "Fill Online",
              desc: "Complete the form directly in your browser. Progress is saved per section. Submission confirmed via email.",
              cta: "Start Online Form",
              accent: "#24c2c2",
            },
            {
              key: "pdf",
              icon: Download,
              title: "Download & Upload PDF",
              desc: "Download the blank form, fill it offline, then upload the completed PDF here. Ideal for offline use.",
              cta: "Upload Completed PDF",
              accent: "#0e4f6b",
            },
          ].map(({ key, icon: Icon, title, desc, cta, accent }) => (
            <button key={key} type="button" onClick={() => setMode(key)}
              className="text-left p-6 bg-white border-2 border-gray-100 rounded-2xl hover:border-[#24c2c2]/40 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${accent}15` }}>
                <Icon className="w-6 h-6" style={{ color: accent }} />
              </div>
              <h3 className="font-bold text-[#0e4f6b] text-base mb-2">{title}</h3>
              <p className="text-sm text-gray-500 mb-4 leading-relaxed">{desc}</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: accent }}>
                {cta} <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ── PDF mode ──
  if (mode === "pdf") {
    return (
      <div>
        <div className="flex items-center gap-3 mb-6">
          <button type="button" onClick={() => setMode(null)} className="text-[#24c2c2] hover:text-[#1a9999] flex items-center gap-1 text-sm font-semibold">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <span className="text-gray-300">|</span>
          <span className="text-sm text-gray-500 font-medium">Upload Completed PDF Form</span>
        </div>
        <PdfMode onSuccess={(id) => setSuccessId(id)} />
      </div>
    );
  }

  // ── Web form ──
  const CurrentStep = [Step0, Step1, Step2, Step3, Step4, Step5, Step6, Step7][step];
  const StepIcon = STEPS[step].icon;
  const isLast = step === STEPS.length - 1;

  return (
    <div ref={topRef}>
      {/* Back */}
      <button type="button" onClick={() => setMode(null)} className="text-[#24c2c2] hover:text-[#1a9999] flex items-center gap-1 text-sm font-semibold mb-6">
        <ArrowLeft className="w-4 h-4" /> Change Submission Mode
      </button>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <StepIcon className="w-4 h-4 text-[#24c2c2]" />
            <span className="text-sm font-bold text-[#0e4f6b]">{STEPS[step].title}</span>
          </div>
          <span className="text-xs text-gray-400 font-semibold">Step {step + 1} of {STEPS.length}</span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#24c2c2] to-[#1a9999] rounded-full transition-all duration-300"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>
        {/* Step dots */}
        <div className="flex justify-between mt-2 overflow-x-auto gap-1">
          {STEPS.map((s, i) => (
            <button key={s.id} type="button" onClick={() => { if (i <= step) { setStep(i); scrollTop(); } }}
              title={s.title}
              className={`flex-shrink-0 w-2 h-2 rounded-full transition-all ${
                i < step ? "bg-[#24c2c2]" : i === step ? "bg-[#0e4f6b] w-4" : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-[#24c2c2]/10 flex items-center justify-center">
            <StepIcon className="w-4 h-4 text-[#24c2c2]" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Section {step + 1}</p>
            <h2 className="font-bold text-[#0e4f6b] text-base">{STEPS[step].title}</h2>
          </div>
        </div>

        <CurrentStep form={form} onChange={onChange} setForm={setForm} errors={errors} />
      </div>

      {/* Server error */}
      {submitError && (
        <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700 mb-6">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>{submitError}</span>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button type="button" onClick={prev} disabled={step === 0}
          className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 text-gray-500 rounded-xl text-sm font-semibold disabled:opacity-40 hover:border-[#24c2c2] hover:text-[#24c2c2] transition-colors">
          <ArrowLeft className="w-4 h-4" /> Previous
        </button>

        {isLast ? (
          <button type="button" onClick={handleSubmit} disabled={loading}
            className="flex items-center gap-2 px-7 py-2.5 bg-[#24c2c2] hover:bg-[#1a9999] disabled:opacity-60 text-white rounded-xl text-sm font-semibold transition-colors">
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</> : <><CheckCircle className="w-4 h-4" /> Submit Form</>}
          </button>
        ) : (
          <button type="button" onClick={next}
            className="flex items-center gap-2 px-7 py-2.5 bg-[#0e4f6b] hover:bg-[#0a3d57] text-white rounded-xl text-sm font-semibold transition-colors">
            Next <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
