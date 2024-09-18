"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
	Users,
	Settings,
	HelpCircle,
	LogOut,
	Upload,
	X,
	Menu,
	Pencil,
} from "lucide-react";

export default function UserAccount({ data, logOut }) {
	const [name, setName] = useState("John Doe");
	const [image, setImage] = useState("/placeholder.svg?height=128&width=128");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [tempName, setTempName] = useState(name);
	const modalRef = useRef(null);

	const handleImageUpload = (event) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				setImage(e.target?.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleImageError = (event) => {
		event.currentTarget.src = "/cab.avif";
	};

	const openModal = () => {
		setTempName(name);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const handleNameChange = () => {
		setName(tempName);
		closeModal();
	};

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	useEffect(() => {
		const handleOutsideClick = (event) => {
			if (modalRef.current && !modalRef.current.contains(event.target)) {
				closeModal();
			}
		};

		const handleEscapeKey = (event) => {
			if (event.key === "Escape") {
				closeModal();
			}
		};

		if (isModalOpen) {
			document.addEventListener("mousedown", handleOutsideClick);
			document.addEventListener("keydown", handleEscapeKey);
		}

		return () => {
			document.removeEventListener("mousedown", handleOutsideClick);
			document.removeEventListener("keydown", handleEscapeKey);
		};
	}, [isModalOpen]);

	return (
		<div className="min-h-screen ">
			{/* Header with Mobile Menu Button - Hidden on laptop and desktop */}
			<header className="md:hidden fixed top-0 left-0 right-0 z-20 bg-white shadow-md">
				<div className="flex justify-between items-center p-4">
					<Button
						variant="ghost"
						onClick={toggleMobileMenu}
						aria-label="Toggle menu">
						<Menu className="h-6 w-6" />
					</Button>
				</div>
			</header>

			{/* Sidebar */}
			<aside
				className={`
        fixed top-0 md:top-16  bg-white md:bg-transparent left-0 bottom-0 z-30 w-64  shadow-md transition-transform duration-300 ease-in-out transform
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}>
				<div className="p-6 text-black md:text-white">
					<nav className="space-y-4">
						<Button variant="ghost" className="w-full justify-start">
							<Users className="mr-2 h-4 w-4" />
							Passengers
						</Button>
						<Button variant="ghost" className="w-full justify-start">
							<Settings className="mr-2 h-4 w-4" />
							Settings
						</Button>
						<Button variant="ghost" className="w-full justify-start">
							<HelpCircle className="mr-2 h-4 w-4" />
							Help
						</Button>
						<Separator />
						<Button
							variant="ghost"
							className="w-full font-bold justify-start text-red-500 hover:text-red-600">
							<LogOut className="mr-2 h-4 w-4" />
							Logout
						</Button>
					</nav>
				</div>
			</aside>

			{/* Content Area */}
			<main className="md:ml-72 md:mr-40 pt-16 md:pt-0">
				<div className="p-4 md:p-10">
					<h1 className="text-2xl md:text-3xl text font-bold mb-6">
						User Account
					</h1>
					<div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
						<div className="flex flex-col md:flex-row items-center md:space-x-6 mb-6">
							<div className="relative mb-4 md:mb-0">
								<div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
									<img
										src={data && data.Image}
										alt="Profile"
										className="w-full h-full object-cover"
										onError={handleImageError}
									/>
								</div>
								<Label
									htmlFor="image-upload"
									className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer">
									<Upload className="h-4 w-4" />
									<Input
										id="image-upload"
										type="file"
										accept="image/*"
										className="hidden"
										onChange={handleImageUpload}
									/>
								</Label>
							</div>
							<div className="text-center md:text-left">
								<Label className="text-sm font-medium text-gray-700">
									{data && data.Name}
								</Label>
								<div className="flex items-center mt-1 justify-center md:justify-start">
									<p className="font-medium">{name}</p>

									<div className="ml-3" onClick={openModal}>
										<Pencil />
									</div>
								</div>
							</div>
						</div>
						<div className="space-y-4">
							<div>
								<Label className="text-sm font-medium text-gray-700">
									Email
								</Label>
								<p className="mt-1"> {data && data.Email}</p>
							</div>
							<div>
								<Label className="text-sm font-medium text-gray-700">
									Phone Number
								</Label>
								<p className="mt-1">
									{" "}
									{data && data.Phone ? data.Phone : "Add phone number"}
								</p>
							</div>
						</div>
					</div>
				</div>
			</main>

			{/* Overlay for Mobile Menu */}
			{isMobileMenuOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
					onClick={toggleMobileMenu}
					aria-hidden="true"
				/>
			)}

			{/* Name Change Modal */}
			{isModalOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
					<div
						ref={modalRef}
						className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-xl font-bold">Change Name</h2>
							<Button variant="ghost" size="icon" onClick={closeModal}>
								<X className="h-4 w-4" />
							</Button>
						</div>
						<Label
							htmlFor="new-name"
							className="text-sm font-medium text-gray-700">
							New Name
						</Label>
						<Input
							id="new-name"
							value={tempName}
							onChange={(e) => setTempName(e.target.value)}
							className="mt-1 mb-4"
						/>
						<div className="flex justify-end space-x-2">
							<Button variant="outline" onClick={closeModal}>
								Cancel
							</Button>
							<Button onClick={handleNameChange}>Save</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
