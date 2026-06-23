"use client";
import { Users, GraduationCap, AlertTriangle } from "lucide-react";
import { Input, CheckChip, SectionTitle } from "./FormFields";

const DROPOUT_REASONS = [
  "Poor Academic Performance",
  "Early Marriage / Teenage Pregnancy",
  "Lack of Motivation",
  "Health Issues",
  "Financial Challenges",
  "Peer Influence",
  "Family Problems",
  "Bullying & Abuses",
];

export default function Step1({ form, onChange }) {
  return (
    <div className="space-y-6">

      <SectionTitle icon={Users}>Staff Strength</SectionTitle>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <Input label="Teaching — Male"     name="teachingStaffMale"     value={form.teachingStaffMale}     onChange={onChange} type="number" placeholder="0" />
        <Input label="Teaching — Female"   name="teachingStaffFemale"   value={form.teachingStaffFemale}   onChange={onChange} type="number" placeholder="0" />
        <Input label="Non-Teaching — Male" name="nonTeachingStaffMale"  value={form.nonTeachingStaffMale}  onChange={onChange} type="number" placeholder="0" />
        <Input label="Non-Teaching — Female" name="nonTeachingStaffFemale" value={form.nonTeachingStaffFemale} onChange={onChange} type="number" placeholder="0" />
        <Input label="Permanent Staff"     name="permanentStaff"        value={form.permanentStaff}        onChange={onChange} type="number" placeholder="0" />
        <Input label="Temporary Staff"     name="temporaryStaff"        value={form.temporaryStaff}        onChange={onChange} type="number" placeholder="0" />
      </div>

      <SectionTitle icon={GraduationCap}>Learner Population</SectionTitle>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Input label="Total Boys"                  name="totalBoys"                 value={form.totalBoys}                 onChange={onChange} type="number" placeholder="0" />
        <Input label="Total Girls"                 name="totalGirls"                value={form.totalGirls}                onChange={onChange} type="number" placeholder="0" />
        <Input label="Learners with Special Needs" name="learnersWithSpecialNeeds"  value={form.learnersWithSpecialNeeds}  onChange={onChange} type="number" placeholder="0" />
        <Input label="Dropout Count"               name="dropoutCount"              value={form.dropoutCount}              onChange={onChange} type="number" placeholder="0" />
      </div>

      <SectionTitle icon={AlertTriangle}>Dropout Reasons</SectionTitle>
      <CheckChip
        label="Reasons for Dropout (select all that apply)"
        name="dropoutReasons"
        values={form.dropoutReasons}
        onChange={onChange}
        options={DROPOUT_REASONS}
        hint="Check all reasons that apply at this school"
      />

    </div>
  );
}
