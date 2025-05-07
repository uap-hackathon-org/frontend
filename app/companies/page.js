"use client"
import { useLanguage } from '@/lib/language/LanguageContext'
import { Quicksand, Poppins, Lato } from 'next/font/google'
import { Toaster } from '@/components/ui/components/toaster'
import { useToast } from '@/hooks/use-toast'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/components/card'
import { Input } from '@/components/ui/components/input'
import { Badge } from '@/components/ui/components/badge'
import { Button } from '@/components/ui/components/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/components/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/components/avatar'
import Link from 'next/link'
import { FaBuilding, FaSearch, FaFilter, FaExternalLinkAlt, FaMapMarkerAlt, FaUserTie, FaCalendarAlt } from 'react-icons/fa'
import api from '@/axiosInstance'

// Import mock data (will be replaced with API calls later)
import { companies as mockCompanies } from '@/lib/mock'

const poppins = Lato({ subsets: ['latin'], weight: '700' })
const playfair = Quicksand({ subsets: ['latin'], weight: '400' })

export default function CompaniesPage() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [sizeFilter, setSizeFilter] = useState('all');
  
  // Get unique industries for filter
  const allIndustries = companies.flatMap(company => company.industries || []);
  const uniqueIndustries = [...new Set(allIndustries)];
  
  // Filter function
  const filterCompanies = () => {
    let filtered = [...companies];
    
    // Apply search term filter
    if (searchTerm) {
      filtered = filtered.filter(company => 
        (company?.company_name?.toLowerCase()?.includes(searchTerm.toLowerCase()) ?? false) ||
        (company?.description?.toLowerCase()?.includes(searchTerm.toLowerCase()) ?? false) ||
        (company?.industries?.some(industry => 
          industry?.toLowerCase()?.includes(searchTerm.toLowerCase()) ?? false
        ) ?? false)
      );
    }
    
    // Apply industry filter
    if (industryFilter && industryFilter !== 'all') {
      filtered = filtered.filter(company => 
        company?.industries?.includes(industryFilter) ?? false
      );
    }
    
    // Apply size filter
    if (sizeFilter && sizeFilter !== 'all') {
      filtered = filtered.filter(company => company?.company_size === sizeFilter);
    }
    
    setFilteredCompanies(filtered);
  };
  
  // Effect for filtering
  useEffect(() => {
    filterCompanies();
  }, [searchTerm, industryFilter, sizeFilter, companies]);

  // Fetch companies data
  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        // Call the company list API
        const response = await api.get('/company/list', {
          params: {
            skip: 0,
            limit: 10
          }
        });
        
        // Check if we have data
        if (response?.data && Array.isArray(response.data) && response.data.length > 0) {
          // Process API data and fill in missing values with defaults
          const processedData = response.data.map(company => ({
            id: company?.id ?? Math.random().toString(36).substr(2, 9),
            company_name: company?.company_name ?? 'Unnamed Company',
            description: company?.description ?? 'No description available',
            website: company?.website ?? null,
            company_size: company?.company_size ?? 'Unknown',
            founded_year: company?.founded_year ?? 'Unknown',
            hiring_for: company?.hiring_for ?? [],
            verification_status: company?.verification_status ?? false,
            logo_url: company?.logo_url ?? null,
            industries: company?.industries?.length ? company.industries : ['Technology']
          }));
          
          setCompanies(processedData);
        } else {
          // Fallback to mock data if API returns invalid or empty data
          console.warn('Invalid or empty data from API, using mock data instead');
          setCompanies(mockCompanies);
        }
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        toast({
          title: "Error",
          description: "Failed to load companies data. Please try again later.",
          variant: "destructive"
        });
      }
    };
    
    fetchCompanies();
  }, [toast]);

  return (
    <main className={`${playfair.className} mt-4 w-full overflow-hidden scrollbar-hidden min-h-screen bg-main-bg dark:bg-menu-secondary`}>
      <Toaster />
      <section className='h-full w-[90%] mx-auto p-8 bg-light-blue dark:bg-slate-900 rounded-xl'>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='mb-8'
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className={`${poppins.className} text-3xl font-bold text-text-primary mb-2`}>
                {t('companies')}
              </h1>
              <p className='text-gray-600 dark:text-gray-300'>
                Connect with industry-leading companies looking for talent like you
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Input
                  placeholder="Search companies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full md:w-[250px]"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <div className="flex gap-2">
                <Select value={industryFilter} onValueChange={setIndustryFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Industries</SelectItem>
                    {uniqueIndustries.map((industry, index) => (
                      <SelectItem key={index} value={industry}>{industry}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={sizeFilter} onValueChange={setSizeFilter}>
                  <SelectTrigger className="w-full sm:w-[120px]">
                    <SelectValue placeholder="Size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Size</SelectItem>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          {/* Loading and Error States */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-pulse">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="bg-white dark:bg-dark-2 rounded-xl p-6 h-64"></div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <div className="text-red-500 mb-4 text-xl"><FaBuilding className="inline-block mr-2" /> Error loading companies</div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>Try Again</Button>
            </div>
          ) : (
            <>
              {/* Results summary */}
              <div className="flex items-center mb-6">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Showing {filteredCompanies.length} {filteredCompanies.length === 1 ? 'company' : 'companies'}
                  {industryFilter && industryFilter !== 'all' && <span> in <Badge className="ml-1">{industryFilter}</Badge></span>}
                  {sizeFilter && sizeFilter !== 'all' && <span> of <Badge className="ml-1">{sizeFilter} size</Badge></span>}
                </div>
                {(industryFilter !== 'all' || sizeFilter !== 'all' || searchTerm) && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="ml-4 text-xs"
                    onClick={() => {
                      setSearchTerm('');
                      setIndustryFilter('all');
                      setSizeFilter('all');
                    }}
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
              
              {/* Company Cards */}
              {filteredCompanies.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-500 mb-4 text-xl"><FaBuilding className="inline-block mr-2" /> No companies found</div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">Try adjusting your search or filter criteria</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredCompanies.map((company) => (
                    <motion.div 
                      key={company.id} 
                      whileHover={{ y: -5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Card className="h-full bg-white dark:bg-dark-2 border-none overflow-hidden">
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-12 w-12 border border-gray-200 dark:border-gray-700">
                                <AvatarImage src={company.logo || '/profile.png'} alt={company.company_name} />
                                <AvatarFallback>{company.company_name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <CardTitle className="text-xl">{company.company_name}</CardTitle>
                                <div className="flex items-center mt-1 text-sm text-gray-600 dark:text-gray-400">
                                  <FaMapMarkerAlt className="mr-1" /> {company.location}
                                </div>
                              </div>
                            </div>
                            
                            {company.match_score && (
                              <Badge className={`${company.match_score > 80 ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' : 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400'}`}>
                                {company.match_score}% Match
                              </Badge>
                            )}
                          </div>
                        </CardHeader>
                        
                        <CardContent className="pb-2">
                          <CardDescription className="line-clamp-3 mb-3">
                            {company?.description || 'No description available'}
                          </CardDescription>
                          
                          <div className="flex flex-wrap gap-1 mb-4">
                            {company?.industries?.length > 0 ? (
                              company.industries.map((industry, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {industry}
                                </Badge>
                              ))
                            ) : (
                              <Badge variant="outline" className="text-xs">Technology</Badge>
                            )}
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center text-sm">
                              <FaUserTie className="mr-2 text-gray-500" />
                              <span className="text-gray-700 dark:text-gray-300 font-medium">Size:</span>
                              <span className="ml-2 text-gray-600 dark:text-gray-400">
                                {company?.company_size === 'small' ? 'Small (< 50 employees)' : 
                                 company?.company_size === 'medium' ? 'Medium (50-250 employees)' : 
                                 company?.company_size === 'large' ? 'Large (250+ employees)' : 'Unknown'}
                              </span>
                            </div>
                            <div className="flex items-center text-sm">
                              <FaCalendarAlt className="mr-2 text-gray-500" />
                              <span className="text-gray-700 dark:text-gray-300 font-medium">Founded:</span>
                              <span className="ml-2 text-gray-600 dark:text-gray-400">{company?.founded_year || 'Unknown'}</span>
                            </div>
                          </div>
                        </CardContent>
                        
                        <CardFooter className="pt-2">
                          <div className="w-full flex flex-col sm:flex-row gap-2 justify-between items-start sm:items-center">
                            <div>
                              {company?.hiring_for?.length > 0 && (
                                <div className="text-xs text-gray-600 dark:text-gray-400">
                                  <span className="font-medium">Hiring for:</span> {company.hiring_for.join(', ')}
                                </div>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <div className="font-medium flex-grow">
                                {company?.company_name || 'Unnamed Company'}
                                {company?.verification_status && (
                                  <span className="ml-2 text-xs text-blue-500">✓ Verified</span>
                                )}
                                {company?.match_score && (
                                  <Badge variant="secondary" className="ml-3 text-xs">
                                    {company.match_score}% Match
                                  </Badge>
                                )}
                              </div>
                              {company?.website && (
                                <a 
                                  href={company.website} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center text-xs text-primary hover:underline"
                                >
                                  Website <FaExternalLinkAlt className="ml-1" />
                                </a>
                              )}
                              <Link href={`/company/${company?.id}`}>
                                <Button size="sm" variant="primary">
                                  View Details
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          )}
        </motion.div>
      </section>
    </main>
  )
}
