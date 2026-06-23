"use client";
import { ShieldAlert, ShieldCheck, Heart } from "lucide-react";
import { Input, RadioPill, CheckChip, SectionTitle } from "./FormFields";
import { YES_NO } from "./constants";

const INDISCIPLINE_TYPES = [
  "Bullying", "Fighting", "Disobedience to Rules",
  "Theft", "Disobedience to Teachers", "All",
];

export default function Step4({ form, onChange }) {
  return (
    <div className="space-y-6">

      <SectionTitle icon={ShieldAlert}>Discipline</SectionTitle>
      <RadioPill
        label="Cases of Indiscipline Reported"
        name="casesOfIndiscipline"
        value={form.casesOfIndiscipline}
        onChange={onChange}
        options={YES_NO}
      />
      {form.casesOfIndiscipline === "Yes" && (
        <CheckChip
          label="Types of Indiscipline Observed"
          name="typesOfIndiscipline"
          values={form.typesOfIndiscipline}
          onChange={onChange}
          options={INDISCIPLINE_TYPES}
        />
      )}

      <SectionTitle icon={Heart}>Pastoral Care &amp; Welfare</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <RadioPill label="Open Days Organised"                    name="openDays"              value={form.openDays}              onChange={onChange} options={YES_NO} />
        <RadioPill label="Extra Support for Slow Learners"        name="extraSupport"          value={form.extraSupport}          onChange={onChange} options={YES_NO} />
        <RadioPill label="Provision for Learners with Special Needs" name="specialNeedsProvision" value={form.specialNeedsProvision} onChange={onChange} options={YES_NO} />
        <RadioPill label="Documented School Rules"                name="documentedSchoolRules" value={form.documentedSchoolRules} onChange={onChange} options={YES_NO} />
        <RadioPill label="Learners Feel Safe to Report Issues"    name="learnersSafeToReport"  value={form.learnersSafeToReport}  onChange={onChange} options={YES_NO} />
        <RadioPill label="Gender Incentives in Place"             name="genderIncentives"      value={form.genderIncentives}      onChange={onChange} options={YES_NO} />
        <RadioPill label="Mentor / Patron System"                 name="mentorPatron"          value={form.mentorPatron}          onChange={onChange} options={YES_NO} />
        <RadioPill label="Teacher Mentoring Programme"            name="mentoringByTeachers"   value={form.mentoringByTeachers}   onChange={onChange} options={YES_NO} />
      </div>

      <SectionTitle icon={ShieldCheck}>Security &amp; Safety</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <RadioPill label="School Compound Fenced / Secured" name="securityFenced"       value={form.securityFenced}       onChange={onChange} options={YES_NO} />
        <RadioPill label="Fire Extinguishers Available"     name="fireExtinguishers"    value={form.fireExtinguishers}    onChange={onChange} options={YES_NO} />
        <RadioPill label="Safe Schools Initiative Active"   name="safeSchoolsInitiative" value={form.safeSchoolsInitiative} onChange={onChange} options={YES_NO} />
        <RadioPill label="School Environment"               name="schoolEnvironment"    value={form.schoolEnvironment}    onChange={onChange} options={["Conducive", "Not Conducive"]} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input label="Security Emergency Number" name="securityEmergencyNumber" value={form.securityEmergencyNumber}
          onChange={onChange} placeholder="Emergency contact number" />
        <Input label="Other Remarks (Care &amp; Safety)" name="othersQualityCare" value={form.othersQualityCare}
          onChange={onChange} placeholder="Any additional observations" />
      </div>

    </div>
  );
}
