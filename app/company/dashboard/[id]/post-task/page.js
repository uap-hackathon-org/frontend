"use client";

import React, { useState, useEffect, use } from 'react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { HiClipboardList } from 'react-icons/hi';
import { useLanguage } from '@/lib/language/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/components/card';
import { Input } from '@/components/ui/components/input';
import { Label } from '@/components/ui/components/label';
import { Textarea } from '@/components/ui/components/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/components/select';
import { Calendar } from '@/components/ui/components/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/components/popover';
import { Switch } from '@/components/ui/components/switch';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Toaster } from '@/components/ui/components/toaster';
import { cn } from '@/lib/utils';
import { getMockSkills } from '@/lib/mock';
import { AiOutlineClockCircle, AiOutlineAppstore, AiOutlineStar, AiOutlineNumber, AiOutlineTag } from 'react-icons/ai';
import { BsPencil, BsTextParagraph } from 'react-icons/bs';
import { IoMdSwitch } from 'react-icons/io';
import { FaSkiing } from 'react-icons/fa';
import { Button } from '@/components/ui/components/button';
import api from '@/axiosInstance';

export default function PostTask({ params }) {
  // Create a client component wrapper
  return <ClientPostTask params={params} />;
}

// Client component that handles all the rendering and state
function ClientPostTask({ params }) {
  // Properly unwrap params with React.use() to avoid the warning
  const unwrappedParams = use(params);
  const { id } = unwrappedParams || {};
  
  const { toast } = useToast();
  const { t } = useLanguage();
  
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    difficulty: "beginner",
    points: 10,
    deadline: new Date(),
    is_active: true,
    max_submissions: 0,
    category: "",
    required_skill_ids: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    setMounted(true);
    
    // Fetch skills from the API
    const fetchSkills = async () => {
      try {
        const response = await api.get('/api/v1/skills/');
        
        if (response?.data && Array.isArray(response.data)) {
          setSkills(response.data);
          console.log('Fetched skills from API:', response.data);
        } else {
          console.warn('Invalid skills data format from API, falling back to mock data');
          // Fallback to mock data if API returns invalid data
          setSkills(getMockSkills());
        }
      } catch (err) {
        console.error('Error fetching skills:', err);
        // Fallback to mock data if API call fails
        setSkills(getMockSkills());
      }
    };
    
    fetchSkills();
  }, []);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNumberInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: parseInt(value) || 0 });
  };

  const handleSwitchChange = (checked) => {
    setFormData({ ...formData, is_active: checked });
  };

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, deadline: date });
  };

  const handleSkillSelection = (skillId) => {
    const currentSkills = [...formData.required_skill_ids];
    if (currentSkills.includes(skillId)) {
      setFormData({ 
        ...formData, 
        required_skill_ids: currentSkills.filter(id => id !== skillId) 
      });
    } else {
      setFormData({ ...formData, required_skill_ids: [...currentSkills, skillId] });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Prepare the request body
      const requestBody = {
        ...formData,
        deadline: formData.deadline.toISOString(),
        required_skill_ids: formData.required_skill_ids.map(id => Number(id))
      };
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/microstasks/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420'
        },
        body: JSON.stringify(requestBody),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to post task');
      }
      
      const data = await response.json();
      toast({
        title: "Success!",
        description: "Task posted successfully!",
        variant: "success"
      });
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        difficulty: "beginner",
        points: 10,
        deadline: new Date(),
        is_active: true,
        max_submissions: 0,
        category: "",
        required_skill_ids: []
      });
    } catch (error) {
      toast({
        title: "Error!",
        description: error.message || "Failed to post task", 
        variant: "destructive"
      });
      console.error("Error posting task:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Create a consistent loading component that matches on both server and client
  const loadingComponent = (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
        <p className="text-lg text-muted-foreground">{t('Loading')}...</p>
      </div>
    </div>
  );
  
  // Only animate after client-side hydration completes
  if (!mounted) {
    return loadingComponent;
  }
  
  // Group skills by category for better organization
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});
  
  return (
    <div className="space-y-6 p-6">
      <Toaster />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-primary/10 p-2 rounded-full">
            <HiClipboardList className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">{t('Post a Micro-Task')}</h1>
        </div>
        <p className="text-muted-foreground">
          {t('Create new micro-tasks for students to complete and showcase their skills.')}
        </p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BsPencil className="h-5 w-5" />
              {t('Task Creation Form')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title" className="flex items-center gap-2">
                    <AiOutlineAppstore className="h-4 w-4" />
                    {t('Task Title')}
                  </Label>
                  <Input 
                    id="title" 
                    name="title" 
                    value={formData.title} 
                    onChange={handleInputChange} 
                    placeholder={t('Enter task title')} 
                    className="mt-1" 
                    required 
                  />
                </div>
                
                <div>
                  <Label htmlFor="description" className="flex items-center gap-2">
                    <BsTextParagraph className="h-4 w-4" />
                    {t('Task Description')}
                  </Label>
                  <Textarea 
                    id="description" 
                    name="description" 
                    value={formData.description} 
                    onChange={handleInputChange} 
                    placeholder={t('Describe the task in detail')} 
                    className="mt-1 min-h-[120px]" 
                    required 
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="difficulty" className="flex items-center gap-2">
                      <AiOutlineStar className="h-4 w-4" />
                      {t('Difficulty Level')}
                    </Label>
                    <Select 
                      value={formData.difficulty} 
                      onValueChange={(value) => handleSelectChange("difficulty", value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder={t('Select difficulty')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">{t('Beginner')}</SelectItem>
                        <SelectItem value="intermediate">{t('Intermediate')}</SelectItem>
                        <SelectItem value="advanced">{t('Advanced')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="points" className="flex items-center gap-2">
                      <AiOutlineNumber className="h-4 w-4" />
                      {t('Points')}
                    </Label>
                    <Input 
                      id="points" 
                      name="points" 
                      type="number" 
                      value={formData.points} 
                      onChange={handleNumberInputChange} 
                      min="0" 
                      className="mt-1" 
                      required 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="deadline" className="flex items-center gap-2">
                      <AiOutlineClockCircle className="h-4 w-4" />
                      {t('Deadline')}
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left mt-1",
                            !formData.deadline && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.deadline ? format(formData.deadline, "PPP") : <span>{t('Pick a date')}</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.deadline}
                          onSelect={handleDateChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div>
                    <Label htmlFor="category" className="flex items-center gap-2">
                      <AiOutlineTag className="h-4 w-4" />
                      {t('Category')}
                    </Label>
                    <Input 
                      id="category" 
                      name="category" 
                      value={formData.category} 
                      onChange={handleInputChange} 
                      placeholder={t('e.g., Web Development, Design')} 
                      className="mt-1" 
                      required 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="max_submissions" className="flex items-center gap-2">
                      <AiOutlineNumber className="h-4 w-4" />
                      {t('Maximum Submissions')}
                    </Label>
                    <Input 
                      id="max_submissions" 
                      name="max_submissions" 
                      type="number" 
                      value={formData.max_submissions} 
                      onChange={handleNumberInputChange} 
                      min="0" 
                      className="mt-1" 
                      required 
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2 pt-8">
                    <Switch 
                      id="is_active" 
                      checked={formData.is_active} 
                      onCheckedChange={handleSwitchChange}
                    />
                    <Label htmlFor="is_active" className="flex items-center gap-2">
                      <IoMdSwitch className="h-4 w-4" />
                      {t('Make task active immediately')}
                    </Label>
                  </div>
                </div>
                
                <div>
                  <Label className="flex items-center gap-2">
                    <FaSkiing className="h-4 w-4" />
                    {t('Required Skills')}
                  </Label>
                  
                  {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                    <div key={category} className="mt-3">
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">{category}</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {categorySkills.map((skill) => (
                          <motion.div 
                            key={skill.id} 
                            className={cn(
                              "border rounded-md p-2 cursor-pointer transition-all flex items-center justify-between",
                              formData.required_skill_ids.includes(skill.id) 
                                ? "bg-primary text-primary-foreground border-primary" 
                                : "hover:bg-accent hover:text-accent-foreground"
                            )}
                            onClick={() => handleSkillSelection(skill.id)}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <span>{skill.name}</span>
                            {formData.required_skill_ids.includes(skill.id) && (
                              <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="h-2 w-2 rounded-full bg-primary-foreground"
                              />
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></div>
                      {t('Posting...')}
                    </>
                  ) : t('Post Task')}
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
