'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"

export function SignupForm() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [showOTPPopup, setShowOTPPopup] = useState(false)

  const handlePhoneSubmit = (e) => {
    e.preventDefault()
    console.log('Phone number submitted:', phoneNumber)
    setShowOTPPopup(true)
  }

  const handleOTPSubmit = (otp) => {
    console.log('OTP submitted:', otp)
    setShowOTPPopup(false)
  }

  const handleGoogleSignIn = () => {
    console.log('Sign in with Google clicked')
  }

  return (
    (<div
      className="max-w-md mx-auto mt-8 p-6 rounded-lg shadow-md bg-gradient-to-br from-[#A779F8] to-[#6583F7]">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">Sign Up</h2>
      <form onSubmit={handlePhoneSubmit} className="space-y-4">
        <div>
          <Label htmlFor="phone" className="text-white mb-1 block">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            className="bg-white text-gray-900 placeholder-gray-500 border-white/20" />
        </div>
        <Button
          type="submit"
          className="w-full bg-[#A779F8] hover:bg-[#9665E3] text-white">
          Get OTP
        </Button>
      </form>
      <div className="mt-4">
        <Button
          variant="outline"
          className="w-full bg-[#6583F7] hover:bg-[#5470E3] text-white border-white/20"
          onClick={handleGoogleSignIn}>
          Sign in with Google
        </Button>
      </div>
      <Dialog open={showOTPPopup} onOpenChange={setShowOTPPopup}>
        <DialogContent className="bg-gradient-to-br from-[#A779F8] to-[#6583F7]">
          <DialogHeader>
            <DialogTitle className="text-white">Enter OTP</DialogTitle>
          </DialogHeader>
          <InputOTP
            maxLength={6}
            onComplete={handleOTPSubmit}
            render={({ slots }) => (
              <InputOTPGroup>
                {slots.map((slot, index) => (
                  <InputOTPSlot key={index} {...slot} className="bg-white text-gray-900 border-white/20" />
                ))}
              </InputOTPGroup>
            )} />
        </DialogContent>
      </Dialog>
    </div>)
  );
}