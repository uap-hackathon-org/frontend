"use client";

import React, { useState, useEffect, use } from 'react';
import { Card } from '@/components/ui/components/card';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { getMockCompanyById } from '@/lib/mock';
import api from '@/axiosInstance';

export default function CompanyDashboard({ params }) {
  // Unwrap params using React.use()
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  const { toast } = useToast();
  const [company, setCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchCompanyData = async () => {
      setIsLoading(true);
      try {
        // Try to fetch from the real API first
        const response = await api.get(`/api/v1/company/${id}`, {
          headers: {
            "ngrok-skip-browser-warning": "69420"
          }
        });
        
        if (response?.data) {
          // Process data and add fallbacks for null values
          const processedData = {
            id: response.data?.id ?? id,
            company_name: response.data?.company_name ?? 'Unnamed Company',
            description: response.data?.description ?? 'No description available',
            website: response.data?.website ?? null,
            company_size: response.data?.company_size ?? 'Unknown',
            founded_year: response.data?.founded_year ?? 'Unknown',
            hiring_for: response.data?.hiring_for ?? [],
            verification_status: response.data?.verification_status ?? false,
            logo_url: response.data?.logo_url ?? null,
            industries: response.data?.industries?.length ? response.data.industries : ['Technology']
          };
          setCompany(processedData);
        } else {
          // Fallback to mock data if API returns invalid response
          console.warn('Invalid API response, falling back to mock data');
          const mockData = getMockCompanyById(id);
          setCompany(mockData);
        }
      } catch (error) {
        console.error('Error loading company data:', error);
        // Fallback to mock data on error
        try {
          const mockData = getMockCompanyById(id);
          setCompany(mockData);
          toast({
            title: "Using Mock Data",
            description: "Couldn't connect to the API. Using sample data instead.",
            variant: "warning"
          });
        } catch (mockError) {
          toast({
            title: "Error",
            description: "Failed to load company data.",
            variant: "destructive"
          });
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCompanyData();
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
        
        {company ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Company Information</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Name:</span> {company?.company_name || 'Unnamed Company'}</p>
                  <p><span className="font-medium">Size:</span> {company?.company_size || 'Unknown'}</p>
                  <p><span className="font-medium">Founded:</span> {company?.founded_year || 'Unknown'}</p>
                  <p><span className="font-medium">Industries:</span> {company?.industries?.join(', ') || 'Technology'}</p>
                  {company?.website && (
                    <p>
                      <span className="font-medium">Website:</span>{' '}
                      <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        {company.website}
                      </a>
                    </p>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Status</h3>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Verification:</span>{' '}
                    {company?.verification_status ? (
                      <span className="text-green-500">Verified ✓</span>
                    ) : (
                      <span className="text-amber-500">Pending Verification</span>
                    )}
                  </p>
                  {company?.hiring_for?.length > 0 && (
                    <div>
                      <span className="font-medium">Hiring for:</span>
                      <ul className="list-disc list-inside ml-2 mt-1">
                        {company.hiring_for.map((position, index) => (
                          <li key={index}>{position}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-2">Description</h3>
              <p className="text-gray-700 dark:text-gray-300">{company?.description || 'No description available'}</p>
            </div>
          </div>
        ) : (
          <p>No company information available.</p>
        )}
      </Card>
    </div>
  );
}
