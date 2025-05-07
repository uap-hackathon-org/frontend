"use client";

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/components/select';
import { Calendar } from '@/components/ui/components/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/components/popover';
import { Switch } from '@/components/ui/components/switch';

// Icons
import { FaCalendarAlt, FaClock, FaUserFriends, FaPlus, FaRegCalendarPlus, FaTag, FaMapMarkerAlt, FaLink, FaList } from 'react-icons/fa';
import { HiOutlineCalendar, HiLocationMarker, HiGlobeAlt, HiOutlineClock, HiOutlineUserGroup, HiPlus } from 'react-icons/hi';
import { TbCalendarEvent, TbCalendarTime, TbAward } from 'react-icons/tb';
import { MdEvent, MdCategory, MdLocationOn, MdPeople } from 'react-icons/md';
import { BsCalendarDate, BsCalendarCheck, BsCalendarEvent, BsCalendarX, BsFillFileEarmarkTextFill } from 'react-icons/bs';
import { CalendarIcon } from 'lucide-react';

// Mock Data
import { getMockCompanyById } from '@/lib/mock';

export default function CompanyWorkshops({ params }) {
  // Create a client component wrapper
  return <ClientCompanyWorkshops params={params} />;
}

// Client component that handles all the rendering and state
function ClientCompanyWorkshops({ params }) {
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
  const [workshops, setWorkshops] = useState([]);
  const [showNewWorkshopDialog, setShowNewWorkshopDialog] = useState(false);
  const [filterType, setFilterType] = useState('all');
  
  // New workshop form state
  const [newWorkshop, setNewWorkshop] = useState({
    title: '',
    description: '',
    eventType: 'workshop', // or 'hackathon'
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    registrationDeadline: new Date(),
    location: 'Online',
    meetingLink: '',
    maxParticipants: 30,
    maxTeamSize: 1,
    isActive: true,
    prizes: {},
    requiredSkills: [],
    materials: []
  });
  
  // Prize fields
  const [prizeFields, setPrizeFields] = useState([
    { place: 'first', prize: '' },
    { place: 'second', prize: '' },
    { place: 'third', prize: '' }
  ]);
  
  // Required skills and materials fields
  const [skillField, setSkillField] = useState('');
  const [materialField, setMaterialField] = useState({ title: '', link: '' });
  
  // Fetch data on mount
  useEffect(() => {
    setMounted(true);
    fetchData();
  }, [companyId]);
  
  // Fetch company info and workshops
  const fetchData = async () => {
    try {
      setIsLoading(true);
      
      // In a real app, we would fetch from an API
      // const response = await fetch(`/api/companies/${companyId}/workshops`);
      // const data = await response.json();
      
      // For now, use mock data
      const companyData = getMockCompanyById(companyId);
      if (!companyData) {
        throw new Error("Company not found");
      }
      setCompany(companyData);
      
      // Mock workshops data for the company
      const mockWorkshops = [
        {
          id: 1,
          title: "Web Development Bootcamp",
          description: "Learn modern web development techniques and best practices with our intensive bootcamp.",
          eventType: "workshop",
          startDate: new Date(2025, 5, 15, 10, 0), // June 15, 2025, 10:00 AM
          endDate: new Date(2025, 5, 15, 16, 0), // June 15, 2025, 4:00 PM
          registrationDeadline: new Date(2025, 5, 10), // June 10, 2025
          location: "Online",
          meetingLink: "https://meet.google.com/abc-defg-hij",
          maxParticipants: 50,
          isActive: true,
          organizedBy: companyData.company_name,
          organizedById: companyId,
          requiredSkills: ["HTML", "CSS", "JavaScript"],
          materials: [
            { title: "Workshop Slides", link: "https://slides.example.com/webdev" },
            { title: "Setup Guide", link: "https://docs.example.com/setup" }
          ],
          participantCount: 24
        },
        {
          id: 2,
          title: "Mobile App Innovation Hackathon",
          description: "Create innovative mobile applications that solve real-world problems in this 48-hour hackathon.",
          eventType: "hackathon",
          startDate: new Date(2025, 6, 20, 9, 0), // July 20, 2025, 9:00 AM
          endDate: new Date(2025, 6, 22, 9, 0), // July 22, 2025, 9:00 AM
          registrationDeadline: new Date(2025, 6, 15), // July 15, 2025
          location: "Hybrid - Online and Physical",
          meetingLink: "https://meet.google.com/klm-nopq-rst",
          maxParticipants: 100,
          maxTeamSize: 4,
          isActive: true,
          organizedBy: companyData.company_name,
          organizedById: companyId,
          prizes: {
            first: "$1,000 and internship opportunities",
            second: "$500 and mentorship program",
            third: "$250 and company swag"
          },
          requiredSkills: ["React Native", "Flutter", "UI/UX Design"],
          materials: [
            { title: "Hackathon Rules", link: "https://docs.example.com/hackathon-rules" },
            { title: "Resources", link: "https://docs.example.com/resources" }
          ],
          participantCount: 72
        },
        {
          id: 3,
          title: "Data Science Workshop",
          description: "Introduction to data science concepts, tools, and methodologies.",
          eventType: "workshop",
          startDate: new Date(2025, 4, 5, 13, 0), // May 5, 2025, 1:00 PM
          endDate: new Date(2025, 4, 5, 17, 0), // May 5, 2025, 5:00 PM
          registrationDeadline: new Date(2025, 3, 30), // April 30, 2025
          location: "Online",
          meetingLink: "https://meet.google.com/uvw-xyz-123",
          maxParticipants: 40,
          isActive: true,
          organizedBy: companyData.company_name,
          organizedById: companyId,
          requiredSkills: ["Python", "Statistics", "Data Analysis"],
          materials: [
            { title: "Workshop Materials", link: "https://docs.example.com/data-science" }
          ],
          participantCount: 32
        },
        {
          id: 4,
          title: "Cloud Computing Fundamentals",
          description: "Learn the basics of cloud computing and how to deploy applications on cloud platforms.",
          eventType: "workshop",
          startDate: new Date(2025, 7, 10, 14, 0), // August 10, 2025, 2:00 PM
          endDate: new Date(2025, 7, 10, 18, 0), // August 10, 2025, 6:00 PM
          registrationDeadline: new Date(2025, 7, 5), // August 5, 2025
          location: "Online",
          meetingLink: "https://meet.google.com/456-789-abc",
          maxParticipants: 35,
          isActive: true,
          organizedBy: companyData.company_name,
          organizedById: companyId,
          requiredSkills: ["AWS", "Azure", "Docker"],
          materials: [
            { title: "Cloud Computing Guide", link: "https://docs.example.com/cloud" }
          ],
          participantCount: 15
        }
      ];
      
      setWorkshops(mockWorkshops);
      setIsLoading(false);
      
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to load workshops data. Please try again.",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };
  
  // Handle creating a new workshop
  const handleCreateWorkshop = () => {
    // In a real app, this would make an API call to create a new workshop
    // Create prizes object from prize fields
    const prizes = {};
    prizeFields.forEach(field => {
      if (field.place && field.prize) {
        prizes[field.place] = field.prize;
      }
    });
    
    // Create new workshop object
    const workshopToCreate = {
      ...newWorkshop,
      id: workshops.length + 1,
      organizedBy: company.company_name,
      organizedById: companyId,
      prizes: Object.keys(prizes).length > 0 ? prizes : null,
      participantCount: 0
    };
    
    // Add new workshop to the list
    setWorkshops([workshopToCreate, ...workshops]);
    
    // Close the dialog and reset form
    setShowNewWorkshopDialog(false);
    resetForm();
    
    // Show success notification
    toast({
      title: "Success!",
      description: newWorkshop.eventType === 'workshop' 
        ? "Workshop created successfully." 
        : "Hackathon created successfully.",
      variant: "success"
    });
  };
  
  // Reset form fields
  const resetForm = () => {
    setNewWorkshop({
      title: '',
      description: '',
      eventType: 'workshop',
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
      registrationDeadline: new Date(),
      location: 'Online',
      meetingLink: '',
      maxParticipants: 30,
      maxTeamSize: 1,
      isActive: true,
      prizes: {},
      requiredSkills: [],
      materials: []
    });
    
    setPrizeFields([
      { place: 'first', prize: '' },
      { place: 'second', prize: '' },
      { place: 'third', prize: '' }
    ]);
    
    setSkillField('');
    setMaterialField({ title: '', link: '' });
  };
  
  // Add skill to the required skills list
  const addSkill = () => {
    if (!skillField.trim()) return;
    
    if (!newWorkshop.requiredSkills.includes(skillField)) {
      setNewWorkshop({
        ...newWorkshop,
        requiredSkills: [...newWorkshop.requiredSkills, skillField]
      });
    }
    
    setSkillField('');
  };
  
  // Remove skill from the required skills list
  const removeSkill = (skill) => {
    setNewWorkshop({
      ...newWorkshop,
      requiredSkills: newWorkshop.requiredSkills.filter(s => s !== skill)
    });
  };
  
  // Add material to the materials list
  const addMaterial = () => {
    if (!materialField.title.trim() || !materialField.link.trim()) return;
    
    setNewWorkshop({
      ...newWorkshop,
      materials: [...newWorkshop.materials, { ...materialField }]
    });
    
    setMaterialField({ title: '', link: '' });
  };
  
  // Remove material from the materials list
  const removeMaterial = (index) => {
    setNewWorkshop({
      ...newWorkshop,
      materials: newWorkshop.materials.filter((_, i) => i !== index)
    });
  };
  
  // Update prize field
  const updatePrizeField = (index, field, value) => {
    const updatedFields = [...prizeFields];
    updatedFields[index] = { ...updatedFields[index], [field]: value };
    setPrizeFields(updatedFields);
  };
  
  // Filter workshops based on type
  const filteredWorkshops = workshops.filter(workshop => {
    if (filterType === 'all') return true;
    return workshop.eventType === filterType;
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
              <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-full">
                <TbCalendarEvent className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h1 className="text-3xl font-bold">
                {t('Workshops & Hackathons')}
              </h1>
            </div>
            <p className="text-muted-foreground">
              {t('Create and manage workshops and hackathons for students.')}
            </p>
          </div>
          <Button onClick={() => setShowNewWorkshopDialog(true)} className="gap-2">
            <FaPlus className="h-4 w-4" />
            {t('Create New Event')}
          </Button>
        </div>
        
        {isLoading ? (
          <LoadingComponent />
        ) : (
          <>
            <Tabs defaultValue="all" className="w-full mb-6">
              <TabsList>
                <TabsTrigger 
                  value="all" 
                  onClick={() => setFilterType('all')}
                  className="gap-2"
                >
                  <MdEvent className="h-4 w-4" />
                  {t('All Events')} ({workshops.length})
                </TabsTrigger>
                <TabsTrigger 
                  value="workshop" 
                  onClick={() => setFilterType('workshop')}
                  className="gap-2"
                >
                  <FaRegCalendarPlus className="h-4 w-4" />
                  {t('Workshops')} ({workshops.filter(w => w.eventType === 'workshop').length})
                </TabsTrigger>
                <TabsTrigger 
                  value="hackathon" 
                  onClick={() => setFilterType('hackathon')}
                  className="gap-2"
                >
                  <TbAward className="h-4 w-4" />
                  {t('Hackathons')} ({workshops.filter(w => w.eventType === 'hackathon').length})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-6">
                {filteredWorkshops.length === 0 ? (
                  <EmptyState />
                ) : (
                  <div className="grid md:grid-cols-2 gap-6">
                    {filteredWorkshops.map(workshop => (
                      <WorkshopCard key={workshop.id} workshop={workshop} />
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="workshop" className="mt-6">
                {filteredWorkshops.length === 0 ? (
                  <EmptyState type="workshop" />
                ) : (
                  <div className="grid md:grid-cols-2 gap-6">
                    {filteredWorkshops.map(workshop => (
                      <WorkshopCard key={workshop.id} workshop={workshop} />
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="hackathon" className="mt-6">
                {filteredWorkshops.length === 0 ? (
                  <EmptyState type="hackathon" />
                ) : (
                  <div className="grid md:grid-cols-2 gap-6">
                    {filteredWorkshops.map(workshop => (
                      <WorkshopCard key={workshop.id} workshop={workshop} />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </>
        )}
        
        {/* Workshop Creation Modal */}
        <Dialog open={showNewWorkshopDialog} onOpenChange={setShowNewWorkshopDialog}>
          <DialogContent className="sm:max-w-[600px] bg-white max-h-[90vh] overflow-hidden flex flex-col">
            <DialogHeader>
              <DialogTitle>{t('Create New')} {newWorkshop.eventType === 'workshop' ? t('Workshop') : t('Hackathon')}</DialogTitle>
              <DialogDescription>
                {t('Fill out the details to create a new')} {newWorkshop.eventType === 'workshop' ? t('workshop') : t('hackathon')} {t('for students.')}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4 overflow-y-auto pr-2" style={{ maxHeight: 'calc(90vh - 180px)' }}>
              <div className="flex flex-col gap-2">
                <Label className="flex items-center gap-2">
                  <MdCategory className="h-4 w-4" />
                  {t('Event Type')}
                </Label>
                <Select
                  value={newWorkshop.eventType}
                  onValueChange={(value) => setNewWorkshop({...newWorkshop, eventType: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t('Select event type')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="workshop">{t('Workshop')}</SelectItem>
                    <SelectItem value="hackathon">{t('Hackathon')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex flex-col gap-2">
                <Label htmlFor="title" className="flex items-center gap-2">
                  <FaTag className="h-4 w-4" />
                  {t('Title')}
                </Label>
                <Input
                  id="title"
                  value={newWorkshop.title}
                  onChange={(e) => setNewWorkshop({...newWorkshop, title: e.target.value})}
                  placeholder={t('e.g. Web Development Bootcamp')}
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <Label htmlFor="description" className="flex items-center gap-2">
                  <BsFillFileEarmarkTextFill className="h-4 w-4" />
                  {t('Description')}
                </Label>
                <Textarea
                  id="description"
                  value={newWorkshop.description}
                  onChange={(e) => setNewWorkshop({...newWorkshop, description: e.target.value})}
                  placeholder={t('Describe the event and what participants can expect')}
                  className="min-h-[100px]"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label className="flex items-center gap-2">
                    <BsCalendarDate className="h-4 w-4" />
                    {t('Start Date & Time')}
                  </Label>
                  <div className="flex flex-col space-y-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="justify-start text-left font-normal w-full"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {format(newWorkshop.startDate, 'PPP')}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={newWorkshop.startDate}
                          onSelect={(date) => date && setNewWorkshop({...newWorkshop, startDate: date})}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <Input
                      type="time"
                      value={format(newWorkshop.startDate, 'HH:mm')}
                      onChange={(e) => {
                        const [hours, minutes] = e.target.value.split(':').map(Number);
                        const newDate = new Date(newWorkshop.startDate);
                        newDate.setHours(hours);
                        newDate.setMinutes(minutes);
                        setNewWorkshop({...newWorkshop, startDate: newDate});
                      }}
                    />
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Label className="flex items-center gap-2">
                    <BsCalendarCheck className="h-4 w-4" />
                    {t('End Date & Time')}
                  </Label>
                  <div className="flex flex-col space-y-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="justify-start text-left font-normal w-full"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {format(newWorkshop.endDate, 'PPP')}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={newWorkshop.endDate}
                          onSelect={(date) => date && setNewWorkshop({...newWorkshop, endDate: date})}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <Input
                      type="time"
                      value={format(newWorkshop.endDate, 'HH:mm')}
                      onChange={(e) => {
                        const [hours, minutes] = e.target.value.split(':').map(Number);
                        const newDate = new Date(newWorkshop.endDate);
                        newDate.setHours(hours);
                        newDate.setMinutes(minutes);
                        setNewWorkshop({...newWorkshop, endDate: newDate});
                      }}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <Label className="flex items-center gap-2">
                  <BsCalendarX className="h-4 w-4" />
                  {t('Registration Deadline')}
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="justify-start text-left font-normal w-full"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(newWorkshop.registrationDeadline, 'PPP')}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={newWorkshop.registrationDeadline}
                      onSelect={(date) => date && setNewWorkshop({...newWorkshop, registrationDeadline: date})}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="location" className="flex items-center gap-2">
                    <MdLocationOn className="h-4 w-4" />
                    {t('Location')}
                  </Label>
                  <Select
                    value={newWorkshop.location}
                    onValueChange={(value) => setNewWorkshop({...newWorkshop, location: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('Select location type')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Online">{t('Online')}</SelectItem>
                      <SelectItem value="In-Person">{t('In-Person')}</SelectItem>
                      <SelectItem value="Hybrid - Online and Physical">{t('Hybrid')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Label htmlFor="meetingLink" className="flex items-center gap-2">
                    <FaLink className="h-4 w-4" />
                    {t('Meeting Link')} {newWorkshop.location !== 'In-Person' && <span className="text-red-500">*</span>}
                  </Label>
                  <Input
                    id="meetingLink"
                    value={newWorkshop.meetingLink}
                    onChange={(e) => setNewWorkshop({...newWorkshop, meetingLink: e.target.value})}
                    placeholder="https://meet.google.com/..."
                    disabled={newWorkshop.location === 'In-Person'}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="maxParticipants" className="flex items-center gap-2">
                    <MdPeople className="h-4 w-4" />
                    {t('Max Participants')}
                  </Label>
                  <Input
                    id="maxParticipants"
                    type="number"
                    min="1"
                    value={newWorkshop.maxParticipants}
                    onChange={(e) => setNewWorkshop({...newWorkshop, maxParticipants: parseInt(e.target.value)})}
                  />
                </div>
                
                {newWorkshop.eventType === 'hackathon' && (
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="maxTeamSize" className="flex items-center gap-2">
                      <HiOutlineUserGroup className="h-4 w-4" />
                      {t('Max Team Size')}
                    </Label>
                    <Input
                      id="maxTeamSize"
                      type="number"
                      min="1"
                      value={newWorkshop.maxTeamSize}
                      onChange={(e) => setNewWorkshop({...newWorkshop, maxTeamSize: parseInt(e.target.value)})}
                    />
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={newWorkshop.isActive}
                  onCheckedChange={(checked) => setNewWorkshop({...newWorkshop, isActive: checked})}
                />
                <Label htmlFor="isActive">{t('Publish this event immediately')}</Label>
              </div>
              
              {/* Required Skills Section */}
              <div className="flex flex-col gap-2">
                <Label className="flex items-center gap-2">
                  <FaList className="h-4 w-4" />
                  {t('Required Skills')}
                </Label>
                <div className="flex gap-2">
                  <Input
                    value={skillField}
                    onChange={(e) => setSkillField(e.target.value)}
                    placeholder={t('e.g. React, Python, UI Design')}
                    className="flex-1"
                  />
                  <Button type="button" variant="outline" onClick={addSkill}>
                    <HiPlus className="h-4 w-4" />
                  </Button>
                </div>
                {newWorkshop.requiredSkills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {newWorkshop.requiredSkills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                        {skill}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 p-0 hover:bg-transparent"
                          onClick={() => removeSkill(skill)}
                        >
                          <HiX className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Materials Section */}
              <div className="flex flex-col gap-2">
                <Label className="flex items-center gap-2">
                  <FaList className="h-4 w-4" />
                  {t('Materials & Resources')}
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr_auto] gap-2">
                  <Input
                    value={materialField.title}
                    onChange={(e) => setMaterialField({...materialField, title: e.target.value})}
                    placeholder={t('Title e.g. Setup Guide')}
                  />
                  <Input
                    value={materialField.link}
                    onChange={(e) => setMaterialField({...materialField, link: e.target.value})}
                    placeholder={t('Link e.g. https://...')}
                  />
                  <Button type="button" variant="outline" onClick={addMaterial}>
                    <HiPlus className="h-4 w-4" />
                  </Button>
                </div>
                {newWorkshop.materials.length > 0 && (
                  <div className="flex flex-col gap-2 mt-2">
                    {newWorkshop.materials.map((material, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{material.title}</span>
                          <span className="text-sm text-muted-foreground truncate max-w-[200px]">{material.link}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => removeMaterial(index)}
                        >
                          <HiX className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Prizes Section - Only for Hackathons */}
              {newWorkshop.eventType === 'hackathon' && (
                <div className="flex flex-col gap-2 border-t pt-4 mt-2">
                  <Label className="flex items-center gap-2">
                    <TbAward className="h-4 w-4" />
                    {t('Prizes')}
                  </Label>
                  <div className="space-y-3">
                    {prizeFields.map((field, index) => (
                      <div key={index} className="grid grid-cols-[120px_1fr] gap-2">
                        <Select
                          value={field.place}
                          onValueChange={(value) => updatePrizeField(index, 'place', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="first">{t('1st Place')}</SelectItem>
                            <SelectItem value="second">{t('2nd Place')}</SelectItem>
                            <SelectItem value="third">{t('3rd Place')}</SelectItem>
                            <SelectItem value="honorable">{t('Honorable')}</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          value={field.prize}
                          onChange={(e) => updatePrizeField(index, 'prize', e.target.value)}
                          placeholder={t('e.g. $500 and internship opportunity')}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">{t('Cancel')}</Button>
              </DialogClose>
              <Button 
                onClick={handleCreateWorkshop} 
                disabled={
                  !newWorkshop.title || 
                  !newWorkshop.description || 
                  (newWorkshop.location !== 'In-Person' && !newWorkshop.meetingLink)
                }
              >
                {t('Create')} {newWorkshop.eventType === 'workshop' ? t('Workshop') : t('Hackathon')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
}

// Empty state component
const EmptyState = ({ type = 'all' }) => {
  const { t } = useLanguage();
  let title, description, icon;
  
  switch (type) {
    case 'workshop':
      title = t('No Workshops');
      description = t('You haven\'t created any workshops yet.');
      icon = <FaRegCalendarPlus className="h-12 w-12 mx-auto text-muted-foreground mb-4" />;
      break;
    case 'hackathon':
      title = t('No Hackathons');
      description = t('You haven\'t created any hackathons yet.');
      icon = <TbAward className="h-12 w-12 mx-auto text-muted-foreground mb-4" />;
      break;
    default:
      title = t('No Events');
      description = t('You haven\'t created any workshops or hackathons yet.');
      icon = <MdEvent className="h-12 w-12 mx-auto text-muted-foreground mb-4" />;
  }
  
  return (
    <div className="text-center py-12 bg-muted/20 rounded-lg border border-muted">
      {icon}
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6">{description}</p>
      <Button onClick={() => document.querySelector('[aria-label="Create New Event"]')?.click()} className="gap-2">
        <FaPlus className="h-4 w-4" />
        {t('Create Your First Event')}
      </Button>
    </div>
  );
};

// Workshop card component
const WorkshopCard = ({ workshop }) => {
  const { t } = useLanguage();
  const isHackathon = workshop.eventType === 'hackathon';
  const isUpcoming = new Date(workshop.startDate) > new Date();
  const registrationOpen = new Date(workshop.registrationDeadline) > new Date();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <Badge 
                variant={isHackathon ? "destructive" : "default"}
                className={isHackathon 
                  ? "bg-rose-100 text-rose-700 hover:bg-rose-100 dark:bg-rose-900/30 dark:text-rose-400" 
                  : "bg-indigo-100 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-400"}
              >
                {isHackathon ? t('Hackathon') : t('Workshop')}
              </Badge>
              <CardTitle className="text-xl mt-2 flex items-center gap-2">
                {isHackathon ? <TbAward className="h-5 w-5 text-rose-500" /> : <FaRegCalendarPlus className="h-5 w-5 text-indigo-500" />}
                {workshop.title}
              </CardTitle>
              <CardDescription className="mt-1">
                {workshop.description.length > 120 ? workshop.description.substring(0, 120) + '...' : workshop.description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pb-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <div className="flex items-center gap-2">
              <BsCalendarDate className="h-4 w-4 text-gray-500" />
              <span>{format(new Date(workshop.startDate), 'MMM d, yyyy')}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <HiOutlineClock className="h-4 w-4 text-gray-500" />
              <span>{format(new Date(workshop.startDate), 'h:mm a')} - {format(new Date(workshop.endDate), 'h:mm a')}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <HiLocationMarker className="h-4 w-4 text-gray-500" />
              <span>{workshop.location}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <MdPeople className="h-4 w-4 text-gray-500" />
              <span>{workshop.participantCount}/{workshop.maxParticipants} {t('Participants')}</span>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="text-sm font-medium mb-2">{t('Required Skills')}:</div>
            <div className="flex flex-wrap gap-1">
              {workshop.requiredSkills.map((skill, i) => (
                <Badge key={i} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          
          {isHackathon && workshop.prizes && (
            <div className="mt-4">
              <div className="text-sm font-medium mb-2">{t('Prizes')}:</div>
              <div className="space-y-1 text-sm">
                {Object.entries(workshop.prizes).map(([place, prize], i) => (
                  <div key={i} className="flex items-center gap-2">
                    <TbAward className={`h-4 w-4 ${i === 0 ? 'text-yellow-500' : i === 1 ? 'text-gray-400' : 'text-amber-700'}`} />
                    <span className="capitalize">{place}:</span> {prize}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="pt-2">
          <div className="flex justify-between items-center w-full">
            <Badge 
              variant={registrationOpen ? "outline" : "secondary"}
              className={registrationOpen 
                ? "bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400" 
                : ""}
            >
              {registrationOpen ? t('Registration Open') : t('Registration Closed')}
            </Badge>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <HiOutlineUserGroup className="h-4 w-4" />
                {t('Manage')}
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <HiOutlineCalendar className="h-4 w-4" />
                {t('Edit')}
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
