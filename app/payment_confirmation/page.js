"use client"
import React, { useEffect } from 'react'
import Lottie from "lottie-react";
import Payment from "@/components/lottie/payment.json";

export default function PaymentConfirmation() {

    useEffect(() => {
        // i want to push user to his dashboard when back button is pressed
        window.onpopstate = () => {
            window.location.href = "/signin"
        }
    })
  return (
    <main className='flex items-center justify-center min-h-screen'>
      <Lottie className='w-[100rem]' animationData={Payment} loop={false} />
    </main>
  )
}
