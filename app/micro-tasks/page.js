"use client"
import { useLanguage } from '@/lib/language/LanguageContext'
import { Quicksand, Poppins, Lato } from 'next/font/google'
import { Toaster } from '@/components/ui/components/toaster'
import { useToast } from '@/hooks/use-toast'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { Card } from '@/components/ui/components/card'
import { Input } from '@/components/ui/components/input'
import { Badge } from '@/components/ui/components/badge'
import { Button } from '@/components/ui/components/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/components/select'
import { Progress } from '@/components/ui/components/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/components/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/components/avatar'
import { Slider } from '@/components/ui/components/slider'
import { ScrollArea } from '@/components/ui/components/scroll-area'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/components/tooltip'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/components/dropdown-menu'
import { FaSearch, FaLaptopCode, FaFilter, FaRegClock, FaCog, FaTrophy, FaClipboardCheck, FaUserTie, FaCalendarAlt, FaFireAlt, FaStar, FaExclamationCircle, FaBolt, FaDiceD20, FaMap, FaBrain, FaLayerGroup, FaChartLine, FaSortAmountDown, FaSortAmountUp, FaEllipsisV, FaLock, FaUnlock } from 'react-icons/fa'
import { HiOutlineQueueList, HiOutlineSquare3Stack3D } from 'react-icons/hi2'
import Link from 'next/link'
import api from '@/axiosInstance';

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

        // // axios call
        // const response = await api.get('/api/micro-tasks');
        
        // setTasks(response.data);
        // setLoading(false);
        
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

  // Define different view modes
  const [viewMode, setViewMode] = useState('quest-board'); // 'quest-board', 'grid', 'list'
  
  // Define animation variants
  const questBoardVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };
  
  const questItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", damping: 12 } }
  };
  
  // Helper function to get difficulty icon
  const getDifficultyIcon = (difficulty) => {
    switch(difficulty) {
      case 'beginner': return <FaBolt className="text-green-500" />;
      case 'intermediate': return <FaDiceD20 className="text-blue-500" />;
      case 'advanced': return <FaFireAlt className="text-orange-500" />;
      case 'expert': return <FaStar className="text-red-500" />;
      default: return <FaBolt className="text-gray-500" />;
    }
  };
  
  // Helper function to categorize tasks by difficulty
  const getTasksByDifficulty = () => {
    // Create copy of tasks array to avoid modifying the original
    const difficultyGroups = {
      beginner: filteredTasks.filter(task => task.difficulty === 'beginner'),
      intermediate: filteredTasks.filter(task => task.difficulty === 'intermediate'),
      advanced: filteredTasks.filter(task => task.difficulty === 'advanced'),
      expert: filteredTasks.filter(task => task.difficulty === 'expert')
    };
    return difficultyGroups;
  };
  
  // Group tasks by category for the quest board view
  const getTasksByCategory = () => {
    // Get unique categories for grouping
    const categories = {};
    
    filteredTasks.forEach(task => {
      const category = task.category || 'Uncategorized';
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(task);
    });
    
    return categories;
  };

  // Helper function to get category icon
  const getCategoryIcon = (category) => {
    switch(category.toLowerCase()) {
      case 'frontend': return <FaLayerGroup className="text-blue-500" />;
      case 'backend': return <FaCog className="text-purple-500" />;
      case 'design': return <FaMap className="text-pink-500" />;
      case 'data science': return <FaChartLine className="text-green-500" />;
      case 'machine learning': return <FaBrain className="text-yellow-500" />;
      default: return <FaLaptopCode className="text-gray-500" />;
    }
  };
  
  return (
    <main className={`${playfair.className} mt-4 w-full overflow-hidden scrollbar-hidden min-h-screen bg-gradient-to-br from-orange-50 to-white dark:from-slate-900 dark:to-slate-800`}>
      <Toaster />
      <div className="relative pb-16">
        {/* Hero section with quest-like graphics */}
        <div className="relative bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-900 dark:to-amber-800 py-12 mb-8 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden opacity-10">
            <div className="absolute -left-32 -top-32 w-64 h-64 bg-white rounded-full"></div>
            <div className="absolute right-0 bottom-0 w-32 h-32 bg-white rounded-full"></div>
            {Array.from({ length: 20 }).map((_, i) => (
              <div 
                key={i}
                className="absolute bg-white rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 12 + 4}px`,
                  height: `${Math.random() * 12 + 4}px`,
                  opacity: Math.random() * 0.5 + 0.1
                }}
              ></div>
            ))}
          </div>
          <div className="relative container mx-auto px-6 z-10">
            <motion.div 
              className="flex flex-col md:flex-row gap-8 items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex-1">
                <h1 className={`${poppins.className} text-4xl md:text-5xl font-bold dark:text-white text-black mb-3`}>
                  {t('microTasks')}  
                </h1>
                <p className="dark:text-orange-100 text-lg max-w-xl mb-6 text-orange-text-outline">
                  Complete skill-building quests to level up your abilities and climb the leaderboard
                </p>
                <div className="flex items-center space-x-4">
                  <div className="dark:bg-white/20 bg-grey-1 backdrop-blur-sm px-4 py-2 rounded-lg text-white">
                    <div className="text-2xl font-bold dark:text-white text-orange-dark" >{tasks.length}</div>
                    <div className="text-sm dark:text-white text-orange-dark">Available Tasks</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-white">
                    <div className="text-2xl font-bold dark:text-white text-orange-dark">1,250</div>
                    <div className="text-sm dark:text-white text-orange-dark">Points Possible</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-white">
                    <div className="text-2xl font-bold dark:text-white text-orange-dark">5</div>
                    <div className="text-sm dark:text-white text-orange-dark">New Today</div>
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="relative w-40 h-40">
                  <div className="absolute inset-0 bg-orange-300 rounded-full opacity-20 animate-ping" style={{ animationDuration: '3s' }}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FaTrophy className="text-white text-6xl" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <section className='h-full w-[90%] mx-auto'>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='mb-8'
          >
          {/* Control Bar */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-4 mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-4">
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="relative flex-1 md:w-80">
                  <Input
                    placeholder="Search quests..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full border-orange-200 dark:border-orange-900/30 focus:ring-orange-500"
                  />
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400" />
                </div>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex space-x-1 bg-orange-100 dark:bg-orange-900/20 rounded-md p-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`h-8 w-8 ${viewMode === 'quest-board' ? 'bg-orange-500 text-white' : 'text-orange-500'}`}
                          onClick={() => setViewMode('quest-board')}
                        >
                          <HiOutlineSquare3Stack3D className="h-5 w-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`h-8 w-8 ${viewMode === 'grid' ? 'bg-orange-500 text-white' : 'text-orange-500'}`}
                          onClick={() => setViewMode('grid')}
                        >
                          <FaLayerGroup className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`h-8 w-8 ${viewMode === 'list' ? 'bg-orange-500 text-white' : 'text-orange-500'}`}
                          onClick={() => setViewMode('list')}
                        >
                          <HiOutlineQueueList className="h-5 w-5" />
                        </Button>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Toggle view mode</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              <div className="flex items-center gap-2 w-full md:w-auto">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-[150px] border-orange-200 dark:border-orange-900/30 focus:ring-orange-500">
                    <div className="flex items-center">
                      {sortBy === 'deadline' ? <FaCalendarAlt className="mr-2 text-orange-500" /> : 
                       sortBy === 'points' ? <FaTrophy className="mr-2 text-orange-500" /> : 
                       <FaSortAmountDown className="mr-2 text-orange-500" />}
                      <SelectValue placeholder="Sort by" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="deadline">Deadline</SelectItem>
                    <SelectItem value="points">Highest points</SelectItem>
                    <SelectItem value="difficulty">Difficulty</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm('');
                    setCategoryFilter('all');
                    setDifficultyFilter('all');
                    setPointsRange([0, 100]);
                  }}
                  className="border-orange-200 text-orange-600 hover:bg-orange-50 dark:border-orange-800 dark:text-orange-400 dark:hover:bg-orange-900/20"
                >
                  <FaFilter className="mr-2" />
                  Reset
                </Button>
              </div>
            </div>
            
            {/* Filter options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Category</label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="border-orange-200 dark:border-orange-900/30 focus:ring-orange-500">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {uniqueCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        <div className="flex items-center">
                          {getCategoryIcon(category)}
                          <span className="ml-2 capitalize">{category}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Difficulty Level</label>
                <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                  <SelectTrigger className="border-orange-200 dark:border-orange-900/30 focus:ring-orange-500">
                    <SelectValue placeholder="All Levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    {difficultyLevels.map((level) => (
                      <SelectItem key={level.id} value={level.id}>
                        <div className="flex items-center">
                          {getDifficultyIcon(level.id)}
                          <span className="ml-2">{level.name}</span>
                        </div>
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
          </div>
          {/* Results summary */}
          <div className="flex items-center mb-6">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium">{filteredTasks.length}</span> {filteredTasks.length === 1 ? 'quest' : 'quests'} available
              {categoryFilter && categoryFilter !== 'all' && <span> in <Badge className="ml-1 capitalize bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400">{categoryFilter}</Badge></span>}
              {difficultyFilter && difficultyFilter !== 'all' && <span> with difficulty <Badge className="ml-1 capitalize bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400">{difficultyFilter}</Badge></span>}
            </div>
          </div>
          
          {/* Loading and Error States */}
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div key={item} className="h-32 md:h-40 bg-white dark:bg-slate-800 rounded-lg shadow-md"></div>
              ))}
            </div>
          ) : error ? (
            <div className="bg-white dark:bg-slate-800 rounded-xl p-8 text-center shadow-md">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-500 mb-4">
                <FaExclamationCircle className="text-3xl" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">Error Loading Quests</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
              <Button 
                onClick={() => window.location.reload()}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                Try Again
              </Button>
            </div>
          ) : (
            <div>
              {filteredTasks.length === 0 ? (
                <div className="bg-white dark:bg-slate-800 rounded-xl p-8 text-center shadow-md">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 text-orange-500 mb-4">
                    <FaSearch className="text-3xl" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">No Quests Found</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">Try adjusting your search or filter criteria</p>
                  <Button 
                    onClick={() => {
                      setSearchTerm('');
                      setCategoryFilter('all');
                      setDifficultyFilter('all');
                      setPointsRange([0, 100]);
                    }}
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    Reset Filters
                  </Button>
                </div>
              ) : (
                <>
                  {/* Quest Board View */}
                  {viewMode === 'quest-board' && (
                    <div className="space-y-8">
                      {Object.entries(getTasksByCategory()).map(([category, categoryTasks]) => (
                        <motion.div 
                          key={category}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden"
                        >
                          <div className="bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-700 dark:to-amber-700 px-6 py-4 flex justify-between items-center">
                            <div className="flex items-center">
                              <span className="bg-white/20 p-2 rounded-lg mr-3">
                                {getCategoryIcon(category)}
                              </span>
                              <h3 className="text-xl font-bold dark:text-white text-black capitalize">{category}</h3>
                              <Badge className="ml-3 bg-white/20 dark:text-white text-black hover:bg-white/30">
                                {categoryTasks.length} {categoryTasks.length === 1 ? 'quest' : 'quests'}
                              </Badge>
                            </div>
                          </div>
                          
                          <ScrollArea className="max-h-[380px] overflow-y-auto p-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                              {categoryTasks.map((task) => {
                                const daysRemaining = getDaysRemaining(task.deadline);
                                const isUrgent = daysRemaining <= 3 && daysRemaining > 0;
                                const isExpired = daysRemaining < 0;
                                
                                return (
                                  <motion.div
                                    key={task.id}
                                    variants={questItemVariants}
                                    whileHover={{ scale: 1.03, y: -5 }}
                                    className={`relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ${isExpired ? 'opacity-70' : ''}`}
                                  >
                                    <div className={`h-full flex flex-col bg-gradient-to-br ${
                                      task.difficulty === 'beginner' ? 'from-green-50 to-white dark:from-green-900/30 dark:to-slate-800' :
                                      task.difficulty === 'intermediate' ? 'from-blue-50 to-white dark:from-blue-900/30 dark:to-slate-800' :
                                      task.difficulty === 'advanced' ? 'from-amber-50 to-white dark:from-amber-900/30 dark:to-slate-800' :
                                      'from-red-50 to-white dark:from-red-900/30 dark:to-slate-800'
                                    } border-t-4 ${
                                      task.difficulty === 'beginner' ? 'border-green-500' :
                                      task.difficulty === 'intermediate' ? 'border-blue-500' :
                                      task.difficulty === 'advanced' ? 'border-orange-500' :
                                      'border-red-500'
                                    }`}>
                                      {/* Task Header */}
                                      <div className="p-4 pb-2">
                                        <div className="flex justify-between items-start mb-2">
                                          <h4 className="font-bold text-gray-800 dark:text-gray-100 line-clamp-2">{task.title}</h4>
                                          <div className="flex items-center justify-center min-w-[45px] h-[45px] rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 font-bold">
                                            {task.points}p
                                          </div>
                                        </div>
                                        
                                        <div className="flex items-center text-xs font-medium mb-1">
                                          <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${
                                            task.difficulty === 'beginner' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' :
                                            task.difficulty === 'intermediate' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' :
                                            task.difficulty === 'advanced' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400' :
                                            'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                                          }`}>
                                            {getDifficultyIcon(task.difficulty)}
                                            <span>{task?.difficulty?.charAt(0)?.toUpperCase() + task?.difficulty?.slice(1) || 'N/A'}</span>
                                          </div>
                                          
                                          <div className="flex items-center ml-2 text-gray-600 dark:text-gray-400">
                                            <Avatar className="h-4 w-4 mr-1">
                                              <AvatarImage src={task.company_logo || '/profile.png'} alt={task.created_by_name} />
                                              <AvatarFallback>{task.created_by_name.substring(0, 1)}</AvatarFallback>
                                            </Avatar>
                                            <span className="truncate max-w-[80px]">{task.created_by_name}</span>
                                          </div>
                                        </div>
                                      </div>
                                      
                                      {/* Task Body */}
                                      <div className="p-4 pt-0 flex-1 flex flex-col">
                                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                                          {task?.description}
                                        </p>
                                        
                                        <div className="flex flex-wrap gap-1.5 mb-3">
                                          {task?.skills?.map((skill, i) => (
                                            <span 
                                              key={i} 
                                              className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-800/30 dark:text-blue-300 px-2 py-1 rounded"
                                            >
                                              {skill}
                                            </span>
                                          )) || <span className="text-xs text-gray-500">No skills listed</span>}
                                        </div>
                                        
                                        <div className="mt-auto space-y-2 text-xs">
                                          <div className="flex justify-between items-center text-gray-700 dark:text-gray-300">
                                            <div className="flex items-center">
                                              <FaRegClock className="mr-1" />
                                              <span>{task?.estimated_hours}h</span>
                                            </div>
                                            <div className="flex items-center">
                                              <FaClipboardCheck className="mr-1" />
                                              <span>{task?.completed_count}/{task?.max_submissions}</span>
                                            </div>
                                          </div>
                                          
                                          <div className="flex items-center">
                                            <FaCalendarAlt className="mr-1 text-gray-500" />
                                            <span className={`${isExpired ? 'text-red-500' : isUrgent ? 'text-amber-500' : 'text-gray-600 dark:text-gray-400'}`}>
                                              {isExpired ? 'Expired' : `${daysRemaining} days left`}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                      
                                      {/* Task Footer */}
                                      <div className="p-3 border-t border-gray-100 dark:border-gray-700 mt-auto">
                                        <Button 
                                          className={`w-full justify-center ${isExpired ? 'bg-gray-300 text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700' : 'bg-orange-500 hover:bg-orange-600 text-white'}`}
                                          disabled={isExpired}
                                          size="sm"
                                        >
                                          {isExpired ? 'Expired' : 'Start Quest'}
                                        </Button>
                                      </div>
                                      
                                      {/* Locked indicator */}
                                      {task?.prerequisites && task?.prerequisites.length > 0 && (
                                        <div className="absolute top-2 right-2">
                                          <TooltipProvider>
                                            <Tooltip>
                                              <TooltipTrigger>
                                                <div className="p-1 rounded-full bg-gray-200 dark:bg-gray-700">
                                                  <FaLock className="text-gray-600 dark:text-gray-400" />
                                                </div>
                                              </TooltipTrigger>
                                              <TooltipContent>
                                                <p>Prerequisites required</p>
                                              </TooltipContent>
                                            </Tooltip>
                                          </TooltipProvider>
                                        </div>
                                      )}
                                    </div>
                                  </motion.div>
                                );
                              })}
                            </div>
                          </ScrollArea>
                        </motion.div>
                      ))}
                    </div>
                  )}
          

                  {/* Grid View */}
                  {viewMode === 'grid' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {filteredTasks.map((task) => {
                        const daysRemaining = getDaysRemaining(task.deadline);
                        const isUrgent = daysRemaining <= 3 && daysRemaining > 0;
                        const isExpired = daysRemaining < 0;
                        
                        return (
                          <motion.div
                            key={task.id}
                            variants={questItemVariants}
                            whileHover={{ scale: 1.03 }}
                            className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden"
                          >
                            <div className="p-3 bg-gradient-to-r from-orange-500 to-amber-500">
                              <h4 className="font-bold text-white truncate">{task?.title}</h4>
                            </div>
                            
                            <div className="p-3">
                              <div className="flex justify-between mb-2">
                                <Badge className={getDifficultyColor(task?.difficulty)}>
                                  {task?.difficulty?.charAt(0)?.toUpperCase() + task?.difficulty?.slice(1) || 'N/A'}
                                </Badge>
                                <div className="font-bold text-orange-500">{task?.points || 0} pts</div>
                              </div>
                              
                              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                                {task?.description || 'No description available'}
                              </p>
                              
                              <div className="flex flex-wrap gap-1 mb-2">
                                {task?.skills?.map((skill, i) => (
                                  <span key={i} className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-800/30 dark:text-blue-300 px-2 py-1 rounded">
                                    {skill}
                                  </span>
                                )) || <span className="text-xs text-gray-500">No skills listed</span>}
                              </div>
                              
                              <div className="text-xs text-gray-600 dark:text-gray-400">
                                <div className="flex justify-between mb-1">
                                  <div className="flex items-center"><FaRegClock className="mr-1" /> {task?.estimated_hours}h</div>
                                  <div className="flex items-center"><FaCalendarAlt className="mr-1" /> {isExpired ? 'Expired' : `${daysRemaining}d left`}</div>
                                </div>
                                <Button 
                                  size="sm" 
                                  className="w-full mt-2 bg-orange-500 hover:bg-orange-600 text-white"
                                  disabled={isExpired}
                                >
                                  {isExpired ? 'Expired' : 'Start Quest'}
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                  
                  {/* List View */}
                  {viewMode === 'list' && (
                    <div className="space-y-3">
                      {filteredTasks.map((task) => {
                        const daysRemaining = getDaysRemaining(task.deadline);
                        const isUrgent = daysRemaining <= 3 && daysRemaining > 0;
                        const isExpired = daysRemaining < 0;
                        
                        return (
                          <motion.div
                            key={task.id}
                            variants={questItemVariants}
                            className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden"
                          >
                            <div className="flex flex-col sm:flex-row items-stretch">
                              <div className="w-full sm:w-64 bg-gradient-to-br from-orange-500 to-amber-500 p-4 flex items-center justify-between sm:justify-center">
                                <div className="flex flex-col items-center">
                                  <div className="text-3xl font-bold text-white">{task?.points}</div>
                                  <div className="text-xs text-orange-100">POINTS</div>
                                </div>
                                
                                <div className="sm:hidden">
                                  <Badge className={`${isExpired ? 'bg-gray-400' : 'bg-orange-400'} text-white border-0`}>
                                    {isExpired ? 'Expired' : `${daysRemaining}d left`}
                                  </Badge>
                                </div>
                              </div>
                              
                              <div className="flex-1 p-4">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                                  <h4 className="font-bold text-gray-800 dark:text-gray-100">{task?.title || 'Untitled Task'}</h4>
                                  <div className="flex items-center mt-1 sm:mt-0">
                                    <Badge className={`${getDifficultyColor(task?.difficulty)} mr-2`}>
                                      {task?.difficulty?.charAt(0)?.toUpperCase() + task?.difficulty?.slice(1) || 'N/A'}
                                    </Badge>
                                    <Badge className="bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                                      {task?.category || 'Uncategorized'}
                                    </Badge>
                                  </div>
                                </div>
                                
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                                  {task?.description || 'No description available'}
                                </p>
                                
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                                    <div className="flex items-center mr-3">
                                      <FaRegClock className="mr-1" />
                                      <span>{task?.estimated_hours} hours</span>
                                    </div>
                                    <div className="flex items-center mr-3">
                                      <FaClipboardCheck className="mr-1" />
                                      <span>{task?.completed_count}/{task?.max_submissions}</span>
                                    </div>
                                    <div className="hidden sm:flex items-center">
                                      <FaCalendarAlt className="mr-1" />
                                      <span className={isExpired ? 'text-red-500' : isUrgent ? 'text-amber-500' : ''}>
                                        {isExpired ? 'Expired' : `${daysRemaining} days left`}
                                      </span>
                                    </div>
                                  </div>
                                  
                                  <Button 
                                    size="sm" 
                                    className="mt-2 sm:mt-0 bg-orange-500 hover:bg-orange-600 text-white"
                                    disabled={isExpired}
                                  >
                                    {isExpired ? 'Expired' : 'View Details'}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </motion.div>
      </section>
    </div>
  </main>
);
}
