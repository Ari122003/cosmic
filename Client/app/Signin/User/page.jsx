"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter } from "next/navigation";
import { useSignup } from "@/Context/Signup";

export default function SignUpForm() {
	const [phoneNumber, setPhoneNumber] = useState("");
	const [showOTPPopup, setShowOTPPopup] = useState(false);

	const router = useRouter();
	const { loginWithGoogle } = useSignup();

	async function Login() {
		try {
			const res = await loginWithGoogle();

			console.log(res);

			router.push(`/Account/${res.uid}`);
		} catch (error) {
			console.log(error.message);
		}
	}

	const handlePhoneSubmit = (e) => {
		e.preventDefault();
		console.log("Phone number submitted:", phoneNumber);
		setShowOTPPopup(true);
	};

	const handleOTPSubmit = (otp) => {
		console.log("OTP submitted:", otp);
		setShowOTPPopup(false);
	};

	const handleGoogleSignIn = () => {
		console.log("Sign in with Google clicked");
	};

	return (
		<div className="min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
			<div className="w-full max-w-md">
				<div className="p-4 sm:p-6 rounded-lg shadow-md bg-gradient-to-br from-[#A779F8] to-[#6583F7]">
					<h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center text-black">
						Sign Up
					</h2>
					<form onSubmit={handlePhoneSubmit} className="space-y-4">
						<div>
							<Label
								htmlFor="phone"
								className="text-black mb-1 block text-sm sm:text-base">
								Phone Number
							</Label>
							<Input
								id="phone"
								type="tel"
								placeholder="Enter your phone number"
								value={phoneNumber}
								onChange={(e) => setPhoneNumber(e.target.value)}
								required
								className="bg-white text-gray-900 placeholder-gray-500 border-white/20 text-sm sm:text-base py-2 sm:py-3"
							/>
						</div>
						<div className="flex justify-center">
							<Button
								type="submit"
								variant="outline"
								className="but text-sm sm:text-base py-6 sm:py-3">
								Submit
							</Button>
						</div>
					</form>
					<div className="mt-4 flex justify-center">
						<button
							onClick={Login}
							class="flex items-center justify-center max-w-xs px-6 py-2 text-sm font-bold text-center text-gray-700 uppercase transition-all duration-600 ease-linear bg-white border border-gray-400 rounded-lg gap-3 hover:scale-105">
							<svg
								class="h-6"
								xmlns="http://www.w3.org/2000/svg"
								preserveAspectRatio="xMidYMid"
								viewBox="0 0 256 262">
								<path
									fill="#4285F4"
									d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
								<path
									fill="#34A853"
									d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
								<path
									fill="#FBBC05"
									d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path>
								<path
									fill="#EB4335"
									d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
							</svg>
							Continue with Google
						</button>
					</div>
				</div>
			</div>

			<Dialog open={showOTPPopup} onOpenChange={setShowOTPPopup}>
				<DialogContent className="bg-gradient-to-br from-[#A779F8] to-[#6583F7] sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle className="text-white text-lg sm:text-xl">
							Enter OTP
						</DialogTitle>
					</DialogHeader>
					<InputOTP
						maxLength={6}
						onComplete={handleOTPSubmit}
						render={({ slots }) => (
							<InputOTPGroup className="gap-2 sm:gap-3">
								{slots.map((slot, index) => (
									<InputOTPSlot
										key={index}
										{...slot}
										className="bg-white text-gray-900 border-white/20 w-8 h-10 sm:w-10 sm:h-12 text-sm sm:text-base"
									/>
								))}
							</InputOTPGroup>
						)}
					/>
				</DialogContent>
			</Dialog>
		</div>
	);
}
