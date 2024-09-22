"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export default function LoginForm({ signIn }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const data = Object.fromEntries(formData.entries());

		signIn(data);
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-[#131621] p-4">
			<div className="w-full max-w-md bg-[#1c1f2e] rounded-lg shadow-xl p-6 border border-[#2a2e3f]">
				<h2 className="text-2xl font-bold mb-6 text-center text-[#a479f8]">
					Login
				</h2>
				<form className="space-y-4" onSubmit={handleSubmit}>
					<div className="space-y-2">
						<Label htmlFor="email" className="text-[#a479f8]">
							Email
						</Label>
						<Input
							id="email"
							type="email"
							name="email"
							placeholder="john@example.com"
							required
							className="bg-[#252837] border-[#3a3f55] text-white placeholder-gray-400"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="password" className="text-[#a479f8]">
							Password
						</Label>
						<div className="relative">
							<Input
								id="password"
								type={showPassword ? "text" : "password"}
								required
								name="password"
								className="bg-[#252837] border-[#3a3f55] text-white pr-10"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<Button
								type="button"
								variant="ghost"
								size="icon"
								className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
								onClick={togglePasswordVisibility}>
								{showPassword ? (
									<EyeOffIcon className="h-4 w-4" />
								) : (
									<EyeIcon className="h-4 w-4" />
								)}
							</Button>
						</div>
					</div>

					<Button
						type="submit"
						className="w-full bg-[#a479f8] text-white hover:bg-[#8a5cf6]">
						Log In
					</Button>
				</form>
			</div>
		</div>
	);
}
