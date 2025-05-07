"use client";

import React, { useState, useEffect, use } from 'react';
import { Card } from '@/components/ui/components/card';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { getMockCompanyById } from '@/lib/mock';

export default function CompanyDashboard({ params }) {
  // Unwrap params using React.use()
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  const { toast } = useToast();
  const [company, setCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Use setTimeout to ensure this only runs on client-side
    setTimeout(() => {
      try {
        const companyData = getMockCompanyById(id);
        setCompany(companyData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading company data:', error);
        setIsLoading(false);
      }
    }, 0);
  }, [id]);
  
  // We'll use this structure as a placeholder
  // You can expand this later with actual content and functionality
  
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
        <h1 className="text-3xl font-bold mb-2">Company Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome to {company?.company_name || company?.name || 'your company'} dashboard. Manage your tasks, sessions, and student connections.
        </p>
      </motion.div>
      
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Dashboard Overview</h2>
        <p>Dashboard content will be implemented here.</p>
      </Card>
    </div>
  );
}
