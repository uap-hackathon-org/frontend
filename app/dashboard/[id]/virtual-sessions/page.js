"use client"
import { useState } from 'react'
import { Quicksand, Poppins, Lato } from 'next/font/google'
import { motion } from 'framer-motion'
import { useToast } from '@/hooks/use-toast'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/components/card'
import { Badge } from '@/components/ui/components/badge'
import { Button } from '@/components/ui/components/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/components/avatar'
import { FaVideo, FaCalendarAlt, FaClock, FaUserFriends } from 'react-icons/fa'

const poppins = Lato({ subsets: ['latin'], weight: '700' })
const playfair = Quicksand({ subsets: ['latin'], weight: '400' })

export default function VirtualSessionsPage() {
  const { toast } = useToast()
  
  return (
    <div className={`${playfair.className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className={`${poppins.className} text-2xl font-bold text-gray-900 dark:text-white`}>
            Virtual Sessions
          </h1>
          <Button size="sm" variant="outline" className="gap-2">
            <FaCalendarAlt />
            View Calendar
          </Button>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          {/* Upcoming Session */}
          <Card className="bg-white dark:bg-dark-2 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <FaVideo className="text-primary" />
                  Upcoming Session Placeholder
                </CardTitle>
                <Badge className="bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800">
                  Upcoming
                </Badge>
              </div>
              <CardDescription>One-on-one mentoring session</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <FaCalendarAlt />
                    <span>May 10, 2025</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <FaClock />
                    <span>10:00 AM - 11:00 AM</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/profile.png" alt="Mentor" />
                    <AvatarFallback>MN</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Mentor Name</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Senior Software Engineer</p>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  This is where your upcoming virtual sessions with mentors will be displayed.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <FaUserFriends />
                <span>1-on-1</span>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">Reschedule</Button>
                <Button size="sm" variant="primary">Join Session</Button>
              </div>
            </CardFooter>
          </Card>
          
          {/* Past Session */}
          <Card className="bg-white dark:bg-dark-2 shadow-sm hover:shadow-md transition-shadow opacity-80">
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <FaVideo className="text-gray-400" />
                  Past Session Placeholder
                </CardTitle>
                <Badge variant="outline">Completed</Badge>
              </div>
              <CardDescription>Group mentoring session</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <FaCalendarAlt />
                    <span>May 3, 2025</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <FaClock />
                    <span>2:00 PM - 3:30 PM</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/profile.png" alt="Mentor" />
                    <AvatarFallback>MN</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Mentor Name</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">UX Designer</p>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  This is where your past virtual sessions will be displayed.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <FaUserFriends />
                <span>Group (5)</span>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">View Recording</Button>
                <Button size="sm" variant="outline">Leave Feedback</Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </motion.div>
    </div>
  )
}
