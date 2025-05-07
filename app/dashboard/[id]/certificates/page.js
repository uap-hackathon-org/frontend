"use client"
import { useState } from 'react'
import { Quicksand, Poppins, Lato } from 'next/font/google'
import { motion } from 'framer-motion'
import { useToast } from '@/hooks/use-toast'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/components/card'

const poppins = Lato({ subsets: ['latin'], weight: '700' })
const playfair = Quicksand({ subsets: ['latin'], weight: '400' })

export default function CertificatesPage() {
  const { toast } = useToast()
  
  return (
    <div className={`${playfair.className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={`${poppins.className} text-2xl font-bold text-gray-900 dark:text-white mb-6`}>
          Your Certificates
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-white dark:bg-dark-2 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Certificate placeholder</CardTitle>
              <CardDescription>Certificate details will appear here</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This is where your earned certificates will be displayed.
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  )
}
