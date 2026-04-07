"use client";
import { createContext, useContext, useState, useEffect , useMemo} from "react";
import { useParams } from "next/navigation";
import { sanityClient } from "../../lib/sanityClient"; // adjust path

const BlogContext = createContext();

export function BlogProvider({ children }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);
  const [updatedPost, setUpdatedPost] = useState(null);

  // comment form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [comment, setComment] = useState("");
  const [isMessage, setIsMessage] = useState("");
  const [isSuccess, setSuccess] = useState(true);
// publications

  const [publications, setPublications] = useState([]);
  /** ── SCHOOLS STATES ── **/
  const [schools, setSchools] = useState([]);
  const [loadingSchools, setLoadingSchools] = useState(true);
  const [schoolSearchTerm, setSchoolSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedState, setSelectedState] = useState("All States");
  const schoolsPerPage = 5;
  // error states
  const [error, setError] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [commentError, setCommentError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [agreed, setAgreed] = useState(false);

  const params = useParams();
  const slug = params?.slug;

 /** 🔹 Fetch all publications */
const fetchPublications = async () => {
  setLoading(true);
  try {
    const query = `*[_type == "publications"] | order(_createdAt desc){
      _id,
      title,
      slug,
    "pdfUrl": download.asset->url,
      category,
      _createdAt
    }`;
    
    const data = await sanityClient.fetch(query);
    setPublications(data);
  } catch (err) {
    console.error("Error fetching publications from Sanity:", err);
    setError("Failed to load publications");
  } finally {
    setLoading(false);
  }
};


  /** 🔹 Fetch all blogs */
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const query = `*[_type == "mediaPost"] | order(_createdAt desc){
        _id,
        title,
        slug,
        description,
        content,
        image{
          asset->{_id, url}
        },
        mainCategory,
        subCategory,
        comments,
        views,
        publishedAt,
        _createdAt
      }`;
      const data = await sanityClient.fetch(query);
      setBlogs(data);
    } catch (err) {
      console.error("Error fetching blogs from Sanity:", err);
      setError("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  /** 🔹 Fetch a single post by slug */
  useEffect(() => {
    const fetchPostBySlug = async () => {
      if (!slug) return;
      try {
        const query = `*[_type == "mediaPost" && slug.current == $slug][0]{
          _id,
          title,
          slug,
          description,
          content,
          image{
            asset->{_id, url}
          },
          mainCategory,
          subCategory,
          comments,
          views,
          publishedAt,
          _createdAt
        }`;
        const data = await sanityClient.fetch(query, { slug });
        setPost(data); // data is now a single object
      } catch (err) {
        console.error("Error fetching single post:", err);
      }
    };
  
    fetchPostBySlug();
  }, [slug]);
  
  /** ── FETCH SCHOOLS ── **/
  const fetchSchools = async () => {
    setLoading(true);
    try {
      const query = `*[_type == "school"] | order(name asc){
        _id,
        name,
        slug,
        state,
        lga,
        type,
        ownership,
        status,
        phone,
        email
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

  // Extract all states from data
  const states = useMemo(() => {
    const s = schools.map((s) => s.state);
    return ["All States", ...Array.from(new Set(s))];
  }, [schools]);

  /** 🔹 Initial fetch */
  useEffect(() => {
    fetchBlogs();
    fetchSchools();
    fetchPublications();
  }, []);

  /** 🔹 Increment views when post is opened */
/** 🔹 Increment views when post is opened */
useEffect(() => {
  const updateViews = async () => {
    if (!post?.slug?.current) return;

    try {
      // Call your Sanity views API
      const res = await fetch(`/api/views/${post.slug.current}`, { method: "POST" });
      const data = await res.json();

      // Sanity returns an object with mutation results, extract updated views
      const updatedViews = data?.results?.[0]?.document?.views;
      if (updatedViews !== undefined) {
        setUpdatedPost(prev => ({
          ...post,
          views: updatedViews,
        }));
      }
    } catch (err) {
      console.error("Error updating views:", err);
    }
  };

  updateViews();
}, [post?.slug?.current]);

  /** 🔹 Save commenter info */
  useEffect(() => {
    const savedName = localStorage.getItem("commenterName");
    const savedEmail = localStorage.getItem("commenterEmail");
    const savedWebsite = localStorage.getItem("commenterWebsite");
    if (savedName) setName(savedName);
    if (savedEmail) setEmail(savedEmail);
    if (savedWebsite) setWebsite(savedWebsite);
  }, []);

  const handleSaveInfo = (e) => {
    if (e.target.checked) {
      localStorage.setItem("commenterName", name);
      localStorage.setItem("commenterEmail", email);
      localStorage.setItem("commenterWebsite", website);
    }
  };

  /** 🔹 Handle comments submission */
  const handleComments = async (e) => {
    e.preventDefault();

    setNameError("");
    setEmailError("");
    setCommentError("");

    if (!name.trim()) return setNameError("Please enter your name.");
    if (!email.trim()) return setEmailError("Email is required.");
    if (!comment.trim()) return setCommentError("Please write your comment.");

    setLoading(true);
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId: post?._id,
          name,
          email,
          website,
          comment,
        }),
      });

      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "Failed to submit comment.");

      setIsMessage("Comment submitted!");
      setSuccess(true);
      setName("");
      setEmail("");
      setWebsite("");
      setComment("");
      setAgreed(false);

      fetchBlogs(); // refresh blogs list with updated comments
    } catch (err) {
      console.error("Comment error:", err);
      setIsMessage(err.message || "Network issue, please try again.");
      setSuccess(false);
    } finally {
      setLoading(false);
      setTimeout(() => setIsMessage(""), 5000);
    }
  };

  /** 🔹 Helpers */
  const formatTime = (timestamp) => {
    const now = new Date();
    const postDate = new Date(timestamp);
    const seconds = Math.floor((now - postDate) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return `${seconds} seconds ago`;
    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    if (days < 30) return `${days} days ago`;

    return postDate.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  /** 🔹 Search + archive */
  const filteredPosts = blogs.filter((p) => {
    const term = searchTerm.toLowerCase();
    return (
      p.title?.toLowerCase().includes(term) ||
      p.content?.some((block) =>
        block.children?.some((c) => c.text.toLowerCase().includes(term))
      ) ||
      p.category?.some((cat) => cat.toLowerCase().includes(term))
    );
  });

  // Filtered list
  const filteredSchools = useMemo(() => {
    return schools.filter(school => {
      const matchesSearch =
        school.name.toLowerCase().includes(schoolSearchTerm.toLowerCase()) ||
        school.state.toLowerCase().includes(schoolSearchTerm.toLowerCase()) ||
        school.status.toLowerCase().includes(schoolSearchTerm.toLowerCase()) ||
        (school.lga || "").toLowerCase().includes(schoolSearchTerm.toLowerCase());

      const matchesState =
        selectedState === "All States" || school.state === selectedState;

      return matchesSearch && matchesState;
    });
  }, [schools, schoolSearchTerm, selectedState]);

  const indexOfLastSchool = currentPage * schoolsPerPage;
  const indexOfFirstSchool = indexOfLastSchool - schoolsPerPage;
  // const currentSchools = schools.slice(indexOfFirstSchool, indexOfLastSchool);

  // Pagination slice
  const totalPages = Math.ceil(filteredSchools.length / schoolsPerPage);
  const currentSchools = filteredSchools.slice(
    (currentPage - 1) * schoolsPerPage,
    currentPage * schoolsPerPage
  );

  const nextPage = () =>
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () =>
    setCurrentPage(prev => Math.max(prev - 1, 1));
  const goToPage = (page) => setCurrentPage(page);


  const archiveDates = Array.from(
    new Set(
      blogs.map((p) => {
        const d = new Date(p._createdAt);
        return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(
          2,
          "0"
        )}`;
      })
    )
  ).sort((a, b) => (a > b ? -1 : 1));

  return (
    <BlogContext.Provider
      value={{
        publications,
        blogs,
        loading,
        fetchBlogs,
        post,
        updatedPost,
        handleComments,
        handleSaveInfo,
        searchTerm,
        setSearchTerm,
        archiveDates,
        filteredPosts,
        name,
        setName,
        email,
        setEmail,
        website,
        setWebsite,
        comment,
        setComment,
        formatTime,
        isMessage,
        isSuccess,
        error,
        agreed,
        setAgreed,
        nameError,
        emailError,
        commentError,
        /** SCHOOLS */
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
        error,
        states,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
}

export const useBlogContext = () => useContext(BlogContext);
