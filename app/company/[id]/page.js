"use client";

import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/language/LanguageContext';
import { Quicksand, Poppins, Lato } from 'next/font/google';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/components/card';
import { Badge } from '@/components/ui/components/badge';
import { Button } from '@/components/ui/components/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/components/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/components/tabs';
import Link from 'next/link';
import { FaBuilding, FaGlobe, FaMapMarkerAlt, FaUserTie, FaCalendarAlt, FaChevronLeft, FaExternalLinkAlt } from 'react-icons/fa';
import api from '@/axiosInstance';
import { companies as mockCompanies } from '@/lib/mock';

const poppins = Lato({ subsets: ['latin'], weight: '700' });
const playfair = Quicksand({ subsets: ['latin'], weight: '400' });

export default function CompanyDetailsPage({ params }) {
  const { id } = params;
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Fetch company data
  useEffect(() => {
    const fetchCompanyDetails = async () => {
      setLoading(true);
      try {
        // Call the company API endpoint with the specific ID
        const response = await api.get(`/company/${id}`);
        
        // Check if we have valid data
        if (response?.data) {
          // Process API data and add fallbacks for null values
          const processedData = {
            id: response.data?.id ?? id,
            company_name: response.data?.company_name ?? 'Unnamed Company',
            description: response.data?.description ?? 'No description available',
            website: response.data?.website ?? null,
            company_size: response.data?.company_size ?? 'Unknown',
            founded_year: response.data?.founded_year ?? 'Unknown',
            hiring_for: Array.isArray(response.data?.hiring_for) ? response.data.hiring_for : [],
            verification_status: response.data?.verification_status ?? false,
            logo_url: response.data?.logo_url ?? null,
            industries: Array.isArray(response.data?.industries) && response.data.industries.length > 0 
              ? response.data.industries 
              : ['Technology'],
            location: response.data?.location ?? 'Remote',
            user_id: response.data?.user_id ?? 0,
            employee_count: response.data?.employee_count ?? null,
            social_links: response.data?.social_links ?? {},
            established: response.data?.established ?? response.data?.founded_year ?? null,
            contact_email: response.data?.contact_email ?? null,
            contact_phone: response.data?.contact_phone ?? null
          };
          
          setCompany(processedData);
          console.log('Fetched company details from API:', processedData);
        } else {
          // Fallback to mock data if API returns invalid data
          console.warn('Invalid data format from API, using mock data instead');
          const mockCompany = mockCompanies.find(company => company.id.toString() === id.toString());
          if (mockCompany) {
            setCompany(mockCompany);
          } else {
            throw new Error('Company not found');
          }
        }
      } catch (err) {
        console.error('Error fetching company details:', err);
        setError(err.message);
        
        // Try to find in mock data as fallback
        const mockCompany = mockCompanies.find(company => company.id.toString() === id.toString());
        if (mockCompany) {
          setCompany(mockCompany);
        } else {
          toast({
            title: "Error",
            description: "Company not found. Please try again later.",
            variant: "destructive"
          });
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchCompanyDetails();
  }, [id, toast]);

  // Loading state
  if (loading) {
    return (
      <main className={`${playfair.className} mt-4 w-full overflow-hidden scrollbar-hidden min-h-screen bg-main-bg dark:bg-menu-secondary`}>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <Link href="/companies" className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors">
              <FaChevronLeft className="mr-2" />
              {t('Back to Companies')}
            </Link>
          </div>
          
          {/* Header skeleton */}
          <div className="animate-pulse mb-8">
            <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-t-xl"></div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-b-xl">
              <div className="flex items-center">
                <div className="w-24 h-24 bg-gray-300 dark:bg-gray-600 rounded-full -mt-16 border-4 border-white dark:border-gray-800"></div>
                <div className="ml-6 flex-1">
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-1"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/5"></div>
                </div>
                <div className="flex gap-2">
                  <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
          
          {/* Content skeleton */}
          <div className="animate-pulse">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <Link href="/companies" className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors">
            <FaChevronLeft className="mr-2" />
            {t('Back to Companies')}
          </Link>
        </div>
        <Card className="border-red-300 dark:border-red-700">
          <CardHeader>
            <CardTitle className="text-red-600 dark:text-red-400">{t('Error Loading Company')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => window.location.reload()} variant="outline">
              {t('Try Again')}
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // If no company data
  if (!company) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <Link href="/companies" className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors">
            <FaChevronLeft className="mr-2" />
            {t('Back to Companies')}
          </Link>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>{t('Company Not Found')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{t('The company you are looking for does not exist or has been removed.')}</p>
          </CardContent>
          <CardFooter>
            <Link href="/companies">
              <Button variant="default">{t('Browse Companies')}</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <main className={`${playfair.className} mt-4 w-full overflow-hidden scrollbar-hidden min-h-screen bg-main-bg dark:bg-menu-secondary`}>
      <div className="container mx-auto px-4 py-8">
        {/* Back button */}
        <div className="flex justify-between items-center mb-6">
          <Link href="/companies" className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors">
            <FaChevronLeft className="mr-2" />
            {t('Back to Companies')}
          </Link>
        </div>
        
        {/* Company header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Card className="overflow-hidden border-none bg-white dark:bg-dark-2 shadow-md">
            <div className="h-40 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
              {/* Optional banner overlay effect */}
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            </div>
            <CardContent className="relative px-6 pb-6">
              <div className="flex flex-col md:flex-row md:items-end -mt-16 mb-6">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <Avatar className="h-32 w-32 border-4 border-white dark:border-gray-800 shadow-lg">
                    <AvatarImage src={company.logo_url || '/company-logo.png'} alt={company.company_name} />
                    <AvatarFallback className="text-4xl bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                      {company.company_name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </motion.div>
                
                <div className="mt-4 md:mt-0 md:ml-6 md:mb-2">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className="flex flex-wrap items-center gap-2"
                  >
                    <h1 className={`${poppins.className} text-2xl md:text-3xl font-bold text-gray-900 dark:text-white`}>
                      {company.company_name}
                    </h1>
                    {company.verification_status && (
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Verified
                      </Badge>
                    )}
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                    className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-sm text-gray-600 dark:text-gray-400"
                  >
                    {company.location && (
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="mr-1.5 text-indigo-500" />
                        {company.location}
                      </div>
                    )}
                    {(company.founded_year || company.established) && (
                      <div className="flex items-center">
                        <FaCalendarAlt className="mr-1.5 text-indigo-500" />
                        Est. {company.established || company.founded_year}
                      </div>
                    )}
                    {company.company_size && (
                      <div className="flex items-center">
                        <FaUserTie className="mr-1.5 text-indigo-500" />
                        {company.company_size === 'small' ? 'Small (< 50 employees)' : 
                         company.company_size === 'medium' ? 'Medium (50-250 employees)' : 
                         company.company_size === 'large' ? 'Large (250+ employees)' : company.company_size}
                      </div>
                    )}
                  </motion.div>
                </div>
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  className="mt-4 md:mt-0 md:ml-auto flex flex-wrap gap-2"
                >
                  {company.website && (
                    <a 
                      href={company.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <FaGlobe className="mr-2 text-indigo-600" />
                      Visit Website
                    </a>
                  )}
                  <Button className="bg-indigo-600 hover:bg-indigo-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Contact
                  </Button>
                </motion.div>
              </div>
              
              {/* Industries */}
              {company.industries && company.industries.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                  className="flex flex-wrap gap-2 mb-4"
                >
                  {company.industries.map((industry, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-300 dark:border-indigo-800"
                    >
                      {industry}
                    </Badge>
                  ))}
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Company content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="border-none bg-white dark:bg-dark-2 shadow-md overflow-hidden">
            <CardContent className="p-0">
              <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3 rounded-none border-b dark:border-gray-700">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="jobs">Job Openings</TabsTrigger>
                  <TabsTrigger value="events">Events</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="p-6 space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">About {company.company_name}</h2>
                    <div className="prose dark:prose-invert max-w-none">
                      <p className="whitespace-pre-line">{company.description}</p>
                    </div>
                  </div>
                  
                  {company.hiring_for && company.hiring_for.length > 0 && (
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Currently Hiring For</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {company.hiring_for.map((position, index) => (
                          <Card key={index} className="overflow-hidden border border-gray-200 dark:border-gray-700">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">{position.title || position}</CardTitle>
                              {position.department && (
                                <CardDescription>{position.department}</CardDescription>
                              )}
                            </CardHeader>
                            <CardContent className="pt-0">
                              {position.description && (
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{position.description}</p>
                              )}
                              {position.skills && position.skills.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {position.skills.map((skill, skillIndex) => (
                                    <Badge key={skillIndex} variant="outline" className="text-xs">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </CardContent>
                            <CardFooter className="border-t pt-3">
                              <Button size="sm" variant="outline" className="w-full">
                                View Details
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="jobs" className="p-6">
                  <div className="text-center py-12">
                    <FaBuilding className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Job Openings Available</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      This company hasn't posted any job openings yet.
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="events" className="p-6">
                  <div className="text-center py-12">
                    <FaCalendarAlt className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Upcoming Events</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      This company hasn't scheduled any events yet.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </main>
  );
}