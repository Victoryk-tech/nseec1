"use client";
import { FileBarChart, Award, Star } from "lucide-react";
import { Input, Select, RadioPill, SectionTitle } from "./FormFields";
import { AVAIL, PERFORMANCE, YES_NO } from "./constants";

const EXAMS = [
  { key: "waec",   label: "WAEC"   },
  { key: "neco",   label: "NECO"   },
  { key: "nbais",  label: "NBAIS"  },
  { key: "nabteb", label: "NABTEB" },
];

export default function Step2({ form, onChange }) {
  return (
    <div className="space-y-6">

      <SectionTitle icon={FileBarChart}>Internal Examination</SectionTitle>
      <Input
        label="Internal Exam Results (Summary)"
        name="internalExamResults"
        value={form.internalExamResults}
        onChange={onChange}
        placeholder="Brief summary of last internal examination"
        hint="e.g. 85% pass rate, 12 distinctions"
      />

      <SectionTitle icon={Award}>External Examination Results</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {EXAMS.map(({ key, label }) => (
          <div key={key} className="rounded-xl bg-gray-50/70 border border-gray-100 p-4 space-y-3">
            <p className="text-[10px] font-extrabold text-[#0e4f6b] uppercase tracking-widest">{label}</p>
            <RadioPill
              label={`${label} Results`}
              name={`${key}Results`}
              value={form[`${key}Results`]}
              onChange={onChange}
              options={AVAIL}
            />
            {form[`${key}Results`] === "Available" && (
              <Select
                label={`${label} Performance`}
                name={`${key}Performance`}
                value={form[`${key}Performance`]}
                onChange={onChange}
                options={PERFORMANCE}
                placeholder="Rate performance…"
              />
            )}
          </div>
        ))}
      </div>

      <SectionTitle icon={Star}>Student Leadership &amp; Activities</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <RadioPill label="School Prefects System in Place"  name="schoolPrefects"        value={form.schoolPrefects}        onChange={onChange} options={YES_NO} />
        <RadioPill label="Learners Representative Council"  name="learnersRepCouncil"    value={form.learnersRepCouncil}    onChange={onChange} options={YES_NO} />
        <RadioPill label="Community Contribution Activities" name="communityContribution" value={form.communityContribution} onChange={onChange} options={YES_NO} />
        <RadioPill label="Co-Curricular Activities Running" name="coCurricularActivities" value={form.coCurricularActivities} onChange={onChange} options={YES_NO} />
        <RadioPill label="Breaktime is Adequate & Orderly"  name="breaktime"             value={form.breaktime}             onChange={onChange} options={YES_NO} />
        <RadioPill label="Orderly Movement Observed"        name="orderlyMovement"       value={form.orderlyMovement}       onChange={onChange} options={YES_NO} />
        <RadioPill label="Learners Display Self-Esteem"     name="selfEsteemDisplay"     value={form.selfEsteemDisplay}     onChange={onChange} options={YES_NO} />
        <RadioPill label="Gender Equality Practised"        name="genderEquality"        value={form.genderEquality}        onChange={onChange} options={YES_NO} />
      </div>

    </div>
  );
}
