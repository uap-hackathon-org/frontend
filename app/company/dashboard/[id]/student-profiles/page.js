"use client";

import React, { useState, useEffect, use } from 'react';
import { Card } from '@/components/ui/components/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/components/tabs';
import { Input } from '@/components/ui/components/input';
import { Badge } from '@/components/ui/components/badge';
import { Button } from '@/components/ui/components/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/components/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/components/select';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/language/LanguageContext';

// Icons
import { HiUsers, HiSearch, HiOutlineAcademicCap, HiStar, HiOutlineBookOpen, HiTag, HiGlobe, HiFilter } from 'react-icons/hi';
import { HiTrophy } from "react-icons/hi2";
import { FaSortAmountDown, FaAward, FaMedal, FaGraduationCap, FaLaptopCode, FaUserTie } from 'react-icons/fa';
import { BsFillTrophyFill, BsAward, BsStars } from 'react-icons/bs';
import { TbDeviceDesktopAnalytics, TbBadge } from 'react-icons/tb';
import { MdLeaderboard, MdOutlineSchool, MdCategory } from 'react-icons/md';

// Mock data
import { getMockCompanyById, getMockLeaderboardByCategory } from '@/lib/mock';

export default function StudentProfiles({ params }) {
  // Create a client component wrapper
  return <ClientStudentProfiles params={params} />;
}

// Client component that handles all the rendering and state
function ClientStudentProfiles({ params }) {
  // Properly unwrap params with React.use() to avoid the warning
  const unwrappedParams = use(params);
  const { id } = unwrappedParams || {};
  
  const { toast } = useToast();
  const { t } = useLanguage();
  
  // State for leaderboard data
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('points'); // points, tasks, level
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [company, setCompany] = useState(null);
  
  // Category options
  const categories = [
    { id: 'all', name: 'All Categories', icon: <MdCategory className="h-4 w-4" /> },
    { id: 'frontend', name: 'Frontend Development', icon: <HiGlobe className="h-4 w-4" /> },
    { id: 'backend', name: 'Backend Development', icon: <FaLaptopCode className="h-4 w-4" /> },
    { id: 'mobile', name: 'Mobile Development', icon: <TbDeviceDesktopAnalytics className="h-4 w-4" /> },
    { id: 'data-science', name: 'Data Science', icon: <HiOutlineAcademicCap className="h-4 w-4" /> },
    { id: 'devops', name: 'DevOps', icon: <HiOutlineBookOpen className="h-4 w-4" /> },
    { id: 'design', name: 'UI/UX Design', icon: <FaUserTie className="h-4 w-4" /> }
  ];
  
  // Fetch data
  const fetchData = async () => {
    setLoading(true);
    try {
      // Get company data
      const companyData = getMockCompanyById(parseInt(id));
      setCompany(companyData);
      
      // In a real app, you'd fetch leaderboard data from the API based on the company ID
      // For now, we'll use mock data
      let students;
      if (selectedCategory === 'all') {
        students = getMockLeaderboardByCategory(); // Get all categories
      } else {
        students = getMockLeaderboardByCategory(selectedCategory);
      }
      
      setLeaderboardData(students);
      applyFilters(students, searchQuery, sortOrder);
      setLoading(false);
    } catch (err) {
      setError('Failed to load leaderboard data');
      setLoading(false);
      toast({
        title: 'Error',
        description: 'Failed to load leaderboard data. Please try again.',
        variant: 'destructive'
      });
    }
  };
  
  // Apply filters (search and sort)
  const applyFilters = (data, query, sort) => {
    // Apply search filter
    let filtered = data;
    if (query) {
      filtered = data.filter(student => {
        const searchLower = query.toLowerCase();
        return (
          student.name.toLowerCase().includes(searchLower) ||
          student.university.toLowerCase().includes(searchLower) ||
          student.major.toLowerCase().includes(searchLower) ||
          student.skills.some(skill => skill.toLowerCase().includes(searchLower))
        );
      });
    }
    
    // Apply sort
    switch (sort) {
      case 'points':
        filtered = [...filtered].sort((a, b) => b.points - a.points);
        break;
      case 'tasks':
        filtered = [...filtered].sort((a, b) => b.tasksCompleted - a.tasksCompleted);
        break;
      case 'level':
        filtered = [...filtered].sort((a, b) => b.level - a.level);
        break;
      case 'name':
        filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'recent':
        filtered = [...filtered].sort((a, b) => new Date(b.lastActive) - new Date(a.lastActive));
        break;
      default:
        filtered = [...filtered].sort((a, b) => b.points - a.points);
    }
    
    setFilteredData(filtered);
  };
  
  // Handle category changes
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
  
  // Handle search input changes
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  
  // Handle sort order changes
  const handleSortChange = (value) => {
    setSortOrder(value);
  };
  
  // Effect to fetch data on component mount and when filters change
  useEffect(() => {
    fetchData();
  }, [selectedCategory]);
  
  // Effect to apply filters when search or sort changes
  useEffect(() => {
    applyFilters(leaderboardData, searchQuery, sortOrder);
  }, [searchQuery, sortOrder, leaderboardData]);
  
  // Component mounted state
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Loading component
  const loadingComponent = (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500 mx-auto"></div>
        <p className="text-lg text-gray-600 dark:text-gray-300">{t('Loading student profiles...')}</p>
      </div>
    </div>
  );
  
  // Badge color for different levels
  const getBadgeColor = (level) => {
    if (level === 'gold') return 'bg-yellow-500 hover:bg-yellow-600';
    if (level === 'silver') return 'bg-slate-400 hover:bg-slate-500';
    if (level === 'bronze') return 'bg-amber-600 hover:bg-amber-700';
    return 'bg-blue-500 hover:bg-blue-600';
  };
  
  // Only animate after client-side hydration completes
  if (!mounted) {
    return loadingComponent;
  }
  
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full">
            <MdLeaderboard className="h-6 w-6 text-amber-600 dark:text-amber-400" />
          </div>
          <h1 className="text-3xl font-bold">{t('Student Leaderboard')}</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          {t('View top performing students across different skill categories and track their progress.')}
        </p>
      </motion.div>
      
      {loading ? (
        loadingComponent
      ) : error ? (
        <Card className="p-6 text-center text-red-500">
          <p>{error}</p>
          <Button 
            variant="outline" 
            className="mt-4" 
            onClick={fetchData}
          >
            {t('Try Again')}
          </Button>
        </Card>
      ) : (
        <>
          {/* Filtering and Search Controls */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="relative">
                  <HiSearch className="absolute left-3 top-3 text-gray-500 h-4 w-4" />
                  <Input
                    placeholder={t('Search by name, university, or skills...')}
                    className="pl-10"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Select value={sortOrder} onValueChange={handleSortChange}>
                    <SelectTrigger>
                      <div className="flex items-center gap-2">
                        <FaSortAmountDown className="h-4 w-4" />
                        <SelectValue placeholder={t('Sort by')} />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="points">{t('Sort by Points (Highest)')}</SelectItem>
                      <SelectItem value="tasks">{t('Sort by Tasks Completed')}</SelectItem>
                      <SelectItem value="level">{t('Sort by Level')}</SelectItem>
                      <SelectItem value="name">{t('Sort by Name (A-Z)')}</SelectItem>
                      <SelectItem value="recent">{t('Sort by Recent Activity')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    {t('Showing')}: <strong>{filteredData.length}</strong> {t('students')}
                  </p>
                </div>
              </div>
              
              {/* Category Tabs */}
              <Tabs 
                defaultValue="all" 
                value={selectedCategory} 
                onValueChange={handleCategoryChange}
                className="w-full"
              >
                <div className="overflow-x-auto pb-2">
                  <TabsList className="gap-2 w-max min-w-full">
                    {categories.map(category => (
                      <TabsTrigger 
                        key={category.id} 
                        value={category.id}
                        className="flex items-center gap-1"
                      >
                        {category.icon}
                        {t(category.name)}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
                
                <div className="mt-6">
                  {filteredData.length === 0 ? (
                    <div className="text-center py-16 text-gray-500">
                      <HiSearch className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                      <p className="text-lg font-medium">{t('No students found')}</p>
                      <p className="text-sm mt-2">{t('Try adjusting your search criteria')}</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {filteredData.map((student, index) => (
                        <StudentCard 
                          key={student.id} 
                          student={student} 
                          rank={index + 1} 
                          getBadgeColor={getBadgeColor}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </Tabs>
            </Card>
          </motion.div>
        </>
      )}
    </div>
  );
}

// Student Card Component
function StudentCard({ student, rank, getBadgeColor }) {
  const { t } = useLanguage();
  
  // Get initials for avatar fallback
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  // Format the university name to be shorter if needed
  const formatUniversity = (university) => {
    if (university.length > 30) {
      // First try to use common acronyms
      if (university.includes('Bangladesh University of Engineering and Technology')) {
        return 'BUET';
      }
      if (university.includes('Bangladesh University of Professionals')) {
        return 'BUP';
      }
      if (university.includes('Dhaka University')) {
        return 'DU';
      }
      // If no known acronym, truncate
      return university.substring(0, 30) + '...';
    }
    return university;
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 + (rank * 0.05) }}
    >
      <Card className="p-10 hover:shadow-md transition-shadow duration-300 overflow-hidden border-l-4 relative" 
           style={{ borderLeftColor: rank <= 3 ? '#F59E0B' : '#64748B' }}>
        {/* Rank indicator */}
        <div className="absolute top-2 right-2 flex items-center">
          <div className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5">
            {rank <= 3 ? <HiTrophy className="text-amber-500" /> : <HiStar className="text-slate-400" />}
            #{rank}
          </div>
        </div>
        
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="relative">
            <Avatar className="h-16 w-16 border-2 shadow-sm" style={{ borderColor: rank <= 3 ? '#F59E0B' : '#E2E8F0' }}>
              <AvatarImage src={student.avatar} />
              <AvatarFallback className="bg-amber-100 text-amber-800">
                {getInitials(student.name)}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 bg-amber-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-white dark:border-gray-900">
              {student.level}
            </div>
          </div>
          
          {/* Main content */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-1">
              <h3 className="font-bold text-lg truncate flex-1">{student.name}</h3>
              <div className="text-right">
                <div className="flex items-center gap-1 text-amber-600 font-semibold">
                  <FaMedal className="h-4 w-4" />
                  {student.points.toLocaleString()} {t('pts')}
                </div>
                <div className="text-xs text-gray-500">
                  {student.tasksCompleted} {t('tasks completed')}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 mb-3">
              <MdOutlineSchool className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{formatUniversity(student.university)}</span>
              <span className="mx-1 text-gray-400">•</span>
              <span>{student.major}</span>
              <span className="mx-1 text-gray-400">•</span>
              <FaGraduationCap className="h-3.5 w-3.5" />
              <span>Year {student.year}</span>
            </div>
            
            {/* Skills */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {student.skills.slice(0, 5).map((skill, i) => (
                <Badge key={i} variant="secondary" className="text-xs py-0.5">
                  {skill}
                </Badge>
              ))}
              {student.skills.length > 5 && (
                <Badge variant="outline" className="text-xs py-0.5">
                  +{student.skills.length - 5} more
                </Badge>
              )}
            </div>
            
            {/* Badges/Achievements */}
            <div className="flex items-center gap-2">
              <TbBadge className="h-4 w-4 text-gray-500" />
              {student.badges.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {student.badges.map((badge, i) => (
                    <Badge 
                      key={i} 
                      className={`text-xs py-0.5 ${getBadgeColor(badge.level)}`}
                    >
                      {badge.icon} {badge.name}
                    </Badge>
                  ))}
                </div>
              ) : (
                <span className="text-sm text-gray-500">{t('No badges yet')}</span>
              )}
            </div>
          </div>
        </div>
        
        {/* Bottom stats */}
        <div className="flex justify-between items-center text-xs text-gray-500 mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <BsAward className="h-3.5 w-3.5" />
              {student.certificates} {t('certificates')}
            </span>
            <span className="flex items-center gap-1">
              <HiOutlineAcademicCap className="h-3.5 w-3.5" />
              Level {student.level}
            </span>
          </div>
          <span className="flex items-center gap-1">
            {t('Active')}: {new Date(student.lastActive).toLocaleDateString()}
          </span>
        </div>
      </Card>
    </motion.div>
  );
}
