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
  HiUserGroup, 
  HiOutlineDocumentText, 
  HiOutlineVideoCamera,
  HiOutlineChatAlt,
  HiOutlineIdentification,
  HiOutlineClipboardCheck,
  HiPuzzle,
  HiCalendar
} from 'react-icons/hi';
import { 
  TbCertificate,
  TbCalendarEvent
} from 'react-icons/tb';
import { getMockCompanyById } from '@/lib/mock';

export default function CompanyDashboardLayout({ children, params }) {
  // Create a client layout wrapper
  return <ClientCompanyDashboardLayout params={params}>{children}</ClientCompanyDashboardLayout>;
}

// Client component that handles all the rendering and state
function ClientCompanyDashboardLayout({ children, params }) {
  // Properly unwrap params with React.use() to avoid the warning
  const unwrappedParams = use(params);
  const { id } = unwrappedParams || {};
  
  const [company, setCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { toast } = useToast();
  
  // First useEffect to handle mounting state
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Second useEffect to fetch data after mounting
  useEffect(() => {
    // Fetch company data only after mounting
    if (mounted) {
      try {
        const companyData = getMockCompanyById(id);
        setCompany(companyData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching company data:', error);
        toast({
          title: "Error",
          description: "Failed to load company data. Please try again.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    }
  }, [id, toast, mounted]);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const { t } = useLanguage()
  
  const sidebarItems = [
    {
      name: t('companyDashboard'),
      icon: <HiHome className="h-5 w-5" />,
      path: `/company/dashboard/${id}`,
    },
    {
      name: t('taskListings'),
      icon: <HiPuzzle className="h-5 w-5" />,
      path: `/company/dashboard/${id}/task-listings`,
    },
    {
      name: t('companyVirtualSessions'),
      icon: <HiOutlineVideoCamera className="h-5 w-5" />,
      path: `/company/dashboard/${id}/virtual-sessions`,
    },
    {
      name: t('workshopManagement'),
      icon: <TbCalendarEvent className="h-5 w-5" />,
      path: `/company/dashboard/${id}/workshops`,
    },
    {
      name: t('feedbackCertificates'),
      icon: <TbCertificate className="h-5 w-5" />,
      path: `/company/dashboard/${id}/feedback-certificates`,
    },
    {
      name: t('studentProfiles'),
      icon: <HiUsers className="h-5 w-5" />,
      path: `/company/dashboard/${id}/student-profiles`,
    },
    {
      name: t('postTask'),
      icon: <HiClipboardList className="h-5 w-5" />,
      path: `/company/dashboard/${id}/post-task`,
    },
  ];
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300">Loading company dashboard...</p>
        </div>
      </div>
    );
  }
  
  if (!company) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="max-w-md w-full p-6">
          <div className="text-center space-y-4">
            <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
              <HiX className="h-8 w-8 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Company Not Found</h2>
            <p className="text-gray-600 dark:text-gray-300">
              We couldn't find the company you're looking for. Please check the ID and try again.
            </p>
            <Button asChild className="mt-4">
              <Link href="/companies">Browse Companies</Link>
            </Button>
          </div>
        </Card>
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
            <motion.aside
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed lg:relative inset-y-0 left-0 z-40 w-72 bg-white dark:bg-gray-800 shadow-lg flex flex-col h-full"
            >
              {/* Company Logo and Name */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 border-2 border-indigo-500">
                    <AvatarImage src={company?.logo} alt={company?.name} />
                    <AvatarFallback className="bg-indigo-100 text-indigo-700">
                      {company?.name?.charAt(0)?.toUpperCase() || '?'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <h1 className="font-bold text-xl">{company?.name || t('companies')}</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('dashboard')}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="lg:hidden ml-auto" 
                    onClick={toggleSidebar}
                  >
                    <HiX className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              {/* Navigation Links */}
              <nav className="flex-1 overflow-y-auto p-4">
                <ul className="space-y-3">
                  {sidebarItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                      <li key={item.path}>
                        <Link 
                          href={item.path} 
                          className={`
                            flex items-center px-4 py-3 rounded-lg transition-colors duration-150
                            ${isActive 
                              ? "bg-indigo-100 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400" 
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/30"
                            }
                          `}
                        >
                          <span className="flex-shrink-0 w-6">{item.icon}</span>
                          <span className="ml-4 font-medium">{item.name}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
              
              {/* Footer */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  © 2023 TryShip
                </p>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
        
        <div className="flex-1 overflow-auto">
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
                <h1 className="text-xl font-bold">{company?.name || t('companies')}</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t('companyDashboard')}</p>
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
