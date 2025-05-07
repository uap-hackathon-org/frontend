"use client"
import { useState } from 'react'
import { Quicksand, Poppins, Lato } from 'next/font/google'
import { motion } from 'framer-motion'
import { useToast } from '@/hooks/use-toast'
import { Card, CardContent } from '@/components/ui/components/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/components/avatar'
import { FaTrophy, FaMedal } from 'react-icons/fa'

const poppins = Lato({ subsets: ['latin'], weight: '700' })
const playfair = Quicksand({ subsets: ['latin'], weight: '400' })

export default function LeaderboardPage() {
  const { toast } = useToast()
  
  const dummyLeaderboard = [
    { rank: 1, name: 'Alex Johnson', score: 950, avatar: '/profile.png' },
    { rank: 2, name: 'Maria Garcia', score: 920, avatar: '/profile.png' },
    { rank: 3, name: 'John Smith', score: 885, avatar: '/profile.png' },
    { rank: 4, name: 'You', score: 760, avatar: '/profile.png', isCurrentUser: true },
  ]
  
  return (
    <div className={`${playfair.className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className={`${poppins.className} text-2xl font-bold text-gray-900 dark:text-white`}>
            Leaderboard
          </h1>
          <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
            <span>Your Rank:</span>
            <span className="font-medium text-primary">#4</span>
          </div>
        </div>
        
        <Card className="bg-white dark:bg-dark-2 shadow-sm">
          <CardContent className="p-6">
            {/* Top 3 podium */}
            <div className="flex justify-center items-end mb-12 mt-4 gap-4">
              {/* 2nd Place */}
              <div className="flex flex-col items-center">
                <Avatar className="w-16 h-16 border-2 border-silver">
                  <AvatarImage src={dummyLeaderboard[1].avatar} alt={dummyLeaderboard[1].name} />
                  <AvatarFallback>{dummyLeaderboard[1].name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="h-24 w-20 bg-silver mt-2 rounded-t-lg flex items-center justify-center">
                  <FaMedal className="text-white text-xl" />
                </div>
                <p className="mt-2 font-medium">{dummyLeaderboard[1].name}</p>
                <p className="text-sm">{dummyLeaderboard[1].score} pts</p>
              </div>
              
              {/* 1st Place */}
              <div className="flex flex-col items-center">
                <Avatar className="w-20 h-20 border-2 border-gold">
                  <AvatarImage src={dummyLeaderboard[0].avatar} alt={dummyLeaderboard[0].name} />
                  <AvatarFallback>{dummyLeaderboard[0].name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="h-32 w-24 bg-gradient-to-t from-amber-500 to-yellow-300 mt-2 rounded-t-lg flex items-center justify-center">
                  <FaTrophy className="text-white text-2xl" />
                </div>
                <p className="mt-2 font-medium">{dummyLeaderboard[0].name}</p>
                <p className="text-sm">{dummyLeaderboard[0].score} pts</p>
              </div>
              
              {/* 3rd Place */}
              <div className="flex flex-col items-center">
                <Avatar className="w-14 h-14 border-2 border-bronze">
                  <AvatarImage src={dummyLeaderboard[2].avatar} alt={dummyLeaderboard[2].name} />
                  <AvatarFallback>{dummyLeaderboard[2].name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="h-18 w-16 bg-amber-700 mt-2 rounded-t-lg flex items-center justify-center">
                  <FaMedal className="text-white text-lg" />
                </div>
                <p className="mt-2 font-medium">{dummyLeaderboard[2].name}</p>
                <p className="text-sm">{dummyLeaderboard[2].score} pts</p>
              </div>
            </div>
            
            {/* Rest of leaderboard */}
            <div className="space-y-4 mt-8">
              {dummyLeaderboard.map((user, index) => (
                <div 
                  key={index}
                  className={`flex items-center p-4 rounded-lg ${
                    user.isCurrentUser 
                      ? 'bg-primary/10 border border-primary/20' 
                      : 'bg-gray-50 dark:bg-gray-800/30'
                  }`}
                >
                  <div className="w-10 font-bold text-gray-500 dark:text-gray-400">
                    #{user.rank}
                  </div>
                  <Avatar className="mr-4">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className={`font-medium ${user.isCurrentUser ? 'text-primary' : ''}`}>
                      {user.name}
                    </p>
                  </div>
                  <div className="font-medium">{user.score} pts</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
