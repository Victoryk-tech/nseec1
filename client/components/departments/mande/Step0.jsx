"use client";
import { Building2, MapPin, CalendarDays, Tag } from "lucide-react";
import { Input, Select, RadioPill, SectionTitle } from "./FormFields";
import { NIGERIAN_STATES } from "./constants";

export default function Step0({ form, onChange, errors }) {
  return (
    <div className="space-y-6">

      <SectionTitle icon={Building2}>School Identity</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <div className="sm:col-span-2">
          <Input
            label="School Name" name="schoolName" value={form.schoolName} onChange={onChange}
            required error={errors.schoolName} placeholder="Full official name of the school"
          />
        </div>
        <Input label="School Email" name="schoolEmail" value={form.schoolEmail} onChange={onChange}
          type="email" placeholder="school@example.edu.ng" />
        <Input label="School Telephone" name="schoolTelephone" value={form.schoolTelephone} onChange={onChange}
          placeholder="+234 (0) 000 000 0000" />
      </div>

      <SectionTitle icon={MapPin}>Location Details</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <Select
          label="State" name="state" value={form.state} onChange={onChange}
          options={NIGERIAN_STATES} required error={errors.state} placeholder="Select state…"
        />
        <Input label="Local Government Area (LGA)" name="lga" value={form.lga} onChange={onChange} placeholder="LGA name" />
        <div className="sm:col-span-2">
          <Input label="School Address" name="schoolAddress" value={form.schoolAddress} onChange={onChange}
            placeholder="Full address including street and city" />
        </div>
        <Input label="GPS Coordinates" name="gps" value={form.gps} onChange={onChange}
          placeholder="e.g. 9.0579° N, 7.4951° E" hint="Optional — from a GPS device or Google Maps" />
        <Select label="Location Type" name="location" value={form.location} onChange={onChange}
          options={["Urban", "Rural", "Semi-urban"]} placeholder="Select location type…" />
      </div>

      <SectionTitle icon={CalendarDays}>Session & Classification</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <Input label="Academic Session" name="session" value={form.session} onChange={onChange} placeholder="e.g. 2024/2025" />
        <Input label="Year Established" name="yearEstablished" value={form.yearEstablished} onChange={onChange}
          type="number" placeholder="e.g. 1985" />
      </div>

      <SectionTitle icon={Tag}>School Classification</SectionTitle>
      <div className="space-y-4">
        <RadioPill label="School Type" name="schoolType" value={form.schoolType} onChange={onChange}
          options={[{ value: "public", label: "Public" }, { value: "private", label: "Private" }]} />
        <RadioPill label="Category of School" name="categoryOfSchool" value={form.categoryOfSchool} onChange={onChange}
          options={[
            { value: "day",         label: "Day" },
            { value: "boarding",    label: "Boarding" },
            { value: "day_boarding",label: "Day & Boarding" },
          ]}
        />
        <RadioPill label="School Class" name="schoolClass" value={form.schoolClass} onChange={onChange}
          options={[
            { value: "boys",         label: "Boys Only" },
            { value: "girls",        label: "Girls Only" },
            { value: "co_education", label: "Co-education" },
          ]}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 pt-1">
          <Input label="Teaching Staff Attendance (Day of Visit)" name="attendanceTeaching"
            value={form.attendanceTeaching} onChange={onChange} type="number" placeholder="Number present"
            hint="Staff present on the monitoring visit day" />
          <Input label="Non-Teaching Staff Attendance" name="attendanceNonTeaching"
            value={form.attendanceNonTeaching} onChange={onChange} type="number" placeholder="Number present" />
        </div>
      </div>

    </div>
  );
}
