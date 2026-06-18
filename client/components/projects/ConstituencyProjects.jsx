"use client";
import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Building2, CheckCircle2, Clock, Filter, ChevronDown } from "lucide-react";
import AboutHero from "@/components/about/AboutHero";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

const SCHOOLS = [
  // NORTH CENTRAL
  { zone: "North Central", state: "Benue", name: "Government Comprehensive Secondary school Udei Guma LGA", status: "Ongoing" },
  { zone: "North Central", state: "Kogi", name: "Government Secondary school Koton-Karfi", status: "Ongoing" },
  { zone: "North Central", state: "Kwara", name: "Government Secondary school Shonga Edu LGA", status: "Ongoing" },
  { zone: "North Central", state: "Nasarawa", name: "Government College Nasarawa", status: "Ongoing" },
  { zone: "North Central", state: "Niger", name: "Government Secondary School Goffanti Borgu", status: "Ongoing" },
  { zone: "North Central", state: "Plateau", name: "Government Secondary school Mangun, Mangu LGA", status: "Ongoing" },
  // NORTH EAST
  { zone: "North East", state: "Adamawa", name: "GMMC Jimeta Adamawa State", status: "Ongoing" },
  { zone: "North East", state: "Adamawa", name: "Federal Science and Technical College Bassa Michika Adamawa State", status: "Ongoing" },
  { zone: "North East", state: "Bauchi", name: "Government Girls Day Secondary School Itas Gadau Bauchi State", status: "Ongoing" },
  { zone: "North East", state: "Borno", name: "Government Secondary School Damasak Borno State", status: "Ongoing" },
  { zone: "North East", state: "Gombe", name: "Government Day Secondary School Akkoyall, Kumo Gombe State", status: "Ongoing" },
  { zone: "North East", state: "Taraba", name: "Government Day Secondary School Sunkani Taraba State", status: "Ongoing" },
  { zone: "North East", state: "Yobe", name: "Government Science and Technical College Geidam Yobe State", status: "Ongoing" },
  // NORTH WEST
  { zone: "North West", state: "Jigawa", name: "Government Senior Secondary School Kiyawa Jigawa State", status: "Ongoing" },
  { zone: "North West", state: "Kaduna", name: "Government Commercial College Makarfi Kaduna State", status: "Ongoing" },
  { zone: "North West", state: "Kaduna", name: "Government Secondary School Maimuna Gwarzo Kaduna State", status: "Ongoing" },
  { zone: "North West", state: "Kano", name: "Dawakin Tofa College Kano State", status: "Ongoing" },
  { zone: "North West", state: "Kano", name: "Government Day Science College Kano State", status: "Ongoing" },
  { zone: "North West", state: "Kano", name: "Government Science Secondary School Gaya Kano State", status: "Ongoing" },
  { zone: "North West", state: "Kano", name: "Government Secondary School Bichi Kano State", status: "Ongoing" },
  { zone: "North West", state: "Kano", name: "Garko Girls Science College Kano State", status: "Ongoing" },
  { zone: "North West", state: "Katsina", name: "Government Science Secondary School Musawa", status: "Ongoing" },
  { zone: "North West", state: "Kebbi", name: "Government Girls Secondary School Ribah Danko Wasagu Kebbi State", status: "Ongoing" },
  { zone: "North West", state: "Kebbi", name: "Emir Haruna Rasheed Secondary School Kebbi State", status: "Ongoing" },
  { zone: "North West", state: "Kebbi", name: "Government Science College Wara Kebbi State", status: "Ongoing" },
  { zone: "North West", state: "Kebbi", name: "Government Secondary School Karaye Kebbi State", status: "Ongoing" },
  { zone: "North West", state: "Kebbi", name: "Nagari College Birnin Kebbi Kebbi State", status: "Ongoing" },
  { zone: "North West", state: "Sokoto", name: "Government Secondary School Kware Sokoto State", status: "Ongoing" },
  { zone: "North West", state: "Zamfara", name: "Government Science Secondary School Shinkafi Zamfara State", status: "Ongoing" },
  // SOUTH EAST
  { zone: "South East", state: "Abia", name: "Uturu Secondary School, Isuikwuto LGA / Omuaku Secondary School Abia State", status: "Ongoing" },
  { zone: "South East", state: "Anambra", name: "Abbot Boys Secondary School Anambra State", status: "Ongoing" },
  { zone: "South East", state: "Ebonyi", name: "Unity Secondary School Item Amagu Ikwo Ebonyi State", status: "Ongoing" },
  { zone: "South East", state: "Enugu", name: "Ozalla High School Nkanu West, Enugu State", status: "Ongoing" },
  { zone: "South East", state: "Imo", name: "Eziachi Secondary School Orlu Imo State", status: "Ongoing" },
  // SOUTH SOUTH
  { zone: "South South", state: "Akwa Ibom", name: "Comprehensive High School Edamaya Ikot Abasi Akwa Ibom State", status: "Ongoing" },
  { zone: "South South", state: "Bayelsa", name: "Epetiama Comprehensive High School Tombia Bayelsa State", status: "Ongoing" },
  { zone: "South South", state: "Cross River", name: "Secondary Grammar School Wanokom North, Ukelle, Yala LGA Cross River State", status: "Ongoing" },
  { zone: "South South", state: "Delta", name: "Owa Model Secondary school Owa Ika Delta State", status: "Ongoing" },
  { zone: "South South", state: "Edo", name: "Our Lady of Lourdes Girls Grammar School Uromi, Edo State", status: "Ongoing" },
  { zone: "South South", state: "Rivers", name: "Community Secondary School Kokomo Oyigbo Rivers State", status: "Ongoing" },
  // SOUTH WEST
  { zone: "South West", state: "Ekiti", name: "CAC Grammar School, Efon Alaaye Ekiti State", status: "Ongoing" },
  { zone: "South West", state: "Lagos", name: "Satellite Senior and Junior Secondary School, Amuwo Odofin Lagos State", status: "Ongoing" },
  { zone: "South West", state: "Lagos", name: "Oriwu College Ikorodu Lagos State", status: "Ongoing" },
  { zone: "South West", state: "Ogun", name: "Comprehensive High School, Ayetoro Ogun State", status: "Ongoing" },
  { zone: "South West", state: "Ogun", name: "Abeokuta Grammar School, Idi-Aba, Abeokuta Ogun State", status: "Ongoing" },
  { zone: "South West", state: "Ogun", name: "Iganmode Grammar School, Ota Ogun State", status: "Ongoing" },
  { zone: "South West", state: "Ogun", name: "Area Community High School, Owede Yewa Ogun State", status: "Ongoing" },
  { zone: "South West", state: "Ondo", name: "Oyemekun Grammar School / Aquinas College, Akure Ondo State", status: "Ongoing" },
  { zone: "South West", state: "Osun", name: "Laro Grammar School Osogbo Osun State", status: "Ongoing" },
  { zone: "South West", state: "Oyo", name: "Oranyan Grammar School, Soro Hill Oyo State", status: "Ongoing" },
];

const ZONES = ["All Zones", "North Central", "North East", "North West", "South East", "South South", "South West"];
const STATUSES = ["All Status", "Ongoing", "Completed"];

const ZONE_COLORS = {
  "North Central": "bg-blue-50 text-blue-700 border-blue-200",
  "North East": "bg-violet-50 text-violet-700 border-violet-200",
  "North West": "bg-indigo-50 text-indigo-700 border-indigo-200",
  "South East": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "South South": "bg-teal-50 text-teal-700 border-teal-200",
  "South West": "bg-orange-50 text-orange-700 border-orange-200",
};

export default function ConstituencyProjects() {
  const [search, setSearch] = useState("");
  const [zone, setZone] = useState("All Zones");
  const [status, setStatus] = useState("All Status");

  const filtered = useMemo(() => {
    return SCHOOLS.filter((s) => {
      const q = search.toLowerCase();
      return (
        (s.name.toLowerCase().includes(q) || s.state.toLowerCase().includes(q)) &&
        (zone === "All Zones" || s.zone === zone) &&
        (status === "All Status" || s.status === status)
      );
    });
  }, [search, zone, status]);

  const stats = useMemo(() => ({
    total: SCHOOLS.length,
    ongoing: SCHOOLS.filter((s) => s.status === "Ongoing").length,
    completed: SCHOOLS.filter((s) => s.status === "Completed").length,
    zones: [...new Set(SCHOOLS.map((s) => s.zone))].length,
  }), []);

  const zoneSummary = useMemo(() => {
    return ZONES.slice(1).map((z) => ({
      zone: z,
      count: SCHOOLS.filter((s) => s.zone === z).length,
    }));
  }, []);

  return (
    <div className="bg-white">
      <AboutHero
        title="Constituency Projects 2025/2026"
        subtitle="NSSEC's nationwide construction programme delivering infrastructure upgrades to 50 senior secondary schools across all six geopolitical zones — improving facilities for hundreds of thousands of students."
        breadcrumb={[
          { label: "Projects", path: "/projects/nssec-intervention" },
          { label: "Constituency Projects" },
        ]}
      />

      {/* Stats Bar */}
      <div className="bg-[#082c2c] text-white">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              { value: stats.total, label: "Total Projects" },
              { value: stats.zones, label: "Zones Covered" },
              { value: stats.ongoing, label: "Ongoing" },
              { value: stats.completed, label: "Completed" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.45 }}
                className="py-8 px-6 text-center"
              >
                <p className="text-3xl font-extrabold text-[#24c2c2]">{s.value}</p>
                <p className="text-sm text-white/60 mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Zone Distribution */}
      <section className="py-12 bg-gray-50 border-b border-gray-100 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[100rem] mx-auto">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-5">Projects by Zone</p>
          <div className="flex flex-wrap gap-3">
            {zoneSummary.map((z) => (
              <button
                key={z.zone}
                onClick={() => setZone(zone === z.zone ? "All Zones" : z.zone)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                  zone === z.zone
                    ? "bg-[#24c2c2] text-white border-[#24c2c2]"
                    : `${ZONE_COLORS[z.zone]} hover:opacity-80`
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                {z.zone}
                <span className="font-bold">{z.count}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Filters + Table */}
      <section className="py-12 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[100rem] mx-auto">

          {/* Filter Row */}
          <motion.div {...fade()} className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by school name or state…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#24c2c2]/30 focus:border-[#24c2c2]"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <select
                value={zone}
                onChange={(e) => setZone(e.target.value)}
                className="pl-9 pr-8 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#24c2c2]/30 focus:border-[#24c2c2] appearance-none w-full sm:w-auto"
              >
                {ZONES.map((z) => <option key={z}>{z}</option>)}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="pl-4 pr-8 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#24c2c2]/30 focus:border-[#24c2c2] appearance-none w-full sm:w-auto"
              >
                {STATUSES.map((s) => <option key={s}>{s}</option>)}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </motion.div>

          {/* Results count */}
          <p className="text-sm text-gray-500 mb-4">
            Showing <span className="font-semibold text-gray-900">{filtered.length}</span> of{" "}
            <span className="font-semibold text-gray-900">{SCHOOLS.length}</span> projects
          </p>

          {/* Desktop Table */}
          <motion.div {...fade(0.05)} className="hidden lg:block rounded-2xl overflow-hidden border border-gray-100">
            <table className="w-full">
              <thead>
                <tr className="bg-[#082c2c]">
                  <th className="px-5 py-4 text-left text-xs font-semibold text-white/70 uppercase tracking-wider w-12">#</th>
                  <th className="px-5 py-4 text-left text-xs font-semibold text-white/70 uppercase tracking-wider">Zone</th>
                  <th className="px-5 py-4 text-left text-xs font-semibold text-white/70 uppercase tracking-wider">State</th>
                  <th className="px-5 py-4 text-left text-xs font-semibold text-white/70 uppercase tracking-wider">School Name</th>
                  <th className="px-5 py-4 text-left text-xs font-semibold text-white/70 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {filtered.map((school, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4 text-sm text-gray-400 font-medium">{i + 1}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${ZONE_COLORS[school.zone]}`}>
                        <MapPin className="w-3 h-3" />
                        {school.zone}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold text-gray-900">{school.state}</td>
                    <td className="px-5 py-4 text-sm text-gray-700 max-w-xs">{school.name}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                        school.status === "Ongoing"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-[#24c2c2]/10 text-[#0e4a4a] border border-[#24c2c2]/30"
                      }`}>
                        {school.status === "Ongoing"
                          ? <Clock className="w-3 h-3" />
                          : <CheckCircle2 className="w-3 h-3" />}
                        {school.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* Mobile / Tablet Cards */}
          <div className="lg:hidden space-y-3">
            {filtered.map((school, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.03, 0.3) }}
                className="bg-white border border-gray-100 rounded-xl p-5"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-full bg-[#24c2c2] text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${ZONE_COLORS[school.zone]}`}>
                      {school.zone}
                    </span>
                  </div>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                    school.status === "Ongoing"
                      ? "bg-amber-50 text-amber-700 border border-amber-200"
                      : "bg-[#24c2c2]/10 text-[#0e4a4a] border border-[#24c2c2]/30"
                  }`}>
                    {school.status === "Ongoing" ? <Clock className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                    {school.status}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2 leading-snug">{school.name}</h3>
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Building2 className="w-3.5 h-3.5 text-[#24c2c2]" />
                  <span className="font-medium text-gray-700">{school.state} State</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filtered.length === 0 && (
            <div className="text-center py-16 border border-gray-100 rounded-2xl bg-gray-50">
              <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">No projects found</h3>
              <p className="text-sm text-gray-500">Adjust your search or filters to see results.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
