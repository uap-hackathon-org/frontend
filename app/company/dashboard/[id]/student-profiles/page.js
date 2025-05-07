"use client";

import React, { useState, useEffect, use } from 'react';
import { Card } from '@/components/ui/components/card';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { HiUsers } from 'react-icons/hi';
import { useLanguage } from '@/lib/language/LanguageContext';

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
  const { t } = useLanguage()
 
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Create a consistent loading component that matches on both server and client
  const loadingComponent = (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500 mx-auto"></div>
        <p className="text-lg text-gray-600 dark:text-gray-300">Loading student profiles...</p>
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
          <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full">
            <HiUsers className="h-6 w-6 text-amber-600 dark:text-amber-400" />
          </div>
          <h1 className="text-3xl font-bold">Student Profiles</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Browse and connect with talented students based on their skills and completed tasks.
        </p>
      </motion.div>
      
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Student Directory</h2>
        <p>Student profiles and filtering will be implemented here.</p>
      </Card>
    </div>
  );
}
