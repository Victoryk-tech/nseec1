"use client";
import { BookOpen, BookMarked, ClipboardCheck } from "lucide-react";
import { Select, RadioPill, CheckChip, Input, SectionTitle } from "./FormFields";
import { QUALITY, YES_NO, AVAIL, PERFORMANCE } from "./constants";

const TEACHING_FIELDS = [
  { name: "lessonPlan",               label: "Lesson Plan" },
  { name: "learningObjectivesPlan",   label: "Learning Objectives in Plan" },
  { name: "learningObjectivesBoard",  label: "Learning Objectives on Board" },
  { name: "knowledgeOfTopic",         label: "Teacher Knowledge of Topic" },
  { name: "classroomManagement",      label: "Classroom Management" },
  { name: "learningResource",         label: "Learning Resources Used" },
  { name: "teachingMethodology",      label: "Teaching Methodology" },
  { name: "learnersParticipation",    label: "Learners Participation" },
  { name: "lessonEvaluation",         label: "Lesson Evaluation" },
];

export default function Step5({ form, onChange }) {
  return (
    <div className="space-y-6">

      <SectionTitle icon={BookOpen}>Quality of Teaching &amp; Learning</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TEACHING_FIELDS.map(({ name, label }) => (
          <Select key={name} label={label} name={name} value={form[name]} onChange={onChange}
            options={QUALITY} placeholder="Rate quality…" />
        ))}
      </div>

      <SectionTitle icon={BookMarked}>Curriculum Quality</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <RadioPill label="National Curriculum Followed"      name="nationalCurriculum"        value={form.nationalCurriculum}        onChange={onChange} options={YES_NO} />
        <RadioPill label="Scheme of Work Available"          name="schemeOfWork"              value={form.schemeOfWork}              onChange={onChange} options={AVAIL} />
        <RadioPill label="Continuous Assessment Records"     name="continuousAssessmentRecords" value={form.continuousAssessmentRecords} onChange={onChange} options={AVAIL} />
        <RadioPill label="Clubs &amp; Societies Active"      name="clubsAndSocieties"         value={form.clubsAndSocieties}         onChange={onChange} options={YES_NO} />
      </div>

      <CheckChip
        label="Examination Syllabus Followed"
        name="examinationSyllabus"
        values={form.examinationSyllabus}
        onChange={onChange}
        options={["WASSCE", "NECO", "NABTEB", "Others"]}
      />

      <SectionTitle icon={ClipboardCheck}>Exam Results (Curriculum)</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input label="Internal Exam Results (Curriculum)" name="internalExamResultsCurriculum"
          value={form.internalExamResultsCurriculum} onChange={onChange} placeholder="Brief summary" />
        <Input label="External Exam Results" name="externalExamResults"
          value={form.externalExamResults} onChange={onChange} placeholder="Brief summary" />
        <Select label="External Exam Performance" name="externalExamPerformance"
          value={form.externalExamPerformance} onChange={onChange}
          options={PERFORMANCE} placeholder="Rate overall performance…" />
      </div>

    </div>
  );
}
