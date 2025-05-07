"use client";

import React, { useState, useEffect, use } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/lib/language/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/components/toaster';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/components/card';
import { Button } from '@/components/ui/components/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/components/avatar';
import { 
  HiUsers, 
  HiClipboardList, 
  HiHome, 
  HiOutlineMenuAlt3, 
  HiX, 
  HiOfficeBuilding,
  HiOutlineChartBar,
  HiOutlineCog,
  HiShieldCheck,
  HiOutlineDatabase
} from 'react-icons/hi';

export default function AdminDashboardLayout({ children, params }) {
  // Unwrap params using React.use()
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();
  const { toast } = useToast();
  const { dictionary } = useLanguage();
  const { t } = dictionary;
  
  useEffect(() => {
    // This ensures we're on the client side
    setIsClient(true);
    
    // Simulate loading admin data
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, []);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const sidebarItems = [
    {
      name: t('adminDashboard'),
      icon: <HiHome className="h-5 w-5" />,
      path: `/admin/dashboard/${id}`,
    },
    {
      name: t('manageCompanies'),
      icon: <HiOfficeBuilding className="h-5 w-5" />,
      path: `/admin/dashboard/${id}/manage-companies`,
    },
    {
      name: t('allTasks'),
      icon: <HiClipboardList className="h-5 w-5" />,
      path: `/admin/dashboard/${id}/all-tasks`,
    },
    {
      name: t('allStudents'),
      icon: <HiUsers className="h-5 w-5" />,
      path: `/admin/dashboard/${id}/all-students`,
    },
    {
      name: t('analytics'),
      icon: <HiOutlineChartBar className="h-5 w-5" />,
      path: `/admin/dashboard/${id}/analytics`,
    },
  ];
  
  // Only render full content on client-side
  if (!isClient) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button 
          variant="ghost" 
          size="icon" 
          className="bg-white dark:bg-gray-800 shadow-md rounded-full"
          onClick={toggleSidebar}
        >
          {sidebarOpen ? (
            <HiX className="h-6 w-6" />
          ) : (
            <HiOutlineMenuAlt3 className="h-6 w-6" />
          )}
        </Button>
      </div>
      
      {/* Sidebar */}
      <div className="flex h-screen">
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed lg:static inset-y-0 left-0 z-40 w-72 bg-white dark:bg-gray-800 shadow-lg overflow-y-auto"
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-8">
                  <Link href={`/admin/dashboard/${id}`} className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10 border-2 border-purple-500">
                      <AvatarImage src="/admin-avatar.png" alt="Admin" />
                      <AvatarFallback className="bg-purple-100 text-purple-700">
                        <HiShieldCheck className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h1 className="font-bold text-xl">{t('appName')} {t('adminDashboard')}</h1>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t('appName')} Admin</p>
                    </div>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="lg:hidden" 
                    onClick={toggleSidebar}
                  >
                    <HiX className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="space-y-1">
                  {sidebarItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                      <Link href={item.path} key={item.path}>
                        <Button
                          variant={isActive ? "default" : "ghost"}
                          className={`w-full justify-start items-center h-12 px-3 ${
                            isActive 
                              ? "bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400" 
                              : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/30"
                          }`}
                        >
                          <span className="w-6 mr-3 text-center">{item.icon}</span>
                          {item.name}
                        </Button>
                      </Link>
                    );
                  })}
                </div>
                
                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'lg:ml-72' : ''}`}>
          <main className="p-4 md:p-8 max-w-7xl mx-auto">
            {/* Overlay when sidebar is open on mobile */}
            {sidebarOpen && (
              <div 
                className="fixed inset-0 bg-black/50 z-30 lg:hidden" 
                onClick={toggleSidebar}
              />
            )}
            
            {/* Mobile header */}
            <div className="lg:hidden mb-6 flex items-center">
              <div className="flex-1 ml-12">
                <h1 className="text-xl font-bold">{t('appName')} {t('adminDashboard')}</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t('appName')} Admin</p>
              </div>
            </div>
            
            {/* Page content */}
            <div className="mt-4">
              {children}
            </div>
          </main>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
