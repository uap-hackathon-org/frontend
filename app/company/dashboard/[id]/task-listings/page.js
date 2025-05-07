"use client";

import React, { useState, useEffect, use } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/components/card';
import { Badge } from '@/components/ui/components/badge';
import { Button } from '@/components/ui/components/button';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { HiPuzzle, HiCalendar, HiUserGroup, HiClock, HiTag, HiStar } from 'react-icons/hi';
import { MdEdit, MdDelete } from 'react-icons/md';
import { useLanguage } from '@/lib/language/LanguageContext';
import { microTasks } from '@/lib/mock';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/components/tabs';
import { Input } from '@/components/ui/components/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/components/select';
import { FiFilter, FiSearch } from 'react-icons/fi';
import { format } from 'date-fns';

export default function TaskListings({ params }) {
  // Create a client component wrapper
  return <ClientTaskListings params={params} />;
}

// Client component that handles all the rendering and state
function ClientTaskListings({ params }) {
  // Properly unwrap params with React.use() to avoid the warning
  const unwrappedParams = use(params);
  const { id: companyId } = unwrappedParams || {};
  
  const { toast } = useToast();
  const { t } = useLanguage();
  
  const [mounted, setMounted] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    searchQuery: '',
    difficulty: 'all',
    status: 'all'
  });
  
  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      // First, try to fetch from the API
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/skills`, {
        headers: {
          'ngrok-skip-browser-warning': '69420'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch tasks data');
      }
      
      const data = await response.json();
      setTasks(data);
      setFilteredTasks(data);
    } catch (error) {
      console.error('Error fetching tasks, using mock data instead:', error);
      // Fall back to mock data if the API call fails
      // Filter the microTasks to only include those created by this company (simulated)
      const companyTasks = microTasks.filter(task => {
        // In a real app, this would match the current company ID
        // For demo purposes, we'll simulate this by just returning all mock tasks
        return true; // In real app: task.created_by_id === parseInt(companyId)
      });
      
      setTasks(companyTasks);
      setFilteredTasks(companyTasks);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Filter tasks based on current filters
  const applyFilters = () => {
    let filtered = [...tasks];
    
    // Apply search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(query) || 
        task.description.toLowerCase().includes(query)
      );
    }
    
    // Apply difficulty filter
    if (filters.difficulty !== 'all') {
      filtered = filtered.filter(task => task.difficulty === filters.difficulty);
    }
    
    // Apply status filter
    if (filters.status !== 'all') {
      const isActive = filters.status === 'active';
      filtered = filtered.filter(task => task.is_active === isActive);
    }
    
    setFilteredTasks(filtered);
  };
  
  useEffect(() => {
    setMounted(true);
    fetchTasks();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  useEffect(() => {
    if (tasks.length > 0) {
      applyFilters();
    }
  }, [filters, tasks]); // eslint-disable-line react-hooks/exhaustive-deps
  
  const handleSearchChange = (e) => {
    setFilters(prev => ({ ...prev, searchQuery: e.target.value }));
  };
  
  const handleDifficultyChange = (value) => {
    setFilters(prev => ({ ...prev, difficulty: value }));
  };
  
  const handleStatusChange = (value) => {
    setFilters(prev => ({ ...prev, status: value }));
  };
  
  const handleEditTask = (taskId) => {
    toast({
      title: t('Edit Task'),
      description: t('Edit task feature coming soon.'),
      variant: 'default'
    });
  };
  
  const handleDeleteTask = (taskId) => {
    toast({
      title: t('Delete Task'),
      description: t('Delete task feature coming soon.'),
      variant: 'destructive'
    });
  };
  
  // Create a difficulty badge based on the task's difficulty level
  const DifficultyBadge = ({ difficulty }) => {
    const configs = {
      beginner: { color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400', label: t('Beginner') },
      intermediate: { color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400', label: t('Intermediate') },
      advanced: { color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400', label: t('Advanced') }
    };
    
    const config = configs[difficulty] || configs.beginner;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <HiStar className="mr-1" />
        {config.label}
      </span>
    );
  };
  
  const StatusBadge = ({ isActive }) => {
    return isActive ? (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
        {t('Active')}
      </span>
    ) : (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400">
        {t('Inactive')}
      </span>
    );
  };
  
  // Create a consistent loading component that matches on both server and client
  const loadingComponent = (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
        <p className="text-lg text-muted-foreground">{t('Loading task listings')}...</p>
      </div>
    </div>
  );
  
  // Error component
  const errorComponent = (
    <div className="flex flex-col items-center justify-center min-h-[30vh] p-6 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-200 dark:border-red-900/50">
      <div className="text-center space-y-4">
        <h3 className="text-xl font-semibold text-red-700 dark:text-red-400">{t('Error loading tasks')}</h3>
        <p className="text-red-600 dark:text-red-300">{error}</p>
        <p className="text-gray-600 dark:text-gray-400">{t('Displaying mock data instead')}</p>
        <Button onClick={fetchTasks} variant="outline" className="mt-2">
          {t('Try Again')}
        </Button>
      </div>
    </div>
  );
  
  // Empty state component
  const emptyStateComponent = (
    <div className="flex flex-col items-center justify-center min-h-[30vh] p-6 bg-gray-50 dark:bg-gray-900/20 rounded-lg border border-gray-200 dark:border-gray-800">
      <div className="text-center space-y-4">
        <HiPuzzle className="h-16 w-16 text-gray-400 dark:text-gray-600 mx-auto" />
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">{t('No tasks found')}</h3>
        <p className="text-gray-600 dark:text-gray-400">
          {t('You haven\'t created any tasks yet or no tasks match your filters.')}
        </p>
        <Button asChild variant="default" className="mt-2">
          <a href={`/company/dashboard/${companyId}/post-task`}>
            {t('Create Your First Task')}
          </a>
        </Button>
      </div>
    </div>
  );
  
  // Only animate after client-side hydration completes
  if (!mounted) {
    return loadingComponent;
  }
  
  return (
    <div className="space-y-6 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-primary/10 p-2 rounded-full">
            <HiPuzzle className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">{t('Task Listings')}</h1>
        </div>
        <p className="text-muted-foreground">
          {t('Manage your published micro-tasks and track student performance.')}
        </p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Tabs defaultValue="all" className="w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <TabsList>
              <TabsTrigger value="all">{t('All Tasks')}</TabsTrigger>
              <TabsTrigger value="active">{t('Active')}</TabsTrigger>
              <TabsTrigger value="inactive">{t('Inactive')}</TabsTrigger>
            </TabsList>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder={t('Search tasks...')}
                  className="pl-10"
                  value={filters.searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
              
              <div className="flex gap-2">
                <Select value={filters.difficulty} onValueChange={handleDifficultyChange}>
                  <SelectTrigger className="w-full sm:w-40">
                    <span className="flex items-center">
                      <FiFilter className="mr-2" />
                      <SelectValue placeholder={t('Difficulty')} />
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('All Difficulties')}</SelectItem>
                    <SelectItem value="beginner">{t('Beginner')}</SelectItem>
                    <SelectItem value="intermediate">{t('Intermediate')}</SelectItem>
                    <SelectItem value="advanced">{t('Advanced')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          {isLoading ? (
            loadingComponent
          ) : error && tasks.length === 0 ? (
            errorComponent
          ) : filteredTasks.length === 0 ? (
            emptyStateComponent
          ) : (
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredTasks.map((task, index) => (
                  <motion.div 
                    key={task.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow duration-300">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-xl">{task.title}</CardTitle>
                          <StatusBadge isActive={task.is_active} />
                        </div>
                        <CardDescription className="line-clamp-2 mt-1">{task.description}</CardDescription>
                      </CardHeader>
                      
                      <CardContent className="pb-3 flex-grow">
                        <div className="grid grid-cols-2 gap-y-2 text-sm">
                          <div className="flex items-center">
                            <HiStar className="mr-1.5 text-primary" />
                            <span>{t('Difficulty')}:</span>
                          </div>
                          <div>
                            <DifficultyBadge difficulty={task.difficulty} />
                          </div>
                          
                          <div className="flex items-center">
                            <HiTag className="mr-1.5 text-primary" />
                            <span>{t('Category')}:</span>
                          </div>
                          <div className="capitalize">{task.category}</div>
                          
                          <div className="flex items-center">
                            <HiCalendar className="mr-1.5 text-primary" />
                            <span>{t('Deadline')}:</span>
                          </div>
                          <div>{format(new Date(task.deadline), 'MMM d, yyyy')}</div>
                          
                          <div className="flex items-center">
                            <HiUserGroup className="mr-1.5 text-primary" />
                            <span>{t('Submissions')}:</span>
                          </div>
                          <div>{task.completed_count || 0} / {task.max_submissions}</div>
                          
                          <div className="flex items-center">
                            <HiClock className="mr-1.5 text-primary" />
                            <span>{t('Est. Time')}:</span>
                          </div>
                          <div>{task.estimated_hours || '-'} {t('hours')}</div>
                        </div>
                        
                        <div className="mt-4 flex flex-wrap gap-2">
                          {task.required_skills && task.required_skills.map((skill, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      
                      <CardFooter className="pt-3 border-t">
                        <div className="flex justify-between items-center w-full">
                          <div className="text-sm text-muted-foreground">
                            {t('Created')}: {format(new Date(task.creation_date), 'MMM d, yyyy')}
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost" onClick={() => handleEditTask(task.id)}>
                              <MdEdit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleDeleteTask(task.id)}>
                              <MdDelete className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          )}
          
          {/* These content sections would normally filter by the tab, but we're already handling filtering via the state */}
          <TabsContent value="active">
            {/* Same content as "all" but filtered for active tasks */}
          </TabsContent>
          
          <TabsContent value="inactive">
            {/* Same content as "all" but filtered for inactive tasks */}
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
