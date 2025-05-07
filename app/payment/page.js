"use client"
import PaymentComponent from '@/components/payment/PaymentComponent'
import PaymentConfirmation from '@/components/payment/PaymentConfirmation'
import React, { useState } from 'react'


export default function page() {
    const [billed, setBilled] = useState("")
    const [paymentMethod, setPaymentMethod] = useState("")
    const [amount, setAmount] = useState(100) 
  return (
    <main className='bg-white min-h-screen overflow-auto'>
      <div className='flex min-h-screen overflow-auto'>
        {/* Left Side */}
        <PaymentComponent billed={billed} setBilled={setBilled} paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} amount={amount} setAmount={setAmount} />
        
        {/* Right Side */}
        <PaymentConfirmation billed={billed} setBilled={setBilled} paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} amount={amount} />
      </div>
    </main>
  )
}
