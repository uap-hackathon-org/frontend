"use client";

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/components/card';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/language/LanguageContext';
import { HiOfficeBuilding } from 'react-icons/hi';

export default function ManageCompanies({ params }) {
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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p className="text-lg text-gray-600 dark:text-gray-300">Loading companies...</p>
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
          <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
            <HiOfficeBuilding className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold">{t('manageCompanies')}</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          View, approve, edit, and manage all registered companies on the platform.
        </p>
      </motion.div>
      
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Companies Management Dashboard</h2>
        <p>Company management functionality will be implemented here.</p>
      </Card>
    </div>
  );
}
