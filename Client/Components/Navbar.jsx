"use client";

import { useState, useRef, useEffect } from "react";
import { UserCircle, LogIn, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/Context/Auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";

export default function Navbar() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [underlineStyle, setUnderlineStyle] = useState({});
	const navRefs = useRef({});
	const currentPath = usePathname();
	const initialActiveLink =
		currentPath === "/" ? "home" : currentPath.substring(1);
	const [activeLink, setActiveLink] = useState(initialActiveLink);

	const router = useRouter();
	const { user } = useAuth();

	

	const login = () => {
		router.push("/Signin/User");
	};

	const handleLinkClick = (link) => {
		setActiveLink(link);
	};

	useEffect(() => {
		const activeElement = navRefs.current[activeLink];
		if (activeElement) {
			setUnderlineStyle({
				width: `${activeElement.offsetWidth}px`,
				left: `${activeElement.offsetLeft - 64}px`,
			});
		}
	}, [activeLink]);

	return (
		<nav className="bg-gradient-to-r border-b-2 hidden md:block sticky top-0 z-50 from-[#A779F8] to-[#6583F7] p-4">
			<div className="container mx-auto flex justify-between items-center">
				{/* Logo and Title */}
				<div className="flex items-center space-x-2">
					<svg
						className="w-8 h-8 text-white"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M13 10V3L4 14h7v7l9-11h-7z"
						/>
					</svg>
					<span className=" text-xl font-bold">Cosmic</span>
				</div>

				{/* Navigation Links */}
				<div className="hidden md:flex space-x-16 relative">
					<Link
						href="/"
						className={`text-white hover:text-gray-200 py-2 ${
							activeLink === "home" ? "text-gray-200" : ""
						}`}
						onClick={() => handleLinkClick("home")}
						ref={(el) => (navRefs.current["home"] = el)}>
						Home
					</Link>
					<Link
						href="/Services"
						className={`text-white hover:text-gray-200 py-2 ${
							activeLink === "Services" ? "text-gray-200" : ""
						}`}
						onClick={() => handleLinkClick("Services")}
						ref={(el) => (navRefs.current["Services"] = el)}>
						Services
					</Link>
					<Link
						href="/Activity"
						className={`text-white hover:text-gray-200 py-2 ${
							activeLink === "Activity" ? "text-gray-200" : ""
						}`}
						onClick={() => handleLinkClick("Activity")}
						ref={(el) => (navRefs.current["Activity"] = el)}>
						Activity
					</Link>
					<div
						className="absolute bottom-0 h-0.5 bg-white transition-all duration-300 ease-in-out"
						style={underlineStyle}
					/>
				</div>

				{/* Profile and Login */}
				<div className="flex items-center space-x-4">
					{user ? (
						<div
							onClick={() => {
								router.push(`/Account/${user.uid}`);
							}}>
							<Avatar>
								<AvatarImage src={user.reloadUserInfo.photoUrl} />
								<AvatarFallback><img src="/dummy.webp" alt="" /></AvatarFallback>
							</Avatar>
						</div>
					) : (
						<Button
							onClick={login}
							variant="outline"
							className=" but px-4 py-4 rounded-md flex items-center">
							Login
						</Button>
					)}
				</div>
			</div>
		</nav>
	);
}
