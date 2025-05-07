"use client";

import { useState, useEffect, use, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language/LanguageContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/components/card";
import { Badge } from "@/components/ui/components/badge";
import { Button } from "@/components/ui/components/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/components/avatar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/components/tabs";
import Link from "next/link";
import { format } from "date-fns";
import {
  FaCalendarAlt,
  FaClock,
  FaLaptopCode,
  FaTrophy,
  FaChevronLeft,
  FaLink,
  FaFileAlt,
  FaBuilding,
  FaRoad,
  FaClipboardCheck,
} from "react-icons/fa";
import {
  HiOutlineAcademicCap,
  HiStar,
  HiClock,
  HiTag,
  HiUsers,
} from "react-icons/hi";
import api from "@/axiosInstance";
import { events as mockEvents } from "@/lib/mock";
import ReactMarkdown from "react-markdown";

export default function MicroTaskDetailsPage({ params }) {
  // Create a client component wrapper
  return <ClientMicroTaskDetails params={params} />;
}

// Client component that handles all the rendering and state
function ClientMicroTaskDetails({ params }) {
  // Properly unwrap params with use() to avoid the warning
  const unwrappedParams = use(params);
  const { id } = unwrappedParams || {};

  const { toast } = useToast();
  const { t } = useLanguage();

  const [microTask, setMicroTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [userRole, setUserRole] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loadingSubmissions, setLoadingSubmissions] = useState(false);
  const [fileInputRef, setFileInputRef] = useState(useRef(null));
  const [selectedFile, setSelectedFile] = useState(null);
  const [solutionLink, setSolutionLink] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Roadmap state
  const [roadmap, setRoadmap] = useState(null);
  const [loadingRoadmap, setLoadingRoadmap] = useState(false);
  const [roadmapError, setRoadmapError] = useState(null);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "TBD";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format time
  const formatTime = (dateString) => {
    if (!dateString) return "TBD";
    const options = { hour: "2-digit", minute: "2-digit" };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };

  // Check if the deadline has passed
  const isDeadlinePassed = (deadline) => {
    if (!deadline) return false;
    return new Date(deadline) < new Date();
  };

  // Get user role from localStorage
  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window !== "undefined") {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const parsedToken = JSON.parse(token);
          // Extract role from token
          setUserRole(parsedToken.role || null);
          console.log("User role:", parsedToken.role);
        }
      } catch (err) {
        console.error("Error parsing token:", err);
      }
    }
  }, []);

  // Fetch submissions if user is a company
  useEffect(() => {
    if (userRole === "company" && unwrappedParams?.id) {
      const fetchSubmissions = async () => {
        setLoadingSubmissions(true);
        try {
          const response = await api.get(
            `/microtasks/${unwrappedParams.id}/submissions`,
            {
              params: {
                skip: 0,
                limit: 20,
              },
            }
          );

          if (response?.data && Array.isArray(response.data)) {
            setSubmissions(response.data);
            console.log("Fetched submissions:", response.data);
          } else {
            console.warn("Invalid submissions data format");
            setSubmissions([]);
          }
        } catch (err) {
          console.error("Error fetching submissions:", err);
          setSubmissions([]);
        } finally {
          setLoadingSubmissions(false);
        }
      };

      fetchSubmissions();
    }
  }, [userRole, unwrappedParams?.id]);

  // Fetch microtask data
  useEffect(() => {
    const fetchMicroTaskDetails = async () => {
      if (!unwrappedParams?.id) return;

      setLoading(true);
      try {
        // Call the microtasks API endpoint with the specific ID
        const response = await api.get(`/microtasks/${unwrappedParams.id}`);

        // Check if we have valid data
        if (response?.data) {
          // Process API data and add fallbacks for null values
          const processedData = {
            id: response.data?.id ?? unwrappedParams.id,
            title: response.data?.title ?? "Unnamed Microtask",
            description:
              response.data?.description ?? "No description available",
            difficulty: response.data?.difficulty ?? "beginner",
            points: response.data?.points ?? 0,
            deadline: response.data?.deadline ?? null,
            is_active: response.data?.is_active ?? true,
            max_submissions: response.data?.max_submissions ?? 0,
            category: response.data?.category ?? "",
            created_by: response.data?.created_by ?? {
              id: 0,
              company_name: "Unknown Company",
            },
            creation_date:
              response.data?.creation_date ?? new Date().toISOString(),
            required_skills: response.data?.required_skills ?? [],
            attachments: response.data?.attachments ?? [],
            completion_count: response.data?.completion_count ?? 0,
          };

          setMicroTask(processedData);
          console.log("Fetched microtask details from API:", processedData);
        } else {
          // Fallback to mock data if API returns invalid data
          console.warn("Invalid data format from API, using mock data instead");
          const mockTask = mockEvents.find(
            (event) => event.id.toString() === unwrappedParams.id.toString()
          );
          if (mockTask) {
            setMicroTask(mockTask);
          } else {
            throw new Error("Microtask not found");
          }
        }
      } catch (err) {
        console.error("Error fetching microtask details:", err);
        setError(err.message);

        // Try to find in mock data as fallback
        const mockTask = mockEvents.find(
          (event) => event.id.toString() === unwrappedParams.id.toString()
        );
        if (mockTask) {
          setMicroTask(mockTask);
        } else {
          toast({
            title: "Error",
            description: "Microtask not found. Please try again later.",
            variant: "destructive",
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMicroTaskDetails();
  }, [unwrappedParams, toast]);

  // File upload state
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleLinkChange = (e) => {
    setSolutionLink(e.target.value);
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  // Calculate days remaining until deadline
  const getDaysRemaining = (deadline) => {
    if (!deadline) return 0;
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  // Handle task submission
  const handleSubmitTask = async () => {
    if (!selectedFile && !solutionLink) {
      toast({
        title: "Submission Error",
        description: "Please upload a file or provide a solution link.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    try {
      // Create FormData object for file upload
      const formData = new FormData();

      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      if (solutionLink) {
        formData.append("solution_link", solutionLink);
      }

      // Make API call to submit the task
      const response = await api.put(
        `/microtasks/${unwrappedParams.id}/submit`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response?.data) {
        console.log("Task submission successful:", response.data);
        setSubmitSuccess(true);
        toast({
          title: "Submission Successful",
          description:
            "Your solution has been submitted successfully. We'll review it shortly.",
          variant: "default",
        });

        // Reset form
        setSelectedFile(null);
        setSolutionLink("");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err) {
      console.error("Error submitting task:", err);
      toast({
        title: "Submission Failed",
        description:
          err.response?.data?.detail ||
          "Failed to submit your solution. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Fetch roadmap data
  const fetchRoadmap = async () => {
    if (!unwrappedParams?.id) return;

    setLoadingRoadmap(true);
    setRoadmapError(null);

    try {

      // Make API call with the token
      const response = await api.post(
        `/ai/generate-task-roadmap?task_id=${unwrappedParams.id}`,
      );

      if (response?.data?.roadmap) {
        setRoadmap(response.data.roadmap);
      } else {
        throw new Error("Failed to generate roadmap");
      }
    } catch (err) {
      console.error("Error generating roadmap:", err);
      setRoadmapError(
        err.response?.data?.detail ||
          "Failed to generate roadmap. Please try again."
      );
      toast({
        title: "Error",
        description: "Failed to generate roadmap. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoadingRoadmap(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <Link
            href="/micro-tasks"
            className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <FaChevronLeft className="mr-2" />
            {t("Back to Microtasks")}
          </Link>
        </div>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-6"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
          <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <Link
            href="/micro-tasks"
            className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <FaChevronLeft className="mr-2" />
            {t("Back to Microtasks")}
          </Link>
        </div>
        <Card className="border-red-300 dark:border-red-700">
          <CardHeader>
            <CardTitle className="text-red-600 dark:text-red-400">
              {t("Error Loading Microtask")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => window.location.reload()} variant="outline">
              {t("Try Again")}
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // If no microtask data
  if (!microTask) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <Link
            href="/micro-tasks"
            className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <FaChevronLeft className="mr-2" />
            {t("Back to Microtasks")}
          </Link>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>{t("Microtask Not Found")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              {t(
                "The microtask you are looking for does not exist or has been removed."
              )}
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/micro-tasks">
              <Button variant="default">{t("Browse Microtasks")}</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Determine if the task is still active and deadline hasn't passed
  const isTaskAvailable =
    microTask.is_active && !isDeadlinePassed(microTask.deadline);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back button */}
      <div className="flex justify-between items-center mb-6">
        <Link
          href="/micro-tasks"
          className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          <FaChevronLeft className="mr-2" />
          {t("Back to Microtasks")}
        </Link>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Task details */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="mb-6 overflow-hidden">
              {/* Task header */}
              <CardHeader className="pb-2">
                <div className="flex flex-wrap gap-2 mb-2">
                  <Badge
                    variant="outline"
                    className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200"
                  >
                    {microTask.category || "General"}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={
                      microTask.difficulty === "beginner"
                        ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                        : microTask.difficulty === "intermediate"
                        ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
                        : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                    }
                  >
                    {microTask.difficulty.charAt(0).toUpperCase() +
                      microTask.difficulty.slice(1)}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200"
                  >
                    {microTask.points} Points
                  </Badge>
                  {!isTaskAvailable && (
                    <Badge
                      variant="outline"
                      className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                    >
                      {isDeadlinePassed(microTask.deadline)
                        ? "Deadline Passed"
                        : "Inactive"}
                    </Badge>
                  )}
                </div>

                <CardTitle className="text-2xl md:text-3xl">
                  {microTask.title}
                </CardTitle>

                <div className="flex flex-wrap items-center gap-4 text-sm mt-2">
                  {microTask.deadline && (
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <FaCalendarAlt className="mr-2" />
                      Due: {formatDate(microTask.deadline)}
                    </div>
                  )}

                  {microTask.created_by && (
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <FaBuilding className="mr-2" />
                      By:{" "}
                      {microTask.created_by.company_name || "Unknown Company"}
                    </div>
                  )}

                  {microTask.creation_date && (
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <FaClock className="mr-2" />
                      Posted: {formatDate(microTask.creation_date)}
                    </div>
                  )}
                </div>
              </CardHeader>

              {/* Task content */}
              <CardContent>
                <Tabs
                  defaultValue="overview"
                  className="mt-4"
                  onValueChange={setActiveTab}
                >
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    {userRole === "student" ? (
                      <TabsTrigger value="submission">
                        Submit Solution
                      </TabsTrigger>
                    ) : (
                      <TabsTrigger value="submissions">
                        View Submissions
                      </TabsTrigger>
                    )}
                    <TabsTrigger value="details">Details</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="mt-4 space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Description
                      </h3>
                      <div className="prose dark:prose-invert max-w-none">
                        <p className="whitespace-pre-line">
                          {microTask.description}
                        </p>
                      </div>
                    </div>

                    {microTask.required_skills &&
                      microTask.required_skills.length > 0 && (
                        <div>
                          <h3 className="text-lg font-semibold mb-2">
                            Required Skills
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {microTask.required_skills.map((skill, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                              >
                                {skill.name || skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                    {microTask.attachments &&
                      microTask.attachments.length > 0 && (
                        <div>
                          <h3 className="text-lg font-semibold mb-2">
                            Attachments
                          </h3>
                          <div className="space-y-2">
                            {microTask.attachments.map((attachment, index) => (
                              <a
                                key={index}
                                href={`${process.env.NEXT_PUBLIC_ENDPOINT}/${attachment.file_url}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
                              >
                                <FaFileAlt className="mr-2 text-indigo-600" />
                                {attachment.description || `Attachment ${index + 1}`}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                  </TabsContent>

                  {/* Student submission tab */}
                  {userRole === "student" && (
                    <TabsContent value="submission" className="mt-4 space-y-4">
                      {isTaskAvailable ? (
                        <div>
                          <h3 className="text-lg font-semibold mb-4">
                            Submit Your Solution
                          </h3>
                          <p className="mb-4">
                            Upload your solution files or provide a link to your
                            work.
                          </p>

                          {submitSuccess ? (
                            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
                              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 dark:bg-green-800 rounded-full mb-4">
                                <FaClipboardCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
                              </div>
                              <h4 className="text-lg font-semibold mb-2 text-green-800 dark:text-green-400">
                                Solution Submitted Successfully!
                              </h4>
                              <p className="text-green-700 dark:text-green-300 mb-4">
                                Your solution has been received and will be
                                reviewed shortly.
                              </p>
                              <Button
                                variant="outline"
                                className="border-green-500 text-green-600 hover:bg-green-50 dark:border-green-700 dark:text-green-400 dark:hover:bg-green-900/30"
                                onClick={() => setSubmitSuccess(false)}
                              >
                                Submit Another Solution
                              </Button>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              {/* File upload area */}
                              <div
                                className={`border-2 border-dashed ${
                                  selectedFile
                                    ? "border-indigo-300 bg-indigo-50 dark:border-indigo-700 dark:bg-indigo-900/20"
                                    : "border-gray-300 dark:border-gray-700"
                                } rounded-lg p-8 text-center`}
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                                onClick={handleBrowseClick}
                              >
                                {selectedFile ? (
                                  <div>
                                    <div className="flex items-center justify-center w-12 h-12 mx-auto bg-indigo-100 dark:bg-indigo-800 rounded-full mb-2">
                                      <FaFileAlt className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                    <p className="font-medium text-indigo-700 dark:text-indigo-300">
                                      {selectedFile.name}
                                    </p>
                                    <p className="text-sm text-indigo-600 dark:text-indigo-400 mt-1">
                                      {(selectedFile.size / 1024).toFixed(2)} KB
                                    </p>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="mt-2 text-xs"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedFile(null);
                                      }}
                                    >
                                      Remove File
                                    </Button>
                                  </div>
                                ) : (
                                  <>
                                    <FaFileAlt className="mx-auto h-12 w-12 text-gray-400" />
                                    <p className="mt-2">
                                      Drag and drop your files here, or click to
                                      browse
                                    </p>
                                    <Button
                                      variant="outline"
                                      className="mt-4"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleBrowseClick();
                                      }}
                                    >
                                      Browse Files
                                    </Button>
                                  </>
                                )}
                                <input
                                  type="file"
                                  className="hidden"
                                  ref={fileInputRef}
                                  onChange={handleFileChange}
                                />
                              </div>

                              {/* Solution link input */}
                              <div>
                                <label className="block text-sm font-medium mb-2">
                                  Or provide a link to your solution
                                </label>
                                <div className="flex">
                                  <input
                                    type="text"
                                    placeholder="https://github.com/yourusername/repo"
                                    className="flex-1 rounded-l-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
                                    value={solutionLink}
                                    onChange={handleLinkChange}
                                  />
                                  <Button
                                    className="rounded-l-none"
                                    onClick={() => setSolutionLink("")}
                                    disabled={!solutionLink}
                                  >
                                    Clear
                                  </Button>
                                </div>
                              </div>

                              {/* Submit button */}
                              <div className="pt-4 border-t">
                                <Button
                                  onClick={handleSubmitTask}
                                  className="w-full bg-indigo-600 hover:bg-indigo-700"
                                  disabled={
                                    submitting ||
                                    (!selectedFile && !solutionLink)
                                  }
                                >
                                  {submitting ? (
                                    <>
                                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                      Submitting...
                                    </>
                                  ) : (
                                    "Submit Solution"
                                  )}
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <FaClock className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                          <h3 className="text-lg font-semibold mb-2">
                            {isDeadlinePassed(microTask.deadline)
                              ? "Deadline has passed"
                              : "This task is no longer active"}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-4">
                            {isDeadlinePassed(microTask.deadline)
                              ? `The submission deadline was ${formatDate(
                                  microTask.deadline
                                )}`
                              : "The task has been closed by the company"}
                          </p>
                          <Link href="/micro-tasks">
                            <Button variant="outline">
                              Browse Other Tasks
                            </Button>
                          </Link>
                        </div>
                      )}
                    </TabsContent>
                  )}

                  {/* Company submissions tab */}
                  {userRole === "company" && (
                    <TabsContent value="submissions" className="mt-4 space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">
                          Student Submissions
                        </h3>
                        {loadingSubmissions ? (
                          <div className="flex justify-center py-8">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
                          </div>
                        ) : submissions.length === 0 ? (
                          <div className="text-center py-8 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                            <div className="mx-auto h-12 w-12 text-gray-400 mb-4 flex items-center justify-center">
                              <FaClipboardCheck className="h-8 w-8" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">
                              No Submissions Yet
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                              There are no student submissions for this task
                              yet.
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {submissions.map((submission) => (
                              <Card
                                key={submission.id}
                                className="overflow-hidden"
                              >
                                <CardHeader className="pb-2">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <div className="flex items-center gap-2">
                                        <Badge
                                          className={`${
                                            submission.status === "pending"
                                              ? "bg-yellow-500"
                                              : submission.status === "approved"
                                              ? "bg-green-500"
                                              : "bg-red-500"
                                          }`}
                                        >
                                          {submission.status
                                            .charAt(0)
                                            .toUpperCase() +
                                            submission.status.slice(1)}
                                        </Badge>
                                        <span className="text-sm text-gray-500">
                                          Submitted on{" "}
                                          {formatDate(
                                            submission.submission_date
                                          )}
                                        </span>
                                      </div>
                                      <h4 className="text-lg font-semibold mt-1">
                                        Submission #{submission.id}
                                      </h4>
                                    </div>
                                    <div className="text-right">
                                      <p className="text-sm font-medium">
                                        Student ID: {submission.student_id}
                                      </p>
                                      {submission.score !== null && (
                                        <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                                          Score: {submission.score}/10
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                </CardHeader>
                                <CardContent>
                                  {submission.file_url ? (
                                    <div className="border rounded-md p-3 bg-gray-50 dark:bg-gray-800/50">
                                      <a
                                        href={submission.file_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
                                      >
                                        <FaFileAlt className="mr-2" />
                                        View Submission File
                                      </a>
                                    </div>
                                  ) : (
                                    <p className="text-gray-500 italic">
                                      No file attached
                                    </p>
                                  )}

                                  {submission.feedback && (
                                    <div className="mt-4">
                                      <h5 className="font-medium mb-1">
                                        Feedback:
                                      </h5>
                                      <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md">
                                        {submission.feedback}
                                      </p>
                                    </div>
                                  )}
                                </CardContent>
                                {submission.status === "pending" && (
                                  <CardFooter className="border-t pt-4 flex justify-end gap-2">
                                    <Button
                                      variant="outline"
                                      className="border-red-500 text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/30"
                                    >
                                      Reject
                                    </Button>
                                    <Button className="bg-green-600 hover:bg-green-700">
                                      Approve
                                    </Button>
                                  </CardFooter>
                                )}
                              </Card>
                            ))}
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  )}

                  {/* Details tab for both roles */}
                  <TabsContent value="details" className="mt-4 space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Task Details
                      </h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Task Information
                            </h4>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">
                                  ID:
                                </span>
                                <span className="font-medium">
                                  {microTask.id}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">
                                  Category:
                                </span>
                                <span className="font-medium">
                                  {microTask.category || "General"}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">
                                  Created:
                                </span>
                                <span className="font-medium">
                                  {formatDate(microTask.creation_date)}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">
                                  Status:
                                </span>
                                <Badge
                                  className={
                                    microTask.is_active
                                      ? "bg-green-500"
                                      : "bg-red-500"
                                  }
                                >
                                  {microTask.is_active ? "Active" : "Inactive"}
                                </Badge>
                              </div>
                            </div>
                          </div>

                          <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Submission Details
                            </h4>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">
                                  Deadline:
                                </span>
                                <span className="font-medium">
                                  {formatDate(microTask.deadline)}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">
                                  Max Submissions:
                                </span>
                                <span className="font-medium">
                                  {microTask.max_submissions || "Unlimited"}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">
                                  Points:
                                </span>
                                <span className="font-medium">
                                  {microTask.points}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">
                                  Time Left:
                                </span>
                                <span className="font-medium">
                                  {isDeadlinePassed(microTask.deadline)
                                    ? "Expired"
                                    : `${getDaysRemaining(
                                        microTask.deadline
                                      )} days`}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {microTask.created_by && (
                          <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Created By
                            </h4>
                            <div className="flex items-center">
                              <Avatar className="h-10 w-10 mr-3">
                                <AvatarImage
                                  src="/company-logo.png"
                                  alt={
                                    microTask.created_by.company_name ||
                                    "Company"
                                  }
                                />
                                <AvatarFallback className="bg-indigo-100 text-indigo-800">
                                  {(microTask.created_by.company_name || "C")
                                    .charAt(0)
                                    .toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">
                                  {microTask.created_by.company_name ||
                                    "Unknown Company"}
                                </p>
                                {microTask.created_by.id && (
                                  <Link
                                    href={`/company/dashboard/${microTask.created_by.id}`}
                                    className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors"
                                  >
                                    View Company Profile
                                  </Link>
                                )}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* AI Roadmap Section */}
                        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-4">
                            <h4 className="font-medium text-gray-700 dark:text-gray-300">
                              AI Learning Roadmap
                            </h4>
                            {!roadmap && !loadingRoadmap && (
                              <Button
                                onClick={fetchRoadmap}
                                size="sm"
                                className="bg-indigo-600 hover:bg-indigo-700"
                              >
                                <FaRoad className="mr-2" />
                                Generate Roadmap
                              </Button>
                            )}
                          </div>

                          {loadingRoadmap ? (
                            <div className="flex flex-col items-center justify-center py-8">
                              <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent mb-4"></div>
                              <p className="text-gray-600 dark:text-gray-400">
                                Generating your personalized roadmap...
                              </p>
                            </div>
                          ) : roadmapError ? (
                            <div className="text-center py-4">
                              <p className="text-red-500 mb-2">
                                {roadmapError}
                              </p>
                              <Button
                                onClick={fetchRoadmap}
                                variant="outline"
                                size="sm"
                              >
                                Try Again
                              </Button>
                            </div>
                          ) : roadmap ? (
                            <div className="prose dark:prose-invert max-w-none">
                              <ReactMarkdown>{roadmap}</ReactMarkdown>
                            </div>
                          ) : (
                            <p className="text-gray-600 dark:text-gray-400 text-center py-4">
                              Generate a personalized AI roadmap to help you
                              complete this task efficiently.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Right column - Sidebar */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Task status card */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-xl">Task Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">
                    Status:
                  </span>
                  <Badge
                    className={isTaskAvailable ? "bg-green-600" : "bg-red-600"}
                  >
                    {isTaskAvailable ? "Open" : "Closed"}
                  </Badge>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">
                    Points:
                  </span>
                  <span className="font-semibold">{microTask.points}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">
                    Difficulty:
                  </span>
                  <span className="font-semibold capitalize">
                    {microTask.difficulty}
                  </span>
                </div>

                {microTask.deadline && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">
                      Deadline:
                    </span>
                    <span className="font-semibold">
                      {formatDate(microTask.deadline)}
                    </span>
                  </div>
                )}

                {microTask.max_submissions > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">
                      Max Submissions:
                    </span>
                    <span className="font-semibold">
                      {microTask.max_submissions}
                    </span>
                  </div>
                )}

                {microTask.completion_count !== null && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">
                      Completions:
                    </span>
                    <span className="font-semibold">
                      {microTask.completion_count}
                    </span>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                {isTaskAvailable ? (
                  <Button
                    className="w-full bg-indigo-600 hover:bg-indigo-700"
                    onClick={() => setActiveTab("submission")}
                  >
                    Submit Solution
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full" disabled>
                    {isDeadlinePassed(microTask.deadline)
                      ? "Deadline Passed"
                      : "Task Closed"}
                  </Button>
                )}
              </CardFooter>
            </Card>

            {/* Company info card */}
            {microTask.created_by && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Posted By</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src="/company-logo.png"
                      alt={microTask.created_by.company_name || "Company"}
                    />
                    <AvatarFallback className="bg-indigo-100 text-indigo-800">
                      {(microTask.created_by.company_name || "C")
                        .charAt(0)
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">
                      {microTask.created_by.company_name || "Unknown Company"}
                    </p>
                    {microTask.created_by.id && (
                      <Link
                        href={`/company/dashboard/${microTask.created_by.id}`}
                        className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors"
                      >
                        View Company Profile
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
