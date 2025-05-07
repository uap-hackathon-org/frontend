"use client"
import { Caveat, Kameron, Nunito } from 'next/font/google'
import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { usePathname, useRouter } from 'next/navigation'
import { BsFillBellFill } from 'react-icons/bs'
import { Button } from '../ui/components/button'
import ThemeChanger from '../utilities/ThemeChanger'
import TabItem from '../ui/components/tab-item'
import LoginModal from '../login/LoginModal'
import Notification from '../websocket/Notification'
import LanguageSwitcher from '../utilities/LanguageSwitcher'
import { useLanguage } from '@/lib/language/LanguageContext'

const kameron = Kameron({ subsets: ['latin'], weight: '700' })

export default function Hero({ landing = true }) {
  const pathname = usePathname()
  const [signedIn, setSignedIn] = useState(true)
  const [token, setToken] = useState(false)
  const [nav, setNav] = useState(false)
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0); 
  const notificationRef = useRef(null);
  const { t } = useLanguage();

  useEffect(() => {
    let token = localStorage.getItem("token")
    if(token) {
      setSignedIn(true)
    }
    if(!token) {
      return
    }
    // token = JSON.parse(token)
    
    setToken(token)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNav = () => {
      setNav(!nav)
  }
  function signOutHandler() {
    localStorage.removeItem('token');
    router.push('/')
    setSignedIn(false)
  }

  function TokenCheckHandler(url) {
    let token = localStorage.getItem("token")
    router.push(url)
  }
  return (
    <>
      <div className='flex justify-between items-center px-8 py-4 text-white w-[90%] mx-auto'>  
        {/* Logo - Left */}
        <div className='flex-none'>
          <Link href={'/'} className={`${kameron.className} text-2xl text-text-primary font-black`}>
            <h1>{t('appName')}</h1>
          </Link>
        </div>

        {/* Navigation - Center */}
        <div className='flex-1 flex justify-center space-x-4'>
          <TabItem to="/" value={t('home')} className='mx-4' />
          <TabItem to="/companies" value={t('companies')} className='mx-4' />
          <TabItem to="/workshops" value={t('workshops')} className='mx-4' />
          <TabItem to="/micro-tasks" value={t('microTasks')} className='mx-4' />
        </div>

        {/* Auth Controls - Right */}
        <div className='flex-none flex items-center space-x-4'>
          <LanguageSwitcher />
          <ThemeChanger />
          {!signedIn ? (
            <>
              <LoginModal />
              {landing && <Link href={"/signup"}><Button size="sm" variant="primary">{t('signUp')}</Button></Link>}
            </>
          ) : (
            <div className='flex items-center space-x-5'>
              <Notification />
              <DropdownMenu>
                <DropdownMenuTrigger className='focus:outline-none outline-none border-none'>
                  <div className='flex items-center space-x-2 p-2 transition-colors duration-200'>
                    <img 
                      src="/profile.png" 
                      alt="Profile" 
                      className="w-8 h-8 rounded-full"
                    />
                    <AiOutlineMenu className='text-xl text-gray-600 dark:text-gray-300' />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='bg-white dark:bg-gray-800 mr-8 mt-2 p-2 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 min-w-[200px] z-50'>
                  <div className='px-4 py-3 border-b border-gray-200 dark:border-gray-700'>
                    <p className='text-sm font-medium text-gray-900 dark:text-white'>{t('signedInAs')}</p>
                    <p className='text-sm text-gray-500 dark:text-gray-400 truncate'>user@example.com</p>
                  </div>
                  
                  <div className='py-2'>
                    <DropdownMenuItem className='px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer transition-colors duration-200'>
                      <Link href={`/dashboard/${token?.id}/review`} className='flex items-center space-x-2 text-gray-700 dark:text-gray-200'>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span>{t('dashboard')}</span>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem className='px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer transition-colors duration-200'>
                      <Link href="/profile" className='flex items-center space-x-2 text-gray-700 dark:text-gray-200'>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>{t('profile')}</span>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem className='px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer transition-colors duration-200'>
                      <Link href="/settings" className='flex items-center space-x-2 text-gray-700 dark:text-gray-200'>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{t('settings')}</span>
                      </Link>
                    </DropdownMenuItem>
                  </div>

                  <div className='border-t border-gray-200 dark:border-gray-700 mt-2 pt-2'>
                    <DropdownMenuItem className='px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer transition-colors duration-200'>
                      <Button
                        variant="outline"
                        onClick={signOutHandler} 
                        className='flex items-center space-x-2 text-red-600 dark:text-red-400 w-full'
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>{t('signOut')}</span>
                      </Button>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
