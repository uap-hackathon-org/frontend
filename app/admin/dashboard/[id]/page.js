"use client";

import React, { useState, useEffect, use } from 'react';
import { Card } from '@/components/ui/components/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/components/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/components/select';
import { Button } from '@/components/ui/components/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/components/avatar';
import { Badge } from '@/components/ui/components/badge';
import { Progress } from '@/components/ui/components/progress';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/language/LanguageContext';

// Icons
import { 
  HiOutlineOfficeBuilding, 
  HiOutlineClipboardList, 
  HiOutlineUserGroup, 
  HiOutlineChartBar,
  HiOutlineCalendar,
  HiOutlineTrendingUp,
  HiOutlineLightningBolt,
  HiOutlineAcademicCap,
  HiOutlineGlobeAlt,
  HiOutlineLocationMarker,
  HiOutlineUserCircle,
  HiArrowSmUp, 
  HiArrowSmDown,
  HiOutlineRefresh,
  HiOutlineFilter,
  HiOutlineTag,
  HiOutlineMap
} from 'react-icons/hi';
import { FaCheckCircle, FaRegClock, FaBriefcase, FaUserGraduate, FaNetworkWired } from 'react-icons/fa';
import { BiNetworkChart, BiTargetLock, BiError } from 'react-icons/bi';
import { TbCalendarEvent, TbDeviceAnalytics } from 'react-icons/tb';
import { BsGraphUp, BsGraphDown, BsBarChartLine, BsPieChartFill, BsGlobe } from 'react-icons/bs';
import { IoCalendarOutline, IoGridOutline } from 'react-icons/io5';
import { MdLanguage, MdOutlineManageAccounts, MdOutlineCategory } from 'react-icons/md';

export default function AdminDashboard({ params }) {
  const unwrappedParams = React.use(params);
  return <ClientAdminDashboard params={unwrappedParams} />;
}

// Client component that handles all the rendering and state
function ClientAdminDashboard({ params }) {
  // Access params directly since they're already unwrapped in the parent component
  const { id } = params || {};
  
  const { toast } = useToast();
  const { t } = useLanguage();
  
  // State management
  const [dashboardData, setDashboardData] = useState(null);
  const [timeFilter, setTimeFilter] = useState('6m'); // 7d, 1m, 3m, 6m, 1y
  const [currentTab, setCurrentTab] = useState('overview');
  const [selectedChartFilter, setSelectedChartFilter] = useState('students');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);
  
  // Fetch dashboard data
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // For real implementation, this would be an API call
      // For now, we'll use our mock data
      const { getAdminDashboardData } = await import('@/lib/mock');
      const data = getAdminDashboardData();
      
      setDashboardData(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data');
      toast({
        title: 'Error',
        description: 'Failed to load dashboard data. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Format number with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  
  // Format revenue as currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'BDT',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Initial data load
  useEffect(() => {
    fetchDashboardData();
    setMounted(true);
  }, []);
  
  // Format percentage for growth indicators
  const formatPercentage = (value) => {
    return value.toFixed(1) + '%';
  };
  
  // Activity icon and description helpers
  const getActivityIconClass = (type) => {
    switch (type) {
      case 'company_joined':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400';
      case 'workshop_created':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400';
      case 'task_completed':
        return 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400';
      case 'mentorship_session':
        return 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400';
      case 'hackathon_completed':
        return 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400';
      case 'new_task_posted':
        return 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400';
      case 'student_achievement':
        return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400';
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400';
    }
  };
  
  const getActivityIcon = (type) => {
    switch (type) {
      case 'company_joined':
        return <HiOutlineOfficeBuilding className="h-5 w-5" />;
      case 'workshop_created':
        return <TbCalendarEvent className="h-5 w-5" />;
      case 'task_completed':
        return <FaCheckCircle className="h-5 w-5" />;
      case 'mentorship_session':
        return <FaNetworkWired className="h-5 w-5" />;
      case 'hackathon_completed':
        return <HiOutlineTrendingUp className="h-5 w-5" />;
      case 'new_task_posted':
        return <HiOutlineClipboardList className="h-5 w-5" />;
      case 'student_achievement':
        return <HiOutlineAcademicCap className="h-5 w-5" />;
      default:
        return <HiOutlineTag className="h-5 w-5" />;
    }
  };
  
  const getActivityDescription = (activity) => {
    switch (activity.type) {
      case 'company_joined':
        return `${activity.company} joined the platform`;
      case 'workshop_created':
        return `${activity.company} created a new workshop: "${activity.title}"`;
      case 'task_completed':
        return `${activity.student} completed task "${activity.task}" for ${activity.company}`;
      case 'mentorship_session':
        return `Mentorship session between ${activity.mentor} and ${activity.student}`;
      case 'hackathon_completed':
        return `Hackathon "${activity.title}" completed with ${activity.participants} participants`;
      case 'new_task_posted':
        return `${activity.company} posted a new task: "${activity.task}"`;
      case 'student_achievement':
        return `${activity.student} achieved: ${activity.achievement}`;
      default:
        return `New activity: ${JSON.stringify(activity)}`;
    }
  };
  
  // Get max value for progress bars
  const getMaxValue = (metric) => {
    if (!dashboardData?.monthlySummary) return 100;
    
    const maxValue = Math.max(...dashboardData.monthlySummary.map(item => item[metric]));
    // Add 10% buffer to make the bars look nicer
    return maxValue * 1.1;
  };
  
  // Get color class based on value
  const getColorClass = (value, type) => {
    if (type === 'text') {
      return value >= 80 ? 'text-green-500' : 
             value >= 60 ? 'text-yellow-500' : 
             'text-red-500';
    } else { // background
      return value >= 80 ? 'bg-green-500' : 
             value >= 60 ? 'bg-yellow-500' : 
             'bg-red-500';
    }
  };
  
  // Create a consistent loading component that matches on both server and client
  const loadingComponent = (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
        <p className="text-lg text-gray-600 dark:text-gray-300">Loading...</p>
      </div>
    </div>
  );
  
  // Only animate after client-side hydration completes
  if (!mounted) {
    return loadingComponent;
  }
  
  return (
    <div className="space-y-6">
      {loading && !dashboardData ? (
        loadingComponent
      ) : error ? (
        <Card className="p-6 text-center">
          <div className="flex flex-col items-center justify-center py-8">
            <BiError className="h-12 w-12 text-red-500 mb-4" />
            <h3 className="text-xl font-semibold text-red-500">{error}</h3>
            <Button 
              variant="outline" 
              className="mt-4" 
              onClick={fetchDashboardData}
            >
              <HiOutlineRefresh className="mr-2 h-4 w-4" />
              {t('Try Again')}
            </Button>
          </div>
        </Card>
      ) : (
        <>
          {/* Dashboard header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div>
              <h1 className="text-3xl font-bold mb-2">{t('adminDashboard')}</h1>
              <p className="text-gray-600 dark:text-gray-400">
                {t('TryShip')} {t('adminDashboard')} - {t('Platform Overview and Analytics')}
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter time period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">{t('Last 7 days')}</SelectItem>
                  <SelectItem value="1m">{t('Last month')}</SelectItem>
                  <SelectItem value="3m">{t('Last 3 months')}</SelectItem>
                  <SelectItem value="6m">{t('Last 6 months')}</SelectItem>
                  <SelectItem value="1y">{t('Last year')}</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="icon" onClick={fetchDashboardData}>
                <HiOutlineRefresh className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
          
          {/* Tabs for different dashboard views */}
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
            <TabsList className="w-full md:w-auto mb-4">
              <TabsTrigger value="overview" className="flex items-center gap-1">
                <HiOutlineChartBar className="h-4 w-4" />
                {t('Overview')}
              </TabsTrigger>
              <TabsTrigger value="engagement" className="flex items-center gap-1">
                <HiOutlineTrendingUp className="h-4 w-4" />
                {t('Engagement')}
              </TabsTrigger>
              <TabsTrigger value="skills" className="flex items-center gap-1">
                <HiOutlineLightningBolt className="h-4 w-4" />
                {t('Skills')}
              </TabsTrigger>
              <TabsTrigger value="geography" className="flex items-center gap-1">
                <HiOutlineGlobeAlt className="h-4 w-4" />
                {t('Geography')}
              </TabsTrigger>
            </TabsList>
            
            {/* Overview Tab Content */}
            <TabsContent value="overview" className="space-y-6">
              {/* Summary Stat Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                {/* Companies Stat */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <Card className="p-6 border-l-4 border-blue-500 h-full">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('companies')}</p>
                        <h3 className="text-2xl font-bold mt-1">{formatNumber(dashboardData?.platformStats.companies.total || 0)}</h3>
                        <div className="flex items-center mt-2 text-sm">
                          <span className={`flex items-center ${dashboardData?.platformStats.companies.growth > 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {dashboardData?.platformStats.companies.growth > 0 ? (
                              <HiArrowSmUp className="h-4 w-4 mr-1" />
                            ) : (
                              <HiArrowSmDown className="h-4 w-4 mr-1" />
                            )}
                            {formatPercentage(dashboardData?.platformStats.companies.growth || 0)}
                          </span>
                          <span className="text-gray-500 ml-2">{t('vs last month')}</span>
                        </div>
                      </div>
                      <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg">
                        <HiOutlineOfficeBuilding className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                  </Card>
                </motion.div>
                
                {/* Tasks Stat */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <Card className="p-6 border-l-4 border-amber-500 h-full">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('microTasks')}</p>
                        <h3 className="text-2xl font-bold mt-1">{formatNumber(dashboardData?.platformStats.tasks.total || 0)}</h3>
                        <div className="flex items-center mt-2 text-sm">
                          <span className={`flex items-center ${dashboardData?.platformStats.tasks.growth > 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {dashboardData?.platformStats.tasks.growth > 0 ? (
                              <HiArrowSmUp className="h-4 w-4 mr-1" />
                            ) : (
                              <HiArrowSmDown className="h-4 w-4 mr-1" />
                            )}
                            {formatPercentage(dashboardData?.platformStats.tasks.growth || 0)}
                          </span>
                          <span className="text-gray-500 ml-2">{t('vs last month')}</span>
                        </div>
                      </div>
                      <div className="bg-amber-100 dark:bg-amber-900/20 p-3 rounded-lg">
                        <HiOutlineClipboardList className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                      </div>
                    </div>
                  </Card>
                </motion.div>
                
                {/* Students Stat */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <Card className="p-6 border-l-4 border-green-500 h-full">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('allStudents')}</p>
                        <h3 className="text-2xl font-bold mt-1">{formatNumber(dashboardData?.platformStats.students.total || 0)}</h3>
                        <div className="flex items-center mt-2 text-sm">
                          <span className={`flex items-center ${dashboardData?.platformStats.students.growth > 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {dashboardData?.platformStats.students.growth > 0 ? (
                              <HiArrowSmUp className="h-4 w-4 mr-1" />
                            ) : (
                              <HiArrowSmDown className="h-4 w-4 mr-1" />
                            )}
                            {formatPercentage(dashboardData?.platformStats.students.growth || 0)}
                          </span>
                          <span className="text-gray-500 ml-2">{t('vs last month')}</span>
                        </div>
                      </div>
                      <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-lg">
                        <HiOutlineUserGroup className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                    </div>
                  </Card>
                </motion.div>
                
                {/* Workshops Stat */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <Card className="p-6 border-l-4 border-purple-500 h-full">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('workshops')}</p>
                        <h3 className="text-2xl font-bold mt-1">{formatNumber(dashboardData?.platformStats.workshops.total || 0)}</h3>
                        <div className="flex items-center mt-2 text-sm">
                          <span className={`flex items-center ${dashboardData?.platformStats.workshops.growth > 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {dashboardData?.platformStats.workshops.growth > 0 ? (
                              <HiArrowSmUp className="h-4 w-4 mr-1" />
                            ) : (
                              <HiArrowSmDown className="h-4 w-4 mr-1" />
                            )}
                            {formatPercentage(dashboardData?.platformStats.workshops.growth || 0)}
                          </span>
                          <span className="text-gray-500 ml-2">{t('vs last month')}</span>
                        </div>
                      </div>
                      <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-lg">
                        <TbCalendarEvent className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </div>

              {/* Second Row of Stat Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Mentorship Sessions */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  <Card className="p-6 border-l-4 border-indigo-500 h-full">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('mentorship')}</p>
                        <h3 className="text-2xl font-bold mt-1">{formatNumber(dashboardData?.platformStats.mentorship.totalSessions || 0)}</h3>
                        <div className="flex items-center mt-2 text-sm">
                          <span className={`flex items-center text-green-500`}>
                            <HiArrowSmUp className="h-4 w-4 mr-1" />
                            {formatPercentage(dashboardData?.platformStats.mentorship.growth || 0)}
                          </span>
                          <span className="text-gray-500 ml-2">{t('vs last month')}</span>
                        </div>
                      </div>
                      <div className="bg-indigo-100 dark:bg-indigo-900/20 p-3 rounded-lg">
                        <FaNetworkWired className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                      </div>
                    </div>
                  </Card>
                </motion.div>
                
                {/* Active Connections */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                >
                  <Card className="p-6 border-l-4 border-cyan-500 h-full">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('Active Connections')}</p>
                        <h3 className="text-2xl font-bold mt-1">{formatNumber(dashboardData?.platformStats.mentorship.activeConnections || 0)}</h3>
                        <p className="text-sm text-gray-500 mt-2">
                          {formatNumber(dashboardData?.platformStats.students.active || 0)} {t('active students')}
                        </p>
                      </div>
                      <div className="bg-cyan-100 dark:bg-cyan-900/20 p-3 rounded-lg">
                        <BiNetworkChart className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                      </div>
                    </div>
                  </Card>
                </motion.div>
                
                {/* Revenue */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.7 }}
                >
                  <Card className="p-6 border-l-4 border-emerald-500 h-full">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('Total Revenue')}</p>
                        <h3 className="text-2xl font-bold mt-1">{formatCurrency(dashboardData?.platformStats.revenue.total || 0)}</h3>
                        <div className="flex items-center mt-2 text-sm">
                          <span className="flex items-center text-green-500">
                            <HiArrowSmUp className="h-4 w-4 mr-1" />
                            {formatPercentage(dashboardData?.platformStats.revenue.growth || 0)}
                          </span>
                          <span className="text-gray-500 ml-2">{t('vs last month')}</span>
                        </div>
                      </div>
                      <div className="bg-emerald-100 dark:bg-emerald-900/20 p-3 rounded-lg">
                        <BiTargetLock className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </div>
              
              {/* Monthly Summary Chart */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Card className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">  
                    <div>
                      <h2 className="text-xl font-semibold">{t('Platform Growth')}</h2>
                      <p className="text-sm text-gray-500">{t('Monthly summary of key metrics')}</p>
                    </div>
                  
                    <div className="mt-4 md:mt-0">
                      <Select value={selectedChartFilter} onValueChange={setSelectedChartFilter}>
                        <SelectTrigger className="w-[160px]">
                          <SelectValue placeholder="Select metric" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="students">{t('Students')}</SelectItem>
                          <SelectItem value="companies">{t('Companies')}</SelectItem>
                          <SelectItem value="tasks">{t('Tasks')}</SelectItem>
                          <SelectItem value="workshops">{t('Workshops')}</SelectItem>
                          <SelectItem value="revenue">{t('Revenue')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Growth Chart (simplified version) */}
                  <div className="space-y-4">
                    {dashboardData?.monthlySummary ? (
                      <div className="space-y-4">
                        {dashboardData.monthlySummary.map((item, index) => (
                          <div key={index} className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium">{item.month}</span>
                              <span className="text-lg font-bold">
                                {selectedChartFilter === 'revenue' 
                                  ? formatCurrency(item[selectedChartFilter])
                                  : formatNumber(item[selectedChartFilter])}
                              </span>
                            </div>
                            <Progress 
                              value={item[selectedChartFilter] * 100 / getMaxValue(selectedChartFilter)} 
                              className="h-2" 
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-10 text-gray-500">
                        <p>{t('No data available')}</p>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
              
              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <Card className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">  
                    <div>
                      <h2 className="text-xl font-semibold">{t('Recent Activity')}</h2>
                      <p className="text-sm text-gray-500">{t('Latest platform events')}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {dashboardData?.recentActivity.map((activity, index) => (
                      <div key={activity.id} className="flex items-start space-x-4 pb-4 border-b last:border-b-0 border-gray-100 dark:border-gray-800">
                        <div className={`p-2 rounded-full flex-shrink-0 ${getActivityIconClass(activity.type)}`}>
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">
                            {getActivityDescription(activity)}
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(activity.time).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </TabsContent>
            
            {/* Engagement Tab Content */}
            <TabsContent value="engagement" className="space-y-6">
              {/* Daily Active Users */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">  
                    <div>
                      <h2 className="text-xl font-semibold">{t('User Engagement')}</h2>
                      <p className="text-sm text-gray-500">{t('Daily active users and session duration')}</p>
                    </div>
                  </div>
                  
                  {/* Daily Active Users Chart (Simplified) */}
                  <div className="space-y-3">
                    {dashboardData?.studentEngagement?.dailyActiveUsers ? (
                      dashboardData.studentEngagement.dailyActiveUsers.map((item, index) => {
                        const maxCount = Math.max(...dashboardData.studentEngagement.dailyActiveUsers.map(d => d.count));
                        const percentage = (item.count / maxCount) * 100;
                        
                        return (
                          <div key={index} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>{item.date}</span>
                              <span className="font-medium">{formatNumber(item.count)} users</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                              <div 
                                className="bg-blue-600 h-2.5 rounded-full" 
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-center py-10 text-gray-500">
                        <p>{t('No data available')}</p>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
              
              {/* Session Duration */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Card className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">  
                    <div>
                      <h2 className="text-xl font-semibold">{t('Session Duration')}</h2>
                      <p className="text-sm text-gray-500">{t('Average time spent on platform per session')}</p>
                    </div>
                  </div>
                  
                  {/* Session Duration Chart (Simplified) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {dashboardData?.studentEngagement?.sessionDuration ? (
                      dashboardData.studentEngagement.sessionDuration.map((item, index) => {
                        const maxMinutes = Math.max(...dashboardData.studentEngagement.sessionDuration.map(d => d.minutes));
                        
                        return (
                          <Card key={index} className="p-4 border border-gray-200 dark:border-gray-800">
                            <div className="text-center mb-4">
                              <div className="text-sm text-gray-500">{item.date}</div>
                              <div className="text-2xl font-bold mt-1">{item.minutes} {t('minutes')}</div>
                            </div>
                            <Progress 
                              value={(item.minutes / maxMinutes) * 100} 
                              className="h-2" 
                            />
                          </Card>
                        );
                      })
                    ) : (
                      <div className="col-span-2 text-center py-10 text-gray-500">
                        <p>{t('No data available')}</p>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
              
              {/* Task Completion & Category Popularity */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Task Completion Rate */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <Card className="p-6 h-full">
                    <div className="mb-6">  
                      <h2 className="text-xl font-semibold">{t('Task Completion Rate')}</h2>
                      <p className="text-sm text-gray-500">{t('By difficulty level (%)')}</p>
                    </div>
                    
                    {/* Task Completion Chart (Simplified) */}
                    <div className="space-y-6">
                      {dashboardData?.studentEngagement?.taskCompletionRate ? (
                        dashboardData.studentEngagement.taskCompletionRate.map((item, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">{item.difficulty}</span>
                              <span className={getColorClass(item.rate, 'text')}>{item.rate}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                              <div 
                                className={`h-2.5 rounded-full ${getColorClass(item.rate, 'bg')}`} 
                                style={{ width: `${item.rate}%` }}
                              ></div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-10 text-gray-500">
                          <p>{t('No data available')}</p>
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>
                
                {/* Category Popularity */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <Card className="p-6 h-full">
                    <div className="mb-6">  
                      <h2 className="text-xl font-semibold">{t('Category Popularity')}</h2>
                      <p className="text-sm text-gray-500">{t('Student engagement score by category')}</p>
                    </div>
                    
                    {/* Category Popularity Chart (Simplified) */}
                    <div className="space-y-4">
                      {dashboardData?.studentEngagement?.categoryPopularity ? (
                        dashboardData.studentEngagement.categoryPopularity.map((item, index) => (
                          <div key={index} className="space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">{item.category}</span>
                              <Badge variant="outline">{item.popularity}/100</Badge>
                            </div>
                            <Progress 
                              value={item.popularity} 
                              className="h-2" 
                            />
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-10 text-gray-500">
                          <p>{t('No data available')}</p>
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              </div>
              
              {/* Workshop Attendance */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <Card className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">  
                    <div>
                      <h2 className="text-xl font-semibold">{t('Workshop Attendance')}</h2>
                      <p className="text-sm text-gray-500">{t('Monthly attendance rate (%)')}</p>
                    </div>
                  </div>
                  
                  {/* Workshop Attendance Chart (Simplified) */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {dashboardData?.studentEngagement?.workshopAttendance ? (
                      dashboardData.studentEngagement.workshopAttendance.map((item, index) => (
                        <Card key={index} className="p-4 border border-gray-200 dark:border-gray-800 text-center">
                          <div className="text-sm text-gray-500 mb-2">{item.month}</div>
                          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-indigo-100 dark:bg-indigo-900/30 mb-3">
                            <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{item.attendance}%</span>
                          </div>
                          <Progress 
                            value={item.attendance} 
                            className="h-2 mt-2" 
                          />
                        </Card>
                      ))
                    ) : (
                      <div className="col-span-full text-center py-10 text-gray-500">
                        <p>{t('No data available')}</p>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            </TabsContent>
            
            {/* Skills Tab Content */}
            <TabsContent value="skills" className="space-y-6">
              {/* Skill Development */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">  
                    <div>
                      <h2 className="text-xl font-semibold">{t('Skill Development Trends')}</h2>
                      <p className="text-sm text-gray-500">{t('Most popular skills over time')}</p>
                    </div>
                  </div>
                  
                  {/* Skill Development Chart (Simplified) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {dashboardData?.skillsAnalytics?.skillDevelopment ? (
                      dashboardData.skillsAnalytics.skillDevelopment.map((item, index) => {
                        const maxStudents = Math.max(
                          ...dashboardData.skillsAnalytics.skillDevelopment.map(d => d.students)
                        );
                        const maxMastery = Math.max(
                          ...dashboardData.skillsAnalytics.skillDevelopment.map(d => d.mastery)
                        );
                        
                        return (
                          <Card key={index} className="p-4 border border-gray-200 dark:border-gray-800">
                            <div className="flex flex-col space-y-4">
                              <div className="text-center">
                                <h3 className="text-lg font-bold">{item.skill}</h3>
                              </div>
                              
                              <div className="space-y-3">
                                <div>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span>{t('Students')}</span>
                                    <span className="font-medium">{formatNumber(item.students)}</span>
                                  </div>
                                  <Progress 
                                    value={(item.students / maxStudents) * 100} 
                                    className="h-2 bg-blue-100" 
                                  />
                                </div>
                                
                                <div>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span>{t('Mastery Level')}</span>
                                    <span className="font-medium">{item.mastery}/10</span>
                                  </div>
                                  <Progress 
                                    value={(item.mastery / 10) * 100} 
                                    className="h-2 bg-green-100" 
                                  />
                                </div>
                              </div>
                            </div>
                          </Card>
                        );
                      })
                    ) : (
                      <div className="col-span-full text-center py-10 text-gray-500">
                        <p>{t('No data available')}</p>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
              
              {/* Task Distribution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Task Distribution by Category */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <Card className="p-6 h-full">
                    <div className="mb-6">  
                      <h2 className="text-xl font-semibold">{t('Task Distribution')}</h2>
                      <p className="text-sm text-gray-500">{t('By category')}</p>
                    </div>
                    
                    {/* Task Distribution by Category (Simplified) */}
                    <div className="space-y-4">
                      {dashboardData?.skillsAnalytics?.taskDistribution ? (
                        dashboardData.skillsAnalytics.taskDistribution.map((item, index) => {
                          const totalTasks = dashboardData.skillsAnalytics.taskDistribution.reduce(
                            (sum, curr) => sum + curr.count, 0
                          );
                          const percentage = Math.round((item.count / totalTasks) * 100);
                          
                          return (
                            <div key={index} className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <div 
                                    className="w-3 h-3 rounded-full" 
                                    style={{ backgroundColor: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'][index % 5] }}
                                  ></div>
                                  <span className="font-medium">{item.category}</span>
                                </div>
                                <div className="flex space-x-3">
                                  <span className="text-sm text-gray-500">{item.count} tasks</span>
                                  <span className="font-semibold">{percentage}%</span>
                                </div>
                              </div>
                              <Progress 
                                value={percentage} 
                                className="h-2" 
                                style={{ 
                                  backgroundColor: 'rgba(0,0,0,0.1)', 
                                  '--tw-bg-opacity': 0.1 
                                }}
                              />
                            </div>
                          );
                        })
                      ) : (
                        <div className="text-center py-10 text-gray-500">
                          <p>{t('No data available')}</p>
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>
                
                {/* Task Difficulty Distribution */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <Card className="p-6 h-full">
                    <div className="mb-6">  
                      <h2 className="text-xl font-semibold">{t('Task Difficulty')}</h2>
                      <p className="text-sm text-gray-500">{t('Distribution by level')}</p>
                    </div>
                    
                    {/* Task Difficulty Chart (Simplified) */}
                    <div className="flex flex-col space-y-6">
                      {dashboardData?.skillsAnalytics?.taskDifficulty ? (
                        <div className="grid grid-cols-3 gap-4">
                          {dashboardData.skillsAnalytics.taskDifficulty.map((item, index) => (
                            <div key={index} className="text-center">
                              <div 
                                className="mx-auto w-24 h-24 rounded-full flex items-center justify-center" 
                                style={{ 
                                  backgroundColor: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'][index % 5],
                                  opacity: 0.8
                                }}
                              >
                                <span className="text-white text-xl font-bold">{item.percentage}%</span>
                              </div>
                              <div className="mt-2 font-medium">{item.level}</div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-10 text-gray-500">
                          <p>{t('No data available')}</p>
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>
            
            {/* Geography Tab Content */}
            <TabsContent value="geography" className="space-y-6">
              {/* User Distribution by Location */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">  
                    <div>
                      <h2 className="text-xl font-semibold">{t('User Distribution')}</h2>
                      <p className="text-sm text-gray-500">{t('By city')}</p>
                    </div>
                  </div>
                  
                  {/* User Location Chart (Simplified) */}
                  <div className="space-y-6">
                    {dashboardData?.geographyAnalytics?.locationDistribution ? (
                      dashboardData.geographyAnalytics.locationDistribution.map((item, index) => {
                        const maxStudents = Math.max(
                          ...dashboardData.geographyAnalytics.locationDistribution.map(d => d.students)
                        );
                        const maxCompanies = Math.max(
                          ...dashboardData.geographyAnalytics.locationDistribution.map(d => d.companies)
                        );
                        
                        return (
                          <div key={index} className="space-y-3">
                            <div className="flex justify-between items-center">
                              <h3 className="text-lg font-semibold">{item.city}</h3>
                            </div>
                            
                            <div className="space-y-3">
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span className="flex items-center">
                                    <HiOutlineUserGroup className="mr-2 h-4 w-4" />
                                    {t('Students')}
                                  </span>
                                  <span className="font-medium">{formatNumber(item.students)}</span>
                                </div>
                                <Progress 
                                  value={(item.students / maxStudents) * 100} 
                                  className="h-2 bg-indigo-100" 
                                />
                              </div>
                              
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span className="flex items-center">
                                    <HiOutlineOfficeBuilding className="mr-2 h-4 w-4" />
                                    {t('Companies')}
                                  </span>
                                  <span className="font-medium">{formatNumber(item.companies)}</span>
                                </div>
                                <Progress 
                                  value={(item.companies / maxCompanies) * 100} 
                                  className="h-2 bg-green-100" 
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-center py-10 text-gray-500">
                        <p>{t('No data available')}</p>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
              
              {/* Student Distribution by Year & University */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Student Distribution by Year */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <Card className="p-6 h-full">
                    <div className="mb-6">  
                      <h2 className="text-xl font-semibold">{t('Student Distribution')}</h2>
                      <p className="text-sm text-gray-500">{t('By academic year')}</p>
                    </div>
                    
                    {/* Year Distribution Chart (Simplified) */}
                    <div className="grid grid-cols-2 gap-4">
                      {dashboardData?.geographyAnalytics?.yearDistribution ? (
                        dashboardData.geographyAnalytics.yearDistribution.map((item, index) => {
                          const totalStudents = dashboardData.geographyAnalytics.yearDistribution.reduce(
                            (sum, curr) => sum + curr.count, 0
                          );
                          const percentage = Math.round((item.count / totalStudents) * 100);
                          
                          return (
                            <Card key={index} className="p-4 border border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center">
                              <div className="text-center space-y-2">
                                <h3 className="text-lg font-bold">{item.year}</h3>
                                <div className="text-sm text-gray-500">Year</div>
                                <div className="text-2xl font-bold text-primary">{item.count}</div>
                                <Badge>{percentage}%</Badge>
                                <Progress value={percentage} className="h-2 w-24 mt-2" />
                              </div>
                            </Card>
                          );
                        })
                      ) : (
                        <div className="col-span-2 text-center py-10 text-gray-500">
                          <p>{t('No data available')}</p>
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>
                
                {/* University Distribution */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <Card className="p-6 h-full">
                    <div className="mb-6">  
                      <h2 className="text-xl font-semibold">{t('University Distribution')}</h2>
                      <p className="text-sm text-gray-500">{t('Top universities by student count')}</p>
                    </div>
                    
                    {/* University Distribution Chart (Simplified) */}
                    <div className="space-y-4">
                      {dashboardData?.geographyAnalytics?.universityDistribution ? (
                        dashboardData.geographyAnalytics.universityDistribution.map((item, index) => {
                          const maxCount = Math.max(
                            ...dashboardData.geographyAnalytics.universityDistribution.map(d => d.count)
                          );
                          const percentage = (item.count / maxCount) * 100;
                          
                          return (
                            <div key={index} className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="font-medium">{item.university}</span>
                                <span>{formatNumber(item.count)} {t('students')}</span>
                              </div>
                              <Progress 
                                value={percentage} 
                                className="h-2.5" 
                              />
                            </div>
                          );
                        })
                      ) : (
                        <div className="text-center py-10 text-gray-500">
                          <p>{t('No data available')}</p>
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}
