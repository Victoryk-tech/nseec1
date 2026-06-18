"use client";
import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { sanityClient } from "@/app/lib/sanityClient";

const BlogContext = createContext();

export function BlogProvider({ children }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);
  const [updatedPost, setUpdatedPost] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [comment, setComment] = useState("");
  const [isMessage, setIsMessage] = useState("");
  const [isSuccess, setSuccess] = useState(true);

  const [publications, setPublications] = useState([]);
  const [schools, setSchools] = useState([]);
  const [schoolSearchTerm, setSchoolSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedState, setSelectedState] = useState("All States");
  const schoolsPerPage = 5;

  const [error, setError] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [commentError, setCommentError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [agreed, setAgreed] = useState(false);

  const params = useParams();
  const slug = params?.slug;

  const fetchPublications = async () => {
    setLoading(true);
    try {
      const query = `*[_type == "publications"] | order(publishedAt desc, _createdAt desc){
        _id,
        title,
        slug,
        description,
        "pdfUrl": download.asset->url,
        "pdfFilename": download.asset->originalFilename,
        "coverImageUrl": coalesce(cloudinaryUrl, coverImage.asset->url),
        category,
        author,
        publishedAt,
        fileSize,
        pageCount,
        views,
        downloadCount,
        featured,
        "tags": tags[]->{_id, title, "slug": slug.current, category}
      }`;
      const data = await sanityClient.fetch(query);
      setPublications(data);
    } catch (err) {
      console.error("Error fetching publications:", err);
      setError("Failed to load publications");
    } finally {
      setLoading(false);
    }
  };

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const query = `*[_type == "mediaPost"] | order(publishedAt desc, _createdAt desc){
        _id,
        title,
        slug,
        description,
        content,
        "imageUrl": coalesce(cloudinaryUrl, image.asset->url),
        image{ asset->{_id, url} },
        mainCategory,
        subCategory,
        "author": author->{ name, "imageUrl": image.asset->url },
        comments,
        views,
        featured,
        publishedAt,
        _createdAt,
        hashtags,
        "tags": tags[]->{_id, title, "slug": slug.current, category},
        "galleryImages": galleryImages[]{
          "imageUrl": coalesce(cloudinaryUrl, image.asset->url),
          caption,
          altText
        }
      }`;
      const data = await sanityClient.fetch(query);
      setBlogs(data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

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
          "imageUrl": coalesce(cloudinaryUrl, image.asset->url),
          image{ asset->{_id, url} },
          mainCategory,
          subCategory,
          "author": author->{ name, "imageUrl": image.asset->url },
          comments,
          views,
          featured,
          publishedAt,
          _createdAt,
          hashtags,
          "tags": tags[]->{_id, title, "slug": slug.current, category},
          "galleryImages": galleryImages[]{
            "imageUrl": coalesce(cloudinaryUrl, image.asset->url),
            caption,
            altText
          }
        }`;
        const data = await sanityClient.fetch(query, { slug });
        setPost(data);
      } catch (err) {
        console.error("Error fetching single post:", err);
      }
    };
    fetchPostBySlug();
  }, [slug]);

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

  const states = useMemo(() => {
    const s = schools.map((s) => s.state);
    return ["All States", ...Array.from(new Set(s))];
  }, [schools]);

  useEffect(() => {
    fetchBlogs();
    fetchSchools();
    fetchPublications();
  }, []);

  useEffect(() => {
    const updateViews = async () => {
      if (!post?.slug?.current) return;
      try {
        const res = await fetch(`/api/views/${post.slug.current}`, { method: "POST" });
        const data = await res.json();
        const updatedViews = data?.results?.[0]?.document?.views;
        if (updatedViews !== undefined) {
          setUpdatedPost({ ...post, views: updatedViews });
        }
      } catch (err) {
        console.error("Error updating views:", err);
      }
    };
    updateViews();
  }, [post?.slug?.current]);

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

  const handleComments = async (e) => {
    e.preventDefault();
    setNameError(""); setEmailError(""); setCommentError("");
    if (!name.trim()) return setNameError("Please enter your name.");
    if (!email.trim()) return setEmailError("Email is required.");
    if (!comment.trim()) return setCommentError("Please write your comment.");
    setLoading(true);
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId: post?._id, name, email, website, comment }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to submit comment.");
      setIsMessage("Comment submitted!");
      setSuccess(true);
      setName(""); setEmail(""); setWebsite(""); setComment(""); setAgreed(false);
      fetchBlogs();
    } catch (err) {
      console.error("Comment error:", err);
      setIsMessage(err.message || "Network issue, please try again.");
      setSuccess(false);
    } finally {
      setLoading(false);
      setTimeout(() => setIsMessage(""), 5000);
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const now = new Date();
    const postDate = new Date(timestamp);
    const seconds = Math.floor((now - postDate) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (seconds < 60) return `${seconds}s ago`;
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 30) return `${days} days ago`;
    return postDate.toLocaleDateString("en-NG", { year: "numeric", month: "short", day: "numeric" });
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    return new Date(timestamp).toLocaleDateString("en-NG", {
      year: "numeric", month: "long", day: "numeric",
    });
  };

  const filteredPosts = blogs.filter((p) => {
    const term = searchTerm.toLowerCase();
    return (
      p.title?.toLowerCase().includes(term) ||
      p.content?.some((block) => block.children?.some((c) => c.text?.toLowerCase().includes(term))) ||
      p.mainCategory?.toLowerCase().includes(term)
    );
  });

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

  const archiveDates = Array.from(
    new Set(
      blogs.map((p) => {
        const d = new Date(p._createdAt);
        return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}`;
      })
    )
  ).sort((a, b) => (a > b ? -1 : 1));

  const mainCategories = Array.from(new Set(blogs.map((b) => b.mainCategory).filter(Boolean)));
  const publicationsCategories = Array.from(new Set(publications.map((b) => b.category).filter(Boolean)));

  return (
    <BlogContext.Provider
      value={{
        publications,
        blogs,
        loading,
        fetchBlogs,
        fetchPublications,
        post,
        updatedPost,
        handleComments,
        handleSaveInfo,
        searchTerm,
        setSearchTerm,
        archiveDates,
        filteredPosts,
        mainCategories,
        publicationsCategories,
        name, setName,
        email, setEmail,
        website, setWebsite,
        comment, setComment,
        formatTime,
        formatDate,
        isMessage,
        isSuccess,
        error,
        agreed,
        setAgreed,
        nameError,
        emailError,
        commentError,
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
