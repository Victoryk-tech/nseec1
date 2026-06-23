"use client";
import { FolderOpen, User, Trophy, Search } from "lucide-react";
import { Input, RadioPill, CheckChip, SectionTitle } from "./FormFields";
import { YES_NO, AVAIL } from "./constants";

const MGMT_RECORDS = [
  { name: "visionMissionStatement", label: "Vision & Mission Statement Displayed" },
  { name: "attendanceRegister",     label: "Attendance Register" },
  { name: "logbook",                label: "Logbook" },
  { name: "rewardBook",             label: "Reward Book" },
  { name: "punishmentBook",         label: "Punishment Book" },
  { name: "visitorsBook",           label: "Visitors' Book" },
  { name: "schoolSelfEvaluation",   label: "School Self Evaluation Report" },
  { name: "recordKeeping",          label: "Record Keeping Quality" },
  { name: "committeeSystem",        label: "Committee System Functioning" },
  { name: "monitoringSupervision",  label: "Monitoring & Supervision" },
  { name: "empoweringVP",           label: "Empowering Vice Principal" },
  { name: "teachersMotivation",     label: "Teacher Motivation Strategies" },
];

const MONITORING_AGENCIES = ["FEQAS", "NSSEC", "State Ministry of Education", "SSSEB", "Others"];

export default function Step6({ form, onChange }) {
  return (
    <div className="space-y-6">

      <SectionTitle icon={FolderOpen}>Management Records</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {MGMT_RECORDS.map(({ name, label }) => (
          <RadioPill key={name} label={label} name={name} value={form[name]} onChange={onChange} options={AVAIL} />
        ))}
      </div>

      <SectionTitle icon={Trophy}>Awards &amp; Recognition</SectionTitle>
      <Input label="Laurels / Awards Won" name="laurelsWon" value={form.laurelsWon} onChange={onChange}
        placeholder="List recent awards or achievements" />

      <SectionTitle icon={Search}>Recent Monitoring</SectionTitle>
      <RadioPill label="Recent Monitoring Conducted" name="recentMonitoring" value={form.recentMonitoring} onChange={onChange} options={YES_NO} />
      {form.recentMonitoring === "Yes" && (
        <>
          <Input label="Year of Recent Monitoring" name="recentMonitoringYear" value={form.recentMonitoringYear}
            onChange={onChange} placeholder="e.g. 2024" />
          <CheckChip
            label="Agency that Conducted Monitoring"
            name="recentMonitoringAgency"
            values={form.recentMonitoringAgency}
            onChange={onChange}
            options={MONITORING_AGENCIES}
          />
        </>
      )}

      <SectionTitle icon={User}>Principal Details</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input label="Principal Name"  name="principalName"  value={form.principalName}  onChange={onChange} placeholder="Full name" />
        <Input label="Principal Phone" name="principalPhone" value={form.principalPhone} onChange={onChange} placeholder="+234…" />
        <Input label="Date of Visit"   name="visitDate"      value={form.visitDate}       onChange={onChange} type="date" />
      </div>

    </div>
  );
}
