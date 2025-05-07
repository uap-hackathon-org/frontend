"use client";

import React, { useState, useEffect, use } from 'react';
import { Card } from '@/components/ui/components/card';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { HiOutlineVideoCamera } from 'react-icons/hi';

export default function VirtualSessions({ params }) {
  // Unwrap params using React.use()
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  const { toast } = useToast();
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
          <p className="text-lg text-gray-600 dark:text-gray-300">Loading virtual sessions...</p>
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
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full">
            <HiOutlineVideoCamera className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h1 className="text-3xl font-bold">Virtual Sessions</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Schedule and manage workshops, webinars, and mentoring sessions with students.
        </p>
      </motion.div>
      
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Your Virtual Sessions</h2>
        <p>Virtual sessions management will be implemented here.</p>
      </Card>
    </div>
  );
}
