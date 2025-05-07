"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter, useParams } from 'next/navigation'
import { LuLayoutDashboard } from "react-icons/lu";
import { CiTimer } from "react-icons/ci";
import { TbChartHistogram } from "react-icons/tb";
import { CgCompressLeft } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { Button } from '@/components/ui/components/button'
import LinkItem from '@/components/ui/components/LinkItem'
import Hero from '@/components/utils/Hero';
import Image from 'next/image';
import { Toaster } from "@/components/ui/components/toaster"
import { motion } from 'framer-motion';

export default function RootLayout({ children }) {
  const pathname = usePathname()
  const router = useRouter()
  const params = useParams()
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  const navItems = [
    {
      title: "Dashboard",
      to: `/dashboard/${params.id}`,
      icon: <LuLayoutDashboard size={20} />,
    },
    {
      title: "Thor Stake",
      to: `/dashboard/${params.id}/thor-stake`,
      icon: <CiTimer size={20} />,
    },
    {
      title: "Pending Liquidity",
      to: `/dashboard/${params.id}/pending-liquidity`,
      icon: <CiTimer size={20} />,
    },
    {
      title: "Stats",
      to: `/dashboard/${params.id}/stats`,
      icon: <TbChartHistogram size={20} />,
    },
  ]

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  const handleSignOut = () => {
    localStorage.removeItem('token')
    router.push('/')
  }
  
  const [profile, setProfile] = useState(null)
  useEffect(() => {
    async function getProfile() {
      let token = localStorage.getItem("token")
      if (!token) {
        return
      }

      token = JSON.parse(token)
      const endpoint = process.env.NEXT_PUBLIC_ENDPOINT
      const response = await fetch(`${endpoint}/user/me`, {
        method: 'GET',
        headers : {'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token.access_token,
        "ngrok-skip-browser-warning": "69420"
      }
    })
      const ans = await response.json()        
      setProfile(ans)   
    }
    getProfile()
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-menu-secondary">
      <div className="flex flex-1">
        {/* Sidebar */}
        <motion.aside 
          className={`${isSidebarCollapsed ? 'w-20' : 'w-72'} bg-white dark:bg-dark-1 text-gray-900 dark:text-white border-r border-gray-200 dark:border-gray-800 flex flex-col h-[calc(100vh-84px)] transition-all duration-300 ease-in-out`}
          initial={false}
          animate={{ width: isSidebarCollapsed ? 80 : 288 }}
        >
          {/* User Profile */}
          <div className={`p-4 ${isSidebarCollapsed ? 'flex justify-center' : 'border-b border-gray-200 dark:border-gray-800'}`}>
            {isSidebarCollapsed ? (
              <div className="flex justify-center">
                <Image 
                  src="/profile.png" 
                  alt="Thor" 
                  width={40} 
                  height={40} 
                  className="rounded-full border-2 border-primary/20"
                />
              </div>
            ) : (
              <div className="flex items-center gap-3 p-2">
                <Image 
                  src="/profile.png" 
                  alt="Thor" 
                  width={48} 
                  height={48} 
                  className="rounded-full border-2 border-primary/20"
                />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Thor</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Premium User</p>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto py-6 px-3">
            <div className="space-y-1.5">
              {navItems.map((item) => (
                <Link 
                  key={item.to}
                  href={item.to}
                  className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-start'} px-3 py-2.5 rounded-lg transition-colors ${
                    pathname === item.to 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50'
                  }`}
                >
                  <span className={`${pathname === item.to ? 'text-primary' : ''}`}>
                    {item.icon}
                  </span>
                  {!isSidebarCollapsed && (
                    <span className={`ml-3 ${pathname === item.to ? 'font-medium' : ''}`}>
                      {item.title}
                    </span>
                  )}
                </Link>
              ))}
              
              {/* Collapse Sidebar Button */}
              <button
                onClick={handleToggleSidebar}
                className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-start'} w-full px-3 py-2.5 rounded-lg transition-colors text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50 mt-6`}
              >
                <span className="transform transition-transform duration-300" style={{ transform: isSidebarCollapsed ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  <CgCompressLeft size={20} />
                </span>
                {!isSidebarCollapsed && (
                  <span className="ml-3">Collapse Sidebar</span>
                )}
              </button>
            </div>
          </nav>

          {/* Sign Out Button */}
          <div className={`p-4 ${isSidebarCollapsed ? '' : 'border-t border-gray-200 dark:border-gray-800'}`}>
            <button 
              onClick={handleSignOut}
              className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-start'} w-full px-3 py-2.5 rounded-lg transition-colors text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-red-500 dark:hover:text-red-400`}
            >
              <FiLogOut size={20} />
              {!isSidebarCollapsed && (
                <span className="ml-3">Sign Out</span>
              )}
            </button>
          </div>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 bg-gray-50 dark:bg-menu-secondary overflow-auto p-6">
          {children}
        </main>
      </div>
      <Toaster />
    </div>
  )
}
