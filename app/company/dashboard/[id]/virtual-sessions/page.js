"use client";

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/lib/language/LanguageContext';
import { format } from 'date-fns';
import Link from 'next/link';

// UI Components
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/components/card';
import { Badge } from '@/components/ui/components/badge';
import { Button } from '@/components/ui/components/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/components/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/components/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/components/dialog';
import { Input } from '@/components/ui/components/input';
import { Label } from '@/components/ui/components/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/components/select';
import { Calendar } from '@/components/ui/components/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/components/popover';
import { Textarea } from '@/components/ui/components/textarea';

// Icons
import { FaVideo, FaCalendarAlt, FaClock, FaUserFriends, FaPlus, FaRegCalendarPlus, FaTag, FaUsers } from 'react-icons/fa';
import { MdVideoCall, MdCategory, MdOutlineGroups, MdPerson } from 'react-icons/md';
import { AiOutlineSchedule } from "react-icons/ai";
import { HiOutlineVideoCamera, HiOutlineExternalLink, HiOutlineUserGroup } from 'react-icons/hi';
import { BsPersonFill, BsPeople, BsCalendarDate, BsClockHistory, BsBriefcase } from 'react-icons/bs';
import { CalendarIcon } from 'lucide-react';

// Mock Data
import { virtualSessions, getMockCompanyById } from '@/lib/mock';

// Utilities
import { cn } from '@/lib/utils';

export default function VirtualSessions({ params }) {
  // Create a client component wrapper
  return <ClientVirtualSessions params={params} />;
}

// Client component that handles all the rendering and state
function ClientVirtualSessions({ params }) {
  // Properly unwrap params with React.use() to avoid the warning
  const unwrappedParams = use(params);
  const { id: companyId } = unwrappedParams || {};
  
  const router = useRouter();
  const { toast } = useToast();
  const { t } = useLanguage();
  
  const [mounted, setMounted] = useState(false);
  const [company, setCompany] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showNewSessionDialog, setShowNewSessionDialog] = useState(false);
  const [newSessionData, setNewSessionData] = useState({
    title: '',
    sessionType: 'one-on-one',
    category: 'mentoring',
    date: new Date(),
    startTime: '10:00',
    endTime: '11:00',
    maxParticipants: 1,
    description: ''
  });
  
  useEffect(() => {
    setMounted(true);
    
    // Fetch company info and sessions - in a real app this would be from an API
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // In a real app, we would fetch from an API
        // const response = await fetch(`/api/companies/${companyId}/sessions`);
        // const data = await response.json();
        
        // For now, use mock data
        const companyData = getMockCompanyById(companyId);
        if (!companyData) {
          throw new Error("Company not found");
        }
        setCompany(companyData);
        
        // Filter sessions that belong to this company
        // In a real app, the API would return only sessions for this company
        const companySessionsData = virtualSessions.filter(session => {
          // This is simplified logic - in a real app, we'd check session.company_id === companyId
          return session.mentor.company === companyData.company_name;
        });
        
        setSessions(companySessionsData);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: "Error",
          description: "Failed to load sessions data. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [companyId, toast]);
  
  const handleStartSession = (sessionId) => {
    // Navigate to the video call page
    router.push(`/video-session?id=${sessionId}`);
  };
  
  const handleCreateSession = () => {
    // In a real app, this would make an API call to create a new session
    const newSession = {
      id: sessions.length + 1,
      title: newSessionData.title,
      sessionType: newSessionData.sessionType,
      date: newSessionData.date,
      startTime: newSessionData.startTime,
      endTime: newSessionData.endTime,
      mentor: {
        id: 999,
        name: company?.company_name + " Representative",
        position: "Mentor",
        company: company?.company_name,
        avatar: company?.logo || "/avatars/default.png"
      },
      participants: newSessionData.sessionType === 'group' ? newSessionData.maxParticipants : 1,
      description: newSessionData.description,
      status: "scheduled",
      meetingUrl: `/video-session?id=${sessions.length + 1}`
    };
    
    // Add the new session to the list
    setSessions([...sessions, newSession]);
    
    // Close the dialog
    setShowNewSessionDialog(false);
    
    // Reset form data
    setNewSessionData({
      title: '',
      sessionType: 'one-on-one',
      category: 'mentoring',
      date: new Date(),
      startTime: '10:00',
      endTime: '11:00',
      maxParticipants: 1,
      description: ''
    });
    
    // Show success notification
    toast({
      title: "Success!",
      description: "New virtual session scheduled successfully.",
      variant: "success"
    });
  };
  
  // Filter for upcoming sessions
  const upcomingSessions = sessions.filter(session => session.status === 'scheduled');
  
  // Filter for past sessions
  const pastSessions = sessions.filter(session => session.status === 'completed');
  
  // Loading component
  const LoadingComponent = () => (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
  
  // Session card component
  const SessionCard = ({ session }) => {
    const isUpcoming = session.status === 'scheduled';
    const sessionDate = new Date(session.date);
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className={`hover:shadow-md transition-shadow ${!isUpcoming ? 'opacity-85' : ''}`}>
          <CardHeader className="pb-2">
            <div className="flex justify-between">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <FaVideo className={isUpcoming ? "text-primary" : "text-gray-400"} />
                {session.title}
              </CardTitle>
              <Badge 
                className={isUpcoming 
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" 
                  : undefined
                }
                variant={isUpcoming ? "default" : "outline"}
              >
                {isUpcoming ? t('Upcoming') : t('Completed')}
              </Badge>
            </div>
            <CardDescription>
              {session.sessionType === 'one-on-one' ? t('One-on-one mentoring session') : t('Group mentoring session')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <FaCalendarAlt />
                  <span>{format(sessionDate, 'MMM d, yyyy')}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <FaClock />
                  <span>{session.startTime} - {session.endTime}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                {session.sessionType === 'one-on-one' ? (
                  <MdPerson className="h-8 w-8 text-muted-foreground" />
                ) : (
                  <MdOutlineGroups className="h-8 w-8 text-muted-foreground" />
                )}
                <div>
                  <p className="font-medium">{session.sessionType === 'one-on-one' ? 'Individual Student Session' : 'Group Session'}</p>
                  <p className="text-sm text-muted-foreground">
                    {session.sessionType === 'one-on-one' 
                      ? t('One-on-one mentoring with a student') 
                      : t('Group session with up to ') + session.participants + t(' students')}
                  </p>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground">
                {session.description}
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {session.sessionType === 'one-on-one' ? (
                <>
                  <BsPersonFill />
                  <span>{t('1-on-1')}</span>
                </>
              ) : (
                <>
                  <BsPeople />
                  <span>{t('Group')} ({session.participants})</span>
                </>
              )}
            </div>
            <div className="flex gap-2">
              {isUpcoming ? (
                <>
                  <Button size="sm" variant="outline" className="gap-1">
                    <AiOutlineSchedule className="h-4 w-4" />
                    {t('Reschedule')}
                  </Button>
                  <Button 
                    size="sm" 
                    variant="default" 
                    className="gap-1"
                    onClick={() => handleStartSession(session.id)}
                  >
                    <MdVideoCall className="h-4 w-4" />
                    {t('Start Session')}
                  </Button>
                </>
              ) : (
                <>
                  {session.recording && (
                    <Button size="sm" variant="outline" className="gap-1" asChild>
                      <Link href={session.recording} target="_blank">
                        <HiOutlineExternalLink className="h-4 w-4" />
                        {t('View Recording')}
                      </Link>
                    </Button>
                  )}
                  <Button size="sm" variant="outline">
                    {t('Student Feedback')}
                  </Button>
                </>
              )}
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    );
  };
  
  // New Session Dialog with more company-specific options
  const NewSessionDialog = () => (
    <Dialog open={showNewSessionDialog} onOpenChange={setShowNewSessionDialog}>
      <DialogTrigger asChild>
        <Button variant="default" className="gap-2">
          <FaPlus className="h-4 w-4" />
          {t('Schedule Session')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle>{t('Schedule New Virtual Session')}</DialogTitle>
          <DialogDescription>
            {t('Schedule a virtual session to mentor students or host workshops about your company and industry.')}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title" className="flex items-center gap-2">
              <FaTag className="h-4 w-4" />
              {t('Session Title')}
            </Label>
            <Input 
              id="title" 
              value={newSessionData.title} 
              onChange={(e) => setNewSessionData({...newSessionData, title: e.target.value})} 
              placeholder={t('e.g. Industry Insights Workshop')} 
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="sessionType" className="flex items-center gap-2">
                <HiOutlineUserGroup className="h-4 w-4" />
                {t('Session Type')}
              </Label>
              <Select 
                value={newSessionData.sessionType}
                onValueChange={(value) => setNewSessionData({...newSessionData, sessionType: value})}
              >
                <SelectTrigger id="sessionType">
                  <SelectValue placeholder={t('Select session type')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="one-on-one">{t('One-on-One Mentoring')}</SelectItem>
                  <SelectItem value="group">{t('Group Workshop')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="category" className="flex items-center gap-2">
                <MdCategory className="h-4 w-4" />
                {t('Category')}
              </Label>
              <Select 
                value={newSessionData.category}
                onValueChange={(value) => setNewSessionData({...newSessionData, category: value})}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder={t('Select category')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mentoring">{t('Career Mentoring')}</SelectItem>
                  <SelectItem value="technical">{t('Technical Workshop')}</SelectItem>
                  <SelectItem value="industry">{t('Industry Insights')}</SelectItem>
                  <SelectItem value="interview">{t('Interview Preparation')}</SelectItem>
                  <SelectItem value="project">{t('Project Guidance')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="date" className="flex items-center gap-2">
              <BsCalendarDate className="h-4 w-4" />
              {t('Date')}
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !newSessionData.date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {newSessionData.date ? format(newSessionData.date, "PPP") : <span>{t('Pick a date')}</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={newSessionData.date}
                  onSelect={(date) => setNewSessionData({...newSessionData, date})}                  
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="startTime" className="flex items-center gap-2">
                <BsClockHistory className="h-4 w-4" />
                {t('Start Time')}
              </Label>
              <Input 
                id="startTime" 
                type="time" 
                value={newSessionData.startTime} 
                onChange={(e) => setNewSessionData({...newSessionData, startTime: e.target.value})} 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="endTime" className="flex items-center gap-2">
                <BsClockHistory className="h-4 w-4" />
                {t('End Time')}
              </Label>
              <Input 
                id="endTime" 
                type="time" 
                value={newSessionData.endTime} 
                onChange={(e) => setNewSessionData({...newSessionData, endTime: e.target.value})} 
              />
            </div>
          </div>
          
          {newSessionData.sessionType === 'group' && (
            <div className="grid gap-2">
              <Label htmlFor="maxParticipants" className="flex items-center gap-2">
                <FaUsers className="h-4 w-4" />
                {t('Maximum Participants')}
              </Label>
              <Input 
                id="maxParticipants" 
                type="number" 
                min="2"
                max="50"
                value={newSessionData.maxParticipants} 
                onChange={(e) => setNewSessionData({...newSessionData, maxParticipants: parseInt(e.target.value) || 2})} 
              />
            </div>
          )}
          
          <div className="grid gap-2">
            <Label htmlFor="description" className="flex items-center gap-2">
              <BsBriefcase className="h-4 w-4" />
              {t('Session Description')}
            </Label>
            <Textarea 
              id="description" 
              value={newSessionData.description} 
              onChange={(e) => setNewSessionData({...newSessionData, description: e.target.value})} 
              placeholder={t('Provide a description of what students can expect from this session')} 
              className="min-h-[100px]"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">{t('Cancel')}</Button>
          </DialogClose>
          <Button onClick={handleCreateSession} disabled={!newSessionData.title || !newSessionData.description}>
            {t('Schedule Session')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
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
            <h1 className="text-3xl font-bold mb-1">
              {t('Virtual Sessions')}
            </h1>
            <p className="text-muted-foreground">
              {t('Schedule and manage virtual mentoring sessions and workshops with students.')}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <FaCalendarAlt className="h-4 w-4" />
              {t('View Calendar')}
            </Button>
            <NewSessionDialog />
          </div>
        </div>
        
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList>
            <TabsTrigger value="upcoming" className="gap-2">
              <FaRegCalendarPlus className="h-4 w-4" />
              {t('Upcoming Sessions')} ({upcomingSessions.length})
            </TabsTrigger>
            <TabsTrigger value="past" className="gap-2">
              <FaCalendarAlt className="h-4 w-4" />
              {t('Past Sessions')} ({pastSessions.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="mt-6">
            {isLoading ? (
              <LoadingComponent />
            ) : upcomingSessions.length === 0 ? (
              <div className="text-center py-12 bg-muted/20 rounded-lg border border-muted">
                <HiOutlineVideoCamera className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">{t('No Upcoming Sessions')}</h3>
                <p className="text-muted-foreground mb-6">{t('You haven\'t scheduled any upcoming virtual sessions yet.')}</p>
                <Button onClick={() => setShowNewSessionDialog(true)} className="gap-2">
                  <FaPlus className="h-4 w-4" />
                  {t('Schedule Your First Session')}
                </Button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {upcomingSessions.map(session => (
                  <SessionCard key={session.id} session={session} />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past" className="mt-6">
            {isLoading ? (
              <LoadingComponent />
            ) : pastSessions.length === 0 ? (
              <div className="text-center py-12 bg-muted/20 rounded-lg border border-muted">
                <HiOutlineVideoCamera className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">{t('No Past Sessions')}</h3>
                <p className="text-muted-foreground">{t('You haven\'t conducted any virtual sessions yet.')}</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {pastSessions.map(session => (
                  <SessionCard key={session.id} session={session} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
