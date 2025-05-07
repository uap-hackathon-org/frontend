"use client";

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/components/card';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/language/LanguageContext';
import { HiOutlineChartBar } from 'react-icons/hi';

export default function Analytics({ params }) {
  const { id } = params || {};
  
  const { toast } = useToast();
  const { t } = useLanguage()
  
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Create a consistent loading component that matches on both server and client
  const loadingComponent = (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
        <p className="text-lg text-gray-600 dark:text-gray-300">Loading analytics data...</p>
      </div>
    </div>
  );
  
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
          <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full">
            <HiOutlineChartBar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h1 className="text-3xl font-bold">{t('analytics')}</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          View platform performance metrics, user engagement, and business insights.
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">User Growth</h2>
          <div className="bg-gray-100 dark:bg-gray-800 h-64 rounded-lg flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">User growth chart will be displayed here</p>
          </div>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Task Completion Rate</h2>
          <div className="bg-gray-100 dark:bg-gray-800 h-64 rounded-lg flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">Task completion chart will be displayed here</p>
          </div>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Company Engagement</h2>
          <div className="bg-gray-100 dark:bg-gray-800 h-64 rounded-lg flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">Company engagement metrics will be displayed here</p>
          </div>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Platform Usage</h2>
          <div className="bg-gray-100 dark:bg-gray-800 h-64 rounded-lg flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">Platform usage statistics will be displayed here</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
