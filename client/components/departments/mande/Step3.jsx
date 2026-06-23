"use client";
import { Landmark, LayoutGrid } from "lucide-react";
import { Select, SectionTitle, RatingSelect } from "./FormFields";

const FACILITY_OPTS = ["Very Good", "Good", "Fair", "Poor", "Available", "Not Available"];

const FACILITIES = [
  { name: "classroomFurniture",          label: "Classroom Furniture" },
  { name: "adminBlock",                  label: "Administrative Block" },
  { name: "staffOffices",                label: "Staff Offices" },
  { name: "laboratories",                label: "Laboratories" },
  { name: "sportingFacilities",          label: "Sporting Facilities" },
  { name: "clinic",                      label: "Clinic / Health Bay" },
  { name: "hostels",                     label: "Hostels" },
  { name: "diningHall",                  label: "Dining Hall" },
  { name: "guidanceCounsellingUnit",     label: "Guidance & Counselling Unit" },
  { name: "guidanceCounsellingPersonnel",label: "G&C Personnel" },
  { name: "library",                     label: "Library" },
  { name: "ict",                         label: "ICT Facilities" },
  { name: "waterFacility",               label: "Water Facility" },
  { name: "electricitySupply",           label: "Electricity Supply" },
  { name: "alternativePower",            label: "Alternative Power Source" },
  { name: "incinerator",                 label: "Incinerator" },
  { name: "schoolFarm",                  label: "School Farm" },
];

const dedupOpts = [...new Map(FACILITY_OPTS.map((v) => [v, v])).values()];

export default function Step3({ form, onChange }) {
  return (
    <div className="space-y-6">

      <SectionTitle icon={LayoutGrid}>Classroom Rating</SectionTitle>
      <RatingSelect
        label="Overall Classrooms Rating"
        name="classroomsRating"
        value={form.classroomsRating}
        onChange={onChange}
      />

      <SectionTitle icon={Landmark}>Facilities Assessment</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {FACILITIES.map(({ name, label }) => (
          <Select
            key={name}
            label={label}
            name={name}
            value={form[name]}
            onChange={onChange}
            options={dedupOpts}
            placeholder="Rate this facility…"
          />
        ))}
      </div>

    </div>
  );
}
