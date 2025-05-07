"use client"
import { useState } from 'react'
import { Quicksand, Poppins, Lato } from 'next/font/google'
import { motion } from 'framer-motion'
import { useToast } from '@/hooks/use-toast'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/components/card'
import { Badge } from '@/components/ui/components/badge'
import { Progress } from '@/components/ui/components/progress'
import { Button } from '@/components/ui/components/button'
import { FaLaptopCode } from 'react-icons/fa'

const poppins = Lato({ subsets: ['latin'], weight: '700' })
const playfair = Quicksand({ subsets: ['latin'], weight: '400' })

export default function RunningTasksPage() {
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
            Your Micro Tasks
          </h1>
          <div className="flex gap-2">
            <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800">Completed: 0</Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800">In Progress: 0</Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <Card className="bg-white dark:bg-dark-2 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <FaLaptopCode className="text-primary" />
                  Task placeholder
                </CardTitle>
                <CardDescription>Task details will appear here</CardDescription>
              </div>
              <Badge>In Progress</Badge>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                This is where your in-progress and completed micro-tasks will be displayed.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Progress</span>
                  <span>0%</span>
                </div>
                <Progress value={0} className="h-2" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Due: Not set
              </div>
              <Button size="sm" variant="primary">Continue Task</Button>
            </CardFooter>
          </Card>
        </div>
      </motion.div>
    </div>
  )
}
