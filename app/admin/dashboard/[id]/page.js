"use client";

import React, { useState, useEffect, use } from 'react';
import { Card } from '@/components/ui/components/card';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/language/LanguageContext';
import { 
  HiOutlineOfficeBuilding, 
  HiOutlineClipboardList, 
  HiOutlineUserGroup, 
  HiOutlineChartBar 
} from 'react-icons/hi';

export default function AdminDashboard({ params }) {
  // Unwrap params using React.use()
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  
  const { toast } = useToast();
  const { dictionary } = useLanguage();
  const { t } = dictionary;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This ensures we're now on the client side
    setIsClient(true);
  }, []);
  
  // Only render the full content on the client side
  if (!isClient) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300">Loading...</p>
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
        <h1 className="text-3xl font-bold mb-2">{t('adminDashboard')}</h1>
        <p className="text-gray-600 dark:text-gray-400">
          {t('appName')} {t('adminDashboard')} - Manage platform data, users, and analytics
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <Card className="p-6 border-l-4 border-blue-500">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('companies')}</p>
              <h3 className="text-2xl font-bold mt-1">28</h3>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg">
              <HiOutlineOfficeBuilding className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </Card>
        
        <Card className="p-6 border-l-4 border-amber-500">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('microTasks')}</p>
              <h3 className="text-2xl font-bold mt-1">194</h3>
            </div>
            <div className="bg-amber-100 dark:bg-amber-900/20 p-3 rounded-lg">
              <HiOutlineClipboardList className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
        </Card>
        
        <Card className="p-6 border-l-4 border-green-500">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('allStudents')}</p>
              <h3 className="text-2xl font-bold mt-1">1,205</h3>
            </div>
            <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-lg">
              <HiOutlineUserGroup className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </Card>
        
        <Card className="p-6 border-l-4 border-purple-500">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('workshops')}</p>
              <h3 className="text-2xl font-bold mt-1">42</h3>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-lg">
              <HiOutlineChartBar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </Card>
      </div>
      
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">{t('adminDashboard')} {t('analytics')}</h2>
        <p>Dashboard analytics content will be implemented here.</p>
      </Card>
    </div>
  );
}
