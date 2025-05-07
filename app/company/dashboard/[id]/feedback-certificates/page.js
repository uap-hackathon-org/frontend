"use client";

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/language/LanguageContext';

// UI Components
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/components/card';
import { Badge } from '@/components/ui/components/badge';
import { Button } from '@/components/ui/components/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/components/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/components/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/components/dialog';
import { Input } from '@/components/ui/components/input';
import { Label } from '@/components/ui/components/label';
import { Textarea } from '@/components/ui/components/textarea';
import { Slider } from '@/components/ui/components/slider';
import { Toaster } from '@/components/ui/components/toaster';

// Icons
import { TbCertificate } from 'react-icons/tb';
import { RiVideoFill, RiGithubFill, RiFeedbackFill, RiStarFill } from 'react-icons/ri';
import { FaYoutube, FaExternalLinkAlt, FaGithub, FaUniversity, FaUserGraduate, FaCalendarAlt, FaCertificate } from 'react-icons/fa';
import { BsPatchCheckFill, BsCheckCircleFill, BsHourglassSplit, BsFillFileEarmarkTextFill } from 'react-icons/bs';
import { MdFeedback, MdPending, MdAssignment, MdAssignmentTurnedIn, MdSchool } from 'react-icons/md';

// Mock Data
import { studentSubmissions, getMockSubmissionsForCompany, getMockCompanyById } from '@/lib/mock';

export default function FeedbackCertificates({ params }) {
  // Create a client component wrapper
  return <ClientFeedbackCertificates params={params} />;
}

// Submission card component for displaying student submissions
const SubmissionCard = ({ submission, onFeedback, onIssueCertificate }) => {
  const { t } = useLanguage();
  const submissionDate = new Date(submission.submissionDate);
  const isPending = submission.status === 'pending';
  
  // Extract YouTube video ID from YouTube link
  const getYouTubeVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };
  
  const youtubeId = getYouTubeVideoId(submission.youtubeLink);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <div className="grid md:grid-cols-[1fr_300px] gap-6">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <MdAssignment className="h-5 w-5 text-blue-500" />
                  <h3 className="text-xl font-semibold">{submission.taskTitle}</h3>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <FaCalendarAlt className="h-3 w-3" />
                    {format(submissionDate, 'MMM d, yyyy')}
                  </div>
                  <Badge
                    variant={isPending ? "outline" : "default"}
                    className={isPending 
                      ? "bg-amber-100 text-amber-700 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400" 
                      : "bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400"}
                  >
                    {isPending ? t('Pending Review') : t('Reviewed')}
                  </Badge>
                  {!isPending && (
                    <div className="flex items-center gap-1 text-yellow-500">
                      <RiStarFill className="h-4 w-4" />
                      {submission.score}/100
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                <AvatarImage src={submission.student.avatar} alt={submission.student.name} />
                <AvatarFallback>{submission.student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-medium">{submission.student.name}</h4>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MdSchool className="h-3 w-3" />
                  {submission.student.university}, {t('Year')} {submission.student.year}
                </div>
              </div>
            </div>
            
            <div className="mb-4 text-muted-foreground text-sm">
              <BsFillFileEarmarkTextFill className="h-4 w-4 inline-block mr-2 text-blue-500" />
              <span className="font-medium">{t('Description')}:</span>
              <p className="mt-1">{submission.description}</p>
            </div>
            
            <div className="flex flex-wrap gap-3 mb-6">
              <a 
                href={submission.githubLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full text-sm transition-colors"
              >
                <FaGithub className="h-4 w-4" />
                {t('View GitHub Repository')}
                <FaExternalLinkAlt className="h-3 w-3 opacity-70" />
              </a>
              
              <a 
                href={submission.youtubeLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-800/50 text-red-700 dark:text-red-400 rounded-full text-sm transition-colors"
              >
                <FaYoutube className="h-4 w-4" />
                {t('Watch Demo Video')}
                <FaExternalLinkAlt className="h-3 w-3 opacity-70" />
              </a>
            </div>
            
            {isPending ? (
              <div className="flex gap-3">
                <Button onClick={() => onFeedback(submission)} className="gap-2">
                  <MdFeedback className="h-4 w-4" />
                  {t('Provide Feedback')}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md">
                  <div className="flex items-center gap-2 font-medium mb-1">
                    <RiFeedbackFill className="h-4 w-4 text-blue-500" />
                    {t('Your Feedback')}:
                  </div>
                  <p className="text-sm">{submission.feedback}</p>
                </div>
                
                <div className="flex gap-3">
                  <Button onClick={() => onFeedback(submission)} variant="outline" className="gap-2">
                    <MdFeedback className="h-4 w-4" />
                    {t('Edit Feedback')}
                  </Button>
                  
                  <Button onClick={() => onIssueCertificate(submission.id)} className="gap-2">
                    <FaCertificate className="h-4 w-4" />
                    {t('Issue Certificate')}
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          {/* YouTube Video Preview */}
          <div className="bg-gray-100 dark:bg-gray-800 relative overflow-hidden">
            {youtubeId ? (
              <div className="relative aspect-video w-full h-full">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${youtubeId}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0"
                ></iframe>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center p-4">
                  <RiVideoFill className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-500">{t('Video preview not available')}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

// Client component that handles all the rendering and state
function ClientFeedbackCertificates({ params }) {
  const router = useRouter();
  const { toast } = useToast();
  const { t } = useLanguage();
  
  // Properly unwrap params with React.use() to avoid the warning
  const unwrappedParams = use(params);
  const { id: companyId } = unwrappedParams || {};
  
  // State management
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [company, setCompany] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [currentSubmission, setCurrentSubmission] = useState(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackData, setFeedbackData] = useState({
    feedback: '',
    score: 0
  });
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Fetch data on mount
  useEffect(() => {
    setMounted(true);
    fetchData();
  }, [companyId]);
  
  // Fetch company info and submissions
  const fetchData = async () => {
    try {
      setIsLoading(true);
      
      // In a real app, we would fetch from an API
      // const response = await fetch(`/api/companies/${companyId}/submissions`);
      // const data = await response.json();
      
      // For now, use mock data
      const companyData = getMockCompanyById(companyId);
      if (!companyData) {
        throw new Error("Company not found");
      }
      setCompany(companyData);
      
      // Get submissions for this company
      // In a real app, the API would return only submissions for tasks created by this company
      const submissionsData = getMockSubmissionsForCompany(companyId);
      setSubmissions(submissionsData);
      
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to load submissions data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle opening the feedback modal
  const handleOpenFeedback = (submission) => {
    setCurrentSubmission(submission);
    setFeedbackData({
      feedback: submission.feedback || '',
      score: submission.score || 0
    });
    setShowFeedbackModal(true);
  };
  
  // Handle submitting feedback
  const handleSubmitFeedback = () => {
    // In a real app, this would make an API call to update the submission
    // For demo purposes, we'll update our local state
    const updatedSubmissions = submissions.map(sub => {
      if (sub.id === currentSubmission.id) {
        return {
          ...sub,
          status: 'reviewed',
          feedback: feedbackData.feedback,
          score: feedbackData.score
        };
      }
      return sub;
    });
    
    setSubmissions(updatedSubmissions);
    setShowFeedbackModal(false);
    
    // Show success notification
    toast({
      title: "Feedback Submitted",
      description: `You have successfully provided feedback for ${currentSubmission.student.name}'s submission.`,
      variant: "success"
    });
  };
  
  // Handle issuing a certificate
  const handleIssueCertificate = (submissionId) => {
    // In a real app, this would make an API call to issue a certificate
    // For demo purposes, we'll just show a success notification
    toast({
      title: "Certificate Issued",
      description: "The certificate has been successfully issued to the student.",
      variant: "success"
    });
  };
  
  // Filter submissions based on status
  const filteredSubmissions = submissions.filter(submission => {
    if (filterStatus === 'all') return true;
    return submission.status === filterStatus;
  });
  
  // Loading component
  const LoadingComponent = () => (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
  
  // Only animate after client-side hydration completes
  if (!mounted) {
    return <LoadingComponent />;
  }
  
  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                <TbCertificate className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h1 className="text-3xl font-bold">
                {t('Feedback & Certificates')}
              </h1>
            </div>
            <p className="text-muted-foreground">
              {t('Review student submissions, provide feedback, and issue certificates for completed tasks.')}            
            </p>
          </div>
        </div>
        
        {isLoading ? (
          <LoadingComponent />
        ) : (
          <>
            <Tabs defaultValue="all" className="w-full mb-6">
              <TabsList>
                <TabsTrigger 
                  value="all" 
                  onClick={() => setFilterStatus('all')}
                  className="gap-2"
                >
                  <MdAssignment className="h-4 w-4" />
                  {t('All Submissions')} ({submissions.length})
                </TabsTrigger>
                <TabsTrigger 
                  value="pending" 
                  onClick={() => setFilterStatus('pending')}
                  className="gap-2"
                >
                  <MdPending className="h-4 w-4" />
                  {t('Pending Review')} ({submissions.filter(s => s.status === 'pending').length})
                </TabsTrigger>
                <TabsTrigger 
                  value="reviewed" 
                  onClick={() => setFilterStatus('reviewed')}
                  className="gap-2"
                >
                  <MdAssignmentTurnedIn className="h-4 w-4" />
                  {t('Reviewed')} ({submissions.filter(s => s.status === 'reviewed').length})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-6">
                {filteredSubmissions.length === 0 ? (
                  <div className="text-center py-12 bg-muted/20 rounded-lg border border-muted">
                    <MdFeedback className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-medium mb-2">{t('No Submissions Found')}</h3>
                    <p className="text-muted-foreground">{t('There are no student submissions to review at this time.')}</p>
                  </div>
                ) : (
                  <div className="grid gap-6">
                    {filteredSubmissions.map(submission => (
                      <SubmissionCard 
                        key={submission.id} 
                        submission={submission} 
                        onFeedback={handleOpenFeedback}
                        onIssueCertificate={handleIssueCertificate}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="pending" className="mt-6">
                {filteredSubmissions.length === 0 ? (
                  <div className="text-center py-12 bg-muted/20 rounded-lg border border-muted">
                    <BsHourglassSplit className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-medium mb-2">{t('No Pending Submissions')}</h3>
                    <p className="text-muted-foreground">{t('There are no pending submissions to review at this time.')}</p>
                  </div>
                ) : (
                  <div className="grid gap-6">
                    {filteredSubmissions.map(submission => (
                      <SubmissionCard 
                        key={submission.id} 
                        submission={submission} 
                        onFeedback={handleOpenFeedback}
                        onIssueCertificate={handleIssueCertificate}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="reviewed" className="mt-6">
                {filteredSubmissions.length === 0 ? (
                  <div className="text-center py-12 bg-muted/20 rounded-lg border border-muted">
                    <BsCheckCircleFill className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-medium mb-2">{t('No Reviewed Submissions')}</h3>
                    <p className="text-muted-foreground">{t('There are no reviewed submissions at this time.')}</p>
                  </div>
                ) : (
                  <div className="grid gap-6">
                    {filteredSubmissions.map(submission => (
                      <SubmissionCard 
                        key={submission.id} 
                        submission={submission} 
                        onFeedback={handleOpenFeedback}
                        onIssueCertificate={handleIssueCertificate}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </>
        )}
        
        {/* Feedback Modal */}
        <Dialog open={showFeedbackModal} onOpenChange={setShowFeedbackModal}>
          <DialogContent className="sm:max-w-[550px] bg-white">
            {currentSubmission && (
              <>
                <DialogHeader>
                  <DialogTitle>{t('Provide Feedback')}</DialogTitle>
                  <DialogDescription>
                    {t('Review and provide feedback for')} {currentSubmission.student.name}'s {t('submission for')} "{currentSubmission.taskTitle}"
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="score" className="flex items-center gap-2">
                      <RiStarFill className="h-4 w-4 text-yellow-500" />
                      {t('Score')} (0-100)
                    </Label>
                    <div className="flex items-center gap-4">
                      <Slider 
                        id="score"
                        min={0} 
                        max={100} 
                        step={1}
                        value={[feedbackData.score]}
                        onValueChange={(value) => setFeedbackData({...feedbackData, score: value[0]})}
                        className="flex-1"
                      />
                      <span className="w-12 text-center font-medium">{feedbackData.score}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="feedback" className="flex items-center gap-2">
                      <RiFeedbackFill className="h-4 w-4" />
                      {t('Feedback')}
                    </Label>
                    <Textarea 
                      id="feedback"
                      value={feedbackData.feedback}
                      onChange={(e) => setFeedbackData({...feedbackData, feedback: e.target.value})}
                      placeholder={t('Provide detailed feedback for the student...')}
                      className="min-h-[150px]"
                    />
                  </div>
                </div>
                
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">{t('Cancel')}</Button>
                  </DialogClose>
                  <Button 
                    onClick={handleSubmitFeedback} 
                    disabled={!feedbackData.feedback || feedbackData.score === 0}
                  >
                    {t('Submit Feedback')}
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
}
