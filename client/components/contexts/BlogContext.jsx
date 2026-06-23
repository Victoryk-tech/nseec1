"use client";
import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { sanityClient } from "@/app/lib/sanityClient";

const BlogContext = createContext();

export function BlogProvider({ children }) {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [schoolSearchTerm, setSchoolSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedState, setSelectedState] = useState("All States");
  const schoolsPerPage = 5;
  const [error, setError] = useState(false);

  const fetchSchools = async () => {
    setLoading(true);
    try {
      const query = `*[_type == "school"] | order(name asc){
        _id, name, slug, state, lga, type, ownership, status, phone, email
      }`;
      const data = await sanityClient.fetch(query);
      setSchools(data);
    } catch (err) {
      console.error("Error fetching schools:", err);
      setError("Failed to load schools");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  const states = useMemo(() => {
    const s = schools.map((s) => s.state);
    return ["All States", ...Array.from(new Set(s))];
  }, [schools]);

  const filteredSchools = useMemo(() => {
    return schools.filter((school) => {
      const matchesSearch =
        school.name.toLowerCase().includes(schoolSearchTerm.toLowerCase()) ||
        school.state.toLowerCase().includes(schoolSearchTerm.toLowerCase()) ||
        school.status.toLowerCase().includes(schoolSearchTerm.toLowerCase()) ||
        (school.lga || "").toLowerCase().includes(schoolSearchTerm.toLowerCase());
      const matchesState = selectedState === "All States" || school.state === selectedState;
      return matchesSearch && matchesState;
    });
  }, [schools, schoolSearchTerm, selectedState]);

  const totalPages = Math.ceil(filteredSchools.length / schoolsPerPage);
  const currentSchools = filteredSchools.slice(
    (currentPage - 1) * schoolsPerPage,
    currentPage * schoolsPerPage
  );
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToPage = (page) => setCurrentPage(page);

  return (
    <BlogContext.Provider
      value={{
        loading,
        error,
        schools,
        fetchSchools,
        schoolSearchTerm,
        setSchoolSearchTerm,
        filteredSchools,
        selectedState,
        setSelectedState,
        currentSchools,
        currentPage,
        totalPages,
        nextPage,
        prevPage,
        goToPage,
        states,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
}

export const useBlogContext = () => useContext(BlogContext);
