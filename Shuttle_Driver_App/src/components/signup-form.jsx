"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

export function SignupForm() {
	const [date, setDate] = useState();
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [phoneCode, setPhoneCode] = useState(""); // State for phone code

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setPasswordError("Passwords don't match");
		} else {
			setPasswordError("");

			const formData = new FormData(e.target);
			const data = Object.fromEntries(formData.entries());

			data.phone = phoneCode + "-" + data.phone;
			data.dob = date ? format(date, "dd-MM-yyyy") : null;
			console.log(data);
		}
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const toggleConfirmPasswordVisibility = () => {
		setShowConfirmPassword(!showConfirmPassword);
	};

	return (
		<div className="flex items-center justify-center min-h-screen p-4">
			<div className="w-full max-w-md bg-[#1c1f2e] rounded-lg shadow-xl p-6 border border-[#2a2e3f]">
				<h2 className="text-2xl font-bold mb-6 text-center text-[#a479f8]">
					Sign Up
				</h2>
				<form className="space-y-4" onSubmit={handleSubmit}>
					<div className="space-y-2">
						<Label htmlFor="name" className="text-[#a479f8]">
							Name
						</Label>
						<Input
							id="name"
							name="name" // Add name attribute
							placeholder="John Doe"
							required
							className="bg-[#252837] border-[#3a3f55] text-white placeholder-gray-400"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="email" className="text-[#a479f8]">
							Email
						</Label>
						<Input
							id="email"
							name="email" // Add name attribute
							type="email"
							placeholder="john@example.com"
							required
							className="bg-[#252837] border-[#3a3f55] text-white placeholder-gray-400"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="phone" className="text-[#a479f8]">
							Phone Number
						</Label>
						<div className="flex space-x-2">
							<Select onValueChange={(value) => setPhoneCode(value)}>
								<SelectTrigger className="w-[100px] bg-[#252837] border-[#3a3f55] text-white">
									<SelectValue placeholder="Code" />
								</SelectTrigger>
								<SelectContent className="bg-[#252837] border-[#3a3f55] text-white">
									<SelectItem value="+1">+1</SelectItem>
									<SelectItem value="+44">+44</SelectItem>
									<SelectItem value="+91">+91</SelectItem>
									{/* Add more country codes as needed */}
								</SelectContent>
							</Select>
							<Input
								id="phone"
								name="phone" // Add name attribute
								type="tel"
								placeholder="123-456-7890"
								className="flex-1 bg-[#252837] border-[#3a3f55] text-white placeholder-gray-400"
								required
							/>
						</div>
					</div>

					<div className="space-y-2">
						<Label htmlFor="dob" className="text-[#a479f8]">
							Date of Birth
						</Label>
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant={"outline"}
									className={`w-full justify-start text-left font-normal bg-[#252837] border-[#3a3f55] text-white ${
										!date && "text-gray-400"
									}`}>
									<CalendarIcon className="mr-2 h-4 w-4" />
									{date ? format(date, "PPP") : <span>Pick a date</span>}
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-auto p-0 bg-[#252837] border-[#3a3f55]">
								<Calendar
									mode="single"
									selected={date}
									onSelect={setDate}
									initialFocus
									className="bg-[#252837] text-white"
								/>
							</PopoverContent>
						</Popover>
					</div>

					<div className="space-y-2">
						<Label htmlFor="car-number" className="text-[#a479f8]">
							Car Number
						</Label>
						<Input
							id="car-number"
							name="car" // Add name attribute
							placeholder="ABC-1234"
							required
							className="bg-[#252837] border-[#3a3f55] text-white placeholder-gray-400"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="password" className="text-[#a479f8]">
							Password
						</Label>
						<div className="relative">
							<Input
								id="password"
								name="password" // Add name attribute
								type={showPassword ? "text" : "password"}
								required
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

					<div className="space-y-2">
						<Label htmlFor="confirm-password" className="text-[#a479f8]">
							Confirm Password
						</Label>
						<div className="relative">
							<Input
								id="confirm-password"
								name="confirmpassword" // Add name attribute
								type={showConfirmPassword ? "text" : "password"}
								required
								className="bg-[#252837] border-[#3a3f55] text-white pr-10"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
							<Button
								type="button"
								variant="ghost"
								size="icon"
								className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
								onClick={toggleConfirmPasswordVisibility}>
								{showConfirmPassword ? (
									<EyeOffIcon className="h-4 w-4" />
								) : (
									<EyeIcon className="h-4 w-4" />
								)}
							</Button>
						</div>
					</div>

					{passwordError && (
						<p className="text-red-500 text-sm">{passwordError}</p>
					)}

					<Button
						type="submit"
						className="w-full bg-[#a479f8] text-white hover:bg-[#8a5cf6]">
						Sign Up
					</Button>
				</form>
			</div>
		</div>
	);
}
