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
import { Progress } from '@/components/ui/components/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/components/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/components/avatar'
import { Slider } from '@/components/ui/components/slider'
import { FaSearch, FaLaptopCode, FaFilter, FaRegClock, FaCog, FaTrophy, FaClipboardCheck, FaUserTie, FaCalendarAlt } from 'react-icons/fa'
import Link from 'next/link'

// Import mock data (will be replaced with API calls later)
import { microTasks as mockTasks, skillCategories, difficultyLevels } from '@/lib/mock'

const poppins = Lato({ subsets: ['latin'], weight: '700' })
const playfair = Quicksand({ subsets: ['latin'], weight: '400' })

export default function MicroTasksPage() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [pointsRange, setPointsRange] = useState([0, 100]);
  const [sortBy, setSortBy] = useState('deadline'); // deadline, points, difficulty
  
  // Flatten all required skills for filtering
  const allSkills = tasks.flatMap(task => task.required_skills || []);
  const uniqueSkills = [...new Set(allSkills)];
  
  // Get all categories
  const allCategories = tasks.map(task => task.category);
  const uniqueCategories = [...new Set(allCategories.filter(Boolean))];
  
  // Filter function
  const filterAndSortTasks = () => {
    let filtered = [...tasks];
    
    // Apply search term filter
    if (searchTerm) {
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.created_by_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (task.required_skills && task.required_skills.some(skill => 
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        ))
      );
    }
    
    // Apply category filter
    if (categoryFilter && categoryFilter !== 'all') {
      filtered = filtered.filter(task => task.category === categoryFilter);
    }
    
    // Apply difficulty filter
    if (difficultyFilter && difficultyFilter !== 'all') {
      filtered = filtered.filter(task => task.difficulty === difficultyFilter);
    }
    
    // Apply points range filter
    filtered = filtered.filter(task => 
      task.points >= pointsRange[0] && task.points <= pointsRange[1]
    );
    
    // Sort tasks
    switch (sortBy) {
      case 'deadline':
        filtered.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
        break;
      case 'points':
        filtered.sort((a, b) => b.points - a.points);
        break;
      case 'difficulty':
        const difficultyOrder = { beginner: 1, intermediate: 2, advanced: 3, expert: 4 };
        filtered.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
        break;
      default:
        break;
    }
    
    setFilteredTasks(filtered);
  };
  
  // Effect for filtering
  useEffect(() => {
    filterAndSortTasks();
  }, [searchTerm, categoryFilter, difficultyFilter, pointsRange, sortBy, tasks]);

  // Fetch tasks data
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        // When API is ready, replace this with fetch call
        // const response = await fetch('api/micro-tasks', {
        //   headers: {
        //     "ngrok-skip-browser-warning": "69420"
        //   }
        // });
        // if (!response.ok) throw new Error('Failed to fetch micro tasks');
        // const data = await response.json();
        // setTasks(data);
        
        // For now, use mock data
        setTimeout(() => {
          setTasks(mockTasks);
          setLoading(false);
        }, 800); // Simulate API delay
      } catch (err) {
        setError(err.message);
        setLoading(false);
        toast({
          title: "Error",
          description: "Failed to load micro-tasks data. Please try again later.",
          variant: "destructive"
        });
      }
    };
    
    fetchTasks();
  }, [toast]);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };
  
  // Calculate days remaining
  const getDaysRemaining = (deadlineStr) => {
    const deadline = new Date(deadlineStr);
    const today = new Date();
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  // Get difficulty color
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'intermediate':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'advanced':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'expert':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
    }
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
                {t('microTasks')}
              </h1>
              <p className='text-gray-600 dark:text-gray-300'>
                Industry-relevant micro tasks to build your skills and portfolio
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Input
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full md:w-[250px]"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="deadline">Deadline</SelectItem>
                  <SelectItem value="points">Highest points</SelectItem>
                  <SelectItem value="difficulty">Difficulty</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Category</label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {uniqueCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Difficulty Level</label>
              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  {difficultyLevels.map((level) => (
                    <SelectItem key={level.id} value={level.id}>
                      {level.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Points Range: {pointsRange[0]} - {pointsRange[1]}
              </label>
              <Slider
                defaultValue={[0, 100]}
                max={100}
                step={5}
                value={pointsRange}
                onValueChange={setPointsRange}
                className="py-4"
              />
            </div>
          </div>
          
          {/* Loading and Error States */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="bg-white dark:bg-dark-2 rounded-xl p-6 h-64"></div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <div className="text-red-500 mb-4 text-xl"><FaLaptopCode className="inline-block mr-2" /> Error loading micro tasks</div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>Try Again</Button>
            </div>
          ) : (
            <>
              {/* Results summary */}
              <div className="flex items-center mb-6">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Showing {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'}
                  {categoryFilter && categoryFilter !== 'all' && <span> in <Badge className="ml-1 capitalize">{categoryFilter}</Badge></span>}
                  {difficultyFilter && difficultyFilter !== 'all' && <span> with difficulty <Badge className="ml-1 capitalize">{difficultyFilter}</Badge></span>}
                </div>
                {(categoryFilter !== 'all' || difficultyFilter !== 'all' || searchTerm || pointsRange[0] > 0 || pointsRange[1] < 100) && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="ml-4 text-xs"
                    onClick={() => {
                      setSearchTerm('');
                      setCategoryFilter('all');
                      setDifficultyFilter('all');
                      setPointsRange([0, 100]);
                    }}
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
              
              {/* Tasks Cards */}
              {filteredTasks.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-500 mb-4 text-xl"><FaLaptopCode className="inline-block mr-2" /> No tasks found</div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">Try adjusting your search or filter criteria</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredTasks.map((task) => {
                    const daysRemaining = getDaysRemaining(task.deadline);
                    const isUrgent = daysRemaining <= 3 && daysRemaining > 0;
                    const isExpired = daysRemaining < 0;
                    
                    return (
                      <motion.div 
                        key={task.id} 
                        whileHover={{ y: -5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <Card className="h-full bg-white dark:bg-dark-2 border-none overflow-hidden">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <CardTitle className="text-xl">{task.title}</CardTitle>
                                  <Badge className={getDifficultyColor(task.difficulty)}>
                                    {task.difficulty.charAt(0).toUpperCase() + task.difficulty.slice(1)}
                                  </Badge>
                                </div>
                                <div className="flex items-center mt-1 text-sm text-gray-600 dark:text-gray-400">
                                  <span className="font-medium">By</span> 
                                  <div className="flex items-center ml-1">
                                    <Avatar className="h-4 w-4 mr-1">
                                      <AvatarImage src={task.company_logo || '/profile.png'} alt={task.created_by_name} />
                                      <AvatarFallback>{task.created_by_name.substring(0, 1)}</AvatarFallback>
                                    </Avatar>
                                    <span>{task.created_by_name}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 px-2 py-1 bg-primary/10 rounded-full text-primary text-sm font-semibold">
                                <FaTrophy className="text-xs" />
                                <span>{task.points} pts</span>
                              </div>
                            </div>
                          </CardHeader>
                          
                          <CardContent className="pb-2">
                            <CardDescription className="line-clamp-3 mb-3">
                              {task.description}
                            </CardDescription>
                            
                            <div className="flex flex-wrap gap-1 mb-4">
                              {task.required_skills && task.required_skills.map((skill, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                            
                            <div className="space-y-3">
                              <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center">
                                  <FaRegClock className="mr-2 text-gray-500" />
                                  <span className="text-gray-700 dark:text-gray-300">Estimated time:</span>
                                  <span className="ml-2 text-gray-600 dark:text-gray-400">{task.estimated_hours} hours</span>
                                </div>
                                <div className="flex items-center">
                                  <FaClipboardCheck className="mr-2 text-gray-500" />
                                  <span className="text-gray-700 dark:text-gray-300">Completions:</span>
                                  <span className="ml-2 text-gray-600 dark:text-gray-400">{task.completed_count}/{task.max_submissions}</span>
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center">
                                  <FaCalendarAlt className="mr-2 text-gray-500" />
                                  <span className="text-gray-700 dark:text-gray-300">Deadline:</span>
                                  <span className={`ml-2 ${isExpired ? 'text-red-500' : isUrgent ? 'text-amber-500' : 'text-gray-600 dark:text-gray-400'}`}>
                                    {formatDate(task.deadline)}
                                    {!isExpired && (
                                      <span className="ml-1">
                                        ({daysRemaining} {daysRemaining === 1 ? 'day' : 'days'} left)
                                      </span>
                                    )}
                                    {isExpired && (
                                      <span className="ml-1">(Expired)</span>
                                    )}
                                  </span>
                                </div>
                                <div className="flex items-center">
                                  <FaCog className="mr-2 text-gray-500" />
                                  <span className="text-gray-700 dark:text-gray-300">Category:</span>
                                  <span className="ml-2 text-gray-600 dark:text-gray-400 capitalize">{task.category}</span>
                                </div>
                              </div>
                              
                              {task.attachments && task.attachments.length > 0 && (
                                <div className="pt-2 mt-2 border-t border-gray-100 dark:border-gray-800">
                                  <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Task materials:</p>
                                  <div className="flex flex-wrap gap-2">
                                    {task.attachments.map((attachment, index) => (
                                      <Badge key={index} variant="outline" className="text-xs bg-gray-50 dark:bg-gray-800">
                                        {attachment.title}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </CardContent>
                          
                          <CardFooter className="pt-2">
                            <div className="w-full flex justify-between items-center">
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                Created {formatDate(task.creation_date)}
                              </div>
                              <Button 
                                size="sm" 
                                variant={isExpired ? "outline" : "primary"}
                                disabled={isExpired}
                              >
                                {isExpired ? 'Expired' : 'View Task'}
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
