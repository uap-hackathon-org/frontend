"use client";

import React, { useState, useEffect, use } from 'react';
import { Card } from '@/components/ui/components/card';
import { Button } from '@/components/ui/components/button';
import { Badge } from '@/components/ui/components/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/components/tabs';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/language/LanguageContext';
import { getMockCompanyById } from '@/lib/mock';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { HiOutlineUsers, HiOutlineClipboardCheck, HiOutlineStar, HiOutlineAcademicCap, HiOutlineClock, HiOutlineChartBar, HiOutlineOfficeBuilding, HiOutlineCheckCircle, HiOutlineViewGrid } from 'react-icons/hi';

// Mock data for charts
const taskCompletionData = [
  { month: 'Jan', completed: 12, pending: 5 },
  { month: 'Feb', completed: 19, pending: 8 },
  { month: 'Mar', completed: 15, pending: 6 },
  { month: 'Apr', completed: 25, pending: 10 },
  { month: 'May', completed: 32, pending: 5 },
  { month: 'Jun', completed: 40, pending: 7 },
];

const studentEngagementData = [
  { name: 'Week 1', submissions: 14, feedback: 8, applications: 22 },
  { name: 'Week 2', submissions: 18, feedback: 12, applications: 25 },
  { name: 'Week 3', submissions: 24, feedback: 18, applications: 30 },
  { name: 'Week 4', submissions: 32, feedback: 22, applications: 42 },
];

const skillDistributionData = [
  { name: 'JavaScript', value: 400, color: '#8884d8' },
  { name: 'Python', value: 300, color: '#82ca9d' },
  { name: 'React', value: 300, color: '#ffc658' },
  { name: 'UI/UX', value: 200, color: '#ff8042' },
  { name: 'Data Science', value: 150, color: '#0088FE' },
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE'];

export default function CompanyDashboard({ params }) {
  // Create a client component wrapper
  return <ClientCompanyDashboard params={params} />;
}

// Client component that handles all the rendering and state
function ClientCompanyDashboard({ params }) {
  // Properly unwrap params with React.use() to avoid the warning
  const unwrappedParams = use(params);
  const { id } = unwrappedParams || {};
  
  const { toast } = useToast();
  const { t } = useLanguage();
  const [company, setCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTimespan, setActiveTimespan] = useState('week');
  const [mounted, setMounted] = useState(false);
  
  // First useEffect to handle mounting state
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Second useEffect to fetch data after mounting
  useEffect(() => {
    if (mounted) {
      try {
        const companyData = getMockCompanyById(id);
        setCompany(companyData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading company data:', error);
        setIsLoading(false);
      }
    }
  }, [id, mounted]);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300">Loading dashboard content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">{t('companyDashboard')}</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {company?.company_name || company?.name || t('companies')} Dashboard
            </p>
          </div>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <span className="text-sm text-gray-500 dark:text-gray-400">View data for:</span>
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              <Button 
                variant="ghost" 
                size="sm"
                className={`${activeTimespan === 'week' ? 'bg-white dark:bg-gray-700 shadow-sm' : ''} text-sm`}
                onClick={() => setActiveTimespan('week')}
              >
                Week
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className={`${activeTimespan === 'month' ? 'bg-white dark:bg-gray-700 shadow-sm' : ''} text-sm`}
                onClick={() => setActiveTimespan('month')}
              >
                Month
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className={`${activeTimespan === 'year' ? 'bg-white dark:bg-gray-700 shadow-sm' : ''} text-sm`}
                onClick={() => setActiveTimespan('year')}
              >
                Year
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="p-4 border-l-4 border-blue-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Tasks Posted</p>
                <h3 className="text-2xl font-bold mt-1">38</h3>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-green-500 font-medium">+12% </span>
                  <span className="text-xs text-gray-500 ml-1">from last {activeTimespan}</span>
                </div>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-lg">
                <HiOutlineClipboardCheck className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="p-4 border-l-4 border-orange-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Student Applications</p>
                <h3 className="text-2xl font-bold mt-1">156</h3>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-green-500 font-medium">+28% </span>
                  <span className="text-xs text-gray-500 ml-1">from last {activeTimespan}</span>
                </div>
              </div>
              <div className="bg-orange-100 dark:bg-orange-900/20 p-2 rounded-lg">
                <HiOutlineUsers className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="p-4 border-l-4 border-green-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Task Completion Rate</p>
                <h3 className="text-2xl font-bold mt-1">84%</h3>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-green-500 font-medium">+5% </span>
                  <span className="text-xs text-gray-500 ml-1">from last {activeTimespan}</span>
                </div>
              </div>
              <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded-lg">
                <HiOutlineCheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="p-4 border-l-4 border-purple-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Average Student Rating</p>
                <h3 className="text-2xl font-bold mt-1">4.8</h3>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-green-500 font-medium">+0.3 </span>
                  <span className="text-xs text-gray-500 ml-1">from last {activeTimespan}</span>
                </div>
              </div>
              <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded-lg">
                <HiOutlineStar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Student Engagement</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-xs text-gray-500">Submissions</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-xs text-gray-500">Feedback</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
                  <span className="text-xs text-gray-500">Applications</span>
                </div>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={studentEngagementData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="submissions" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={40} />
                  <Bar dataKey="feedback" fill="#22c55e" radius={[4, 4, 0, 0]} maxBarSize={40} />
                  <Bar dataKey="applications" fill="#f97316" radius={[4, 4, 0, 0]} maxBarSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">Skills Distribution</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={skillDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {skillDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Task Completion Trends</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-xs text-gray-500">Completed</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600 mr-2"></div>
                <span className="text-xs text-gray-500">Pending</span>
              </div>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={taskCompletionData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="completed" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="pending" stroke="#d1d5db" strokeWidth={2} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-4 p-3 bg-blue-50 dark:bg-blue-900/10 rounded-lg">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                <HiOutlineClipboardCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">New task submission</h4>
                  <span className="text-xs text-gray-500">2 hours ago</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">John Doe submitted a solution for your "Frontend Dashboard Development" task</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-3 bg-green-50 dark:bg-green-900/10 rounded-lg">
              <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                <HiOutlineUsers className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">New task application</h4>
                  <span className="text-xs text-gray-500">5 hours ago</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">5 new students applied to your "Data Visualization with D3.js" task</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-3 bg-purple-50 dark:bg-purple-900/10 rounded-lg">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full">
                <HiOutlineStar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">Task rating received</h4>
                  <span className="text-xs text-gray-500">Yesterday</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Your "UI/UX Design Challenge" task received an average rating of 4.9/5 from 12 students</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
