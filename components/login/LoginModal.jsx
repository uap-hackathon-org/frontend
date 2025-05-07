"use client"
import { Button } from "@/components/ui/components/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/components/dialog"
import { Input } from "@/components/ui/components/input"
import { FcGoogle } from 'react-icons/fc'
import Link from 'next/link'
import { useState } from "react"
import { useRouter } from 'next/navigation';
import { Toaster } from "@/components/ui/components/toaster"
import { useToast } from '@/hooks/use-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { push_messaging_token } from '@/lib/push-message';

export function LoginModal() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()
    const { toast } = useToast()

    async function loginHandler() {
        setLoading(true)
        console.log("whats Wrong!")
        const url = `${process.env.NEXT_PUBLIC_ENDPOINT}/auth/signin`
        const data = {
            email,
            password
        }
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "ngrok-skip-browser-warning": "69420"
            },
            body: JSON.stringify(data)
        })
        const ans = await response.json()
        const id = ans?.user_id
        console.log(ans)
        if(id !=null) {
            console.log(id)

            localStorage.setItem('token', JSON.stringify(ans))
            // push_messaging_token();
            if(ans.user_role == "USER") {
              console.log("User")
              setTimeout(() => {
                router.push('/dashboard/' + id)
              }, 500)
            }
            else {
                router.push(`/admin/dashboard`)
            }
            router.push('/')

        }
        if(ans.detail == "error") {
        toast({
            title: "Invalid Credentials",
            description : `Please Re-Enter Your Email and Password`
        })
      }
      setLoading(false)
    }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="text" className="text-text-primary font-bold">Sign In</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] p-0 gap-0 bg-white dark:bg-menu-bg border border-gray-200 dark:border-gray-800 shadow-xl">
        <div className="p-8 flex flex-col items-center bg-white dark:bg-menu-bg rounded-lg">
          <h2 className="text-xl font-semibold mb-1 text-gray-900 dark:text-white">Please sign in to continue</h2>

          <button className="w-full mt-6 flex items-center justify-center gap-2 py-2.5 border border-gray-300 dark:border-gray-700 rounded-full bg-background transition-colors">
            <FcGoogle size={20} />
            <span className="text-text-primary">Continue with Google</span>
          </button>

          <div className="w-full flex items-center gap-2 my-4">
            <div className="flex-1 h-[1px] bg-gray-200 dark:bg-gray-700"></div>
            <span className="text-sm text-gray-500 dark:text-gray-400">or</span>
            <div className="flex-1 h-[1px] bg-gray-200 dark:bg-gray-700"></div>
          </div>

          <div className="w-full flex flex-col gap-4 my-4">
            <Input 
                type="email" 
                value={email}
                rounded
                size="lg"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="placeholder:text-sm"
            />

            <div className="relative">
              <Input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  size="lg"
                  rounded
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                  className="mb-4 placeholder:text-sm"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[40%] -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </button>
            </div>
          </div>

          <Button 
            center
            variant="primary" 
            onClick={loginHandler}
          >
            Sign In
          </Button>

          <p className="my-4 text-sm text-gray-600 dark:text-gray-400">
            New to us?{" "}
            <Link href="/signup" className="text-primary hover:underline font-medium">
              Create an account
            </Link>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default LoginModal
