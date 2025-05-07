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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/components/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/components/avatar'
import Link from 'next/link'
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaUsers, FaLaptopCode, FaTrophy, FaSearch, FaFilter, FaTag } from 'react-icons/fa'
import api from '@/axiosInstance';

// Import mock data (will be replaced with API calls later)
import { events as mockEvents } from '@/lib/mock'

const poppins = Lato({ subsets: ['latin'], weight: '700' })
const playfair = Quicksand({ subsets: ['latin'], weight: '400' })

export default function WorkshopsPage() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [eventType, setEventType] = useState('all'); // 'all', 'workshop', 'hackathon'
  const [tagFilter, setTagFilter] = useState('all');
  
  // Get unique tags for filter
  const allTags = events.flatMap(event => event.tags || []);
  const uniqueTags = [...new Set(allTags)];
  
  // Filter function
  const filterEvents = () => {
    let filtered = [...events];
    
    // Apply search term filter
    if (searchTerm) {
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.organized_by_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (event.tags && event.tags.some(tag => 
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        ))
      );
    }
    
    // Apply event type filter
    if (eventType !== 'all') {
      filtered = filtered.filter(event => event.event_type === eventType);
    }
    
    // Apply tag filter
    if (tagFilter && tagFilter !== 'all') {
      filtered = filtered.filter(event => 
        event.tags && event.tags.includes(tagFilter)
      );
    }
    
    setFilteredEvents(filtered);
  };
  
  // Effect for filtering
  useEffect(() => {
    filterEvents();
  }, [searchTerm, eventType, tagFilter, events]);

  // Fetch events data
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        // When API is ready, replace this with fetch call
        // const response = await fetch('api/events', {
        //   headers: {
        //     "ngrok-skip-browser-warning": "69420"
        //   }
        // });
        // if (!response.ok) throw new Error('Failed to fetch events');
        // const data = await response.json();
        // setEvents(data);
        
        // //axios call
        // const response = await api.get('/api/events')
        
        // setEvents(response.data);
        // setLoading(false);


        // For now, use mock data
        setTimeout(() => {
          setEvents(mockEvents);
          setLoading(false);
        }, 800); // Simulate API delay
      } catch (err) {
        setError(err.message);
        setLoading(false);
        toast({
          title: "Error",
          description: "Failed to load workshops and hackathons data. Please try again later.",
          variant: "destructive"
        });
      }
    };
    
    fetchEvents();
  }, [toast]);

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Format time
  const formatTime = (dateString) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };

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
                {t('workshops')}
              </h1>
              <p className='text-gray-600 dark:text-gray-300'>
                Join workshops and hackathons to enhance your skills and build your network
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Input
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full md:w-[250px]"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <div className="flex gap-2">
                <Tabs defaultValue="all" value={eventType} onValueChange={setEventType} className="w-full sm:w-auto">
                  <TabsList className="grid grid-cols-3 w-full sm:w-[280px]">
                    <TabsTrigger value="all">All Events</TabsTrigger>
                    <TabsTrigger value="workshop">Workshops</TabsTrigger>
                    <TabsTrigger value="hackathon">Hackathons</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </div>
          
          {/* Tag Filter */}
          {uniqueTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge 
                variant={tagFilter === 'all' ? 'primary' : 'outline'} 
                className="cursor-pointer"
                onClick={() => setTagFilter('all')}
              >
                All Tags
              </Badge>
              {uniqueTags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant={tagFilter === tag ? 'primary' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => setTagFilter(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          
          {/* Loading and Error States */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="bg-white dark:bg-dark-2 rounded-xl p-6 h-64"></div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <div className="text-red-500 mb-4 text-xl"><FaLaptopCode className="inline-block mr-2" /> Error loading events</div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>Try Again</Button>
            </div>
          ) : (
            <>
              {/* Results summary */}
              <div className="flex items-center mb-6">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Showing {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'}
                  {eventType !== 'all' && <span> of type <Badge className="ml-1 capitalize">{eventType}</Badge></span>}
                  {tagFilter && tagFilter !== 'all' && <span> with tag <Badge className="ml-1">{tagFilter}</Badge></span>}
                </div>
                {(eventType !== 'all' || tagFilter || searchTerm) && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="ml-4 text-xs"
                    onClick={() => {
                      setSearchTerm('');
                      setEventType('all');
                      setTagFilter('all');
                    }}
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
              
              {/* Events Cards */}
              {filteredEvents.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-500 mb-4 text-xl"><FaLaptopCode className="inline-block mr-2" /> No events found</div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">Try adjusting your search or filter criteria</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredEvents.map((event) => {
                    const isHackathon = event.event_type === 'hackathon';
                    return (
                      <motion.div 
                        key={event.id} 
                        whileHover={{ y: -5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <Card className="h-full bg-white dark:bg-dark-2 border-none overflow-hidden">
                          <div className="relative">
                            <div 
                              className="h-32 w-full bg-cover bg-center" 
                              style={{ 
                                backgroundImage: `url(${event.cover_image || '/events/default-event.jpg'})`,
                                backgroundPosition: 'center' 
                              }}
                            ></div>
                            <Badge 
                              className={`absolute top-3 right-3 ${isHackathon ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'}`}
                            >
                              {isHackathon ? 'Hackathon' : 'Workshop'}
                            </Badge>
                          </div>
                          
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="text-xl">{event.title}</CardTitle>
                                <div className="flex items-center mt-1 text-sm text-gray-600 dark:text-gray-400">
                                  <span className="font-medium">By</span> 
                                  <span className="ml-1">{event.organized_by_name}</span>
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          
                          <CardContent className="pb-2">
                            <CardDescription className={`${isHackathon ? 'line-clamp-2' : 'line-clamp-3'} mb-3`}>
                              {event.description}
                            </CardDescription>
                            
                            <div className="flex flex-wrap gap-1 mb-4">
                              {event.tags && event.tags.map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex items-center text-sm">
                                <FaCalendarAlt className="mr-2 text-gray-500" />
                                <span className="text-gray-700 dark:text-gray-300 font-medium">{isHackathon ? 'Dates:' : 'Date:'}</span>
                                <span className="ml-2 text-gray-600 dark:text-gray-400">
                                  {isHackathon ? (
                                    `${formatDate(event.start_date)} - ${formatDate(event.end_date)}`
                                  ) : (
                                    formatDate(event.start_date)
                                  )}
                                </span>
                              </div>
                              <div className="flex items-center text-sm">
                                <FaClock className="mr-2 text-gray-500" />
                                <span className="text-gray-700 dark:text-gray-300 font-medium">Time:</span>
                                <span className="ml-2 text-gray-600 dark:text-gray-400">
                                  {isHackathon ? 'Multiple sessions' : `${formatTime(event.start_date)} - ${formatTime(event.end_date)}`}
                                </span>
                              </div>
                              <div className="flex items-center text-sm">
                                <FaMapMarkerAlt className="mr-2 text-gray-500" />
                                <span className="text-gray-700 dark:text-gray-300 font-medium">Location:</span>
                                <span className="ml-2 text-gray-600 dark:text-gray-400">{event.location}</span>
                              </div>
                              {isHackathon && event.prizes && (
                                <div className="flex items-start text-sm">
                                  <FaTrophy className="mr-2 text-gray-500 mt-1" />
                                  <div>
                                    <span className="text-gray-700 dark:text-gray-300 font-medium">Prizes:</span>
                                    <div className="ml-2 text-gray-600 dark:text-gray-400">
                                      {Object.entries(JSON.parse(event.prizes)).map(([place, prize], index) => (
                                        <div key={index}>
                                          <span className="font-medium capitalize">{place}:</span> {prize}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </CardContent>
                          
                          <CardFooter className="flex flex-wrap items-center justify-between">
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                              <FaUsers className="mr-2" />
                              <span>
                                {event.max_participants} {event.max_participants === 1 ? 'spot' : 'spots'} 
                                {isHackathon && event.max_team_size && `(teams of ${event.max_team_size})`}
                              </span>
                            </div>
                            <div className="flex">
                              <Button size="sm" variant="primary">
                                {new Date(event.registration_deadline) > new Date() 
                                  ? 'Register Now' 
                                  : 'View Details'}
                              </Button>
                            </div>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </motion.div>
      </section>
    </main>
  )
}
