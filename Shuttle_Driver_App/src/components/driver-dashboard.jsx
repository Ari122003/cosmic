"use client";
import { useState } from "react";
import { Settings, HelpCircle, ChevronRight, Menu, X } from "lucide-react";

const trips = [
	{
		shuttle_id: "SH001",
		starting: "Airport",
		destination: "Downtown",
		time: "14:00",
		passengers: 4,
	},
	{
		shuttle_id: "SH002",
		starting: "Hotel A",
		destination: "Convention Center",
		time: "15:30",
		passengers: 6,
	},
	{
		shuttle_id: "SH003",
		starting: "Mall",
		destination: "Beach Resort",
		time: "17:00",
		passengers: 3,
	},
	{
		shuttle_id: "SH004",
		starting: "University",
		destination: "Train Station",
		time: "18:30",
		passengers: 5,
	},
];

export function DriverDashboard() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	return (
		<div className="min-h-screen bg-[#131621] text-[#a479f8] flex flex-col md:flex-row">
			{/* Mobile Header */}
			<header className="md:hidden flex justify-between items-center p-4 border-b border-[#a479f8]/20">
				<h1 className="text-xl text2 font-bold">Shuttle Driver</h1>
				<button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
					{isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
				</button>
			</header>
			{/* Sidebar */}
			<aside
				className={`${
					isSidebarOpen ? "fixed top-[64px] left-0 right-0 z-10" : "hidden"
				} md:block w-full md:w-64 p-6 border-b md:border-r border-[#a479f8]/20 bg-[#131621]`}>
				<h1 className="text-2xl text2 font-bold mb-8 hidden md:block">
					Shuttle Driver
				</h1>
				<nav className="space-y-4">
					<a
						href="#"
						className="flex items-center space-x-2 p-2 rounded hover:bg-[#a479f8]/10">
						<Settings size={20} />
						<span>Settings</span>
					</a>
					<a
						href="#"
						className="flex items-center space-x-2 p-2 rounded hover:bg-[#a479f8]/10">
						<HelpCircle size={20} />
						<span>Help</span>
					</a>
				</nav>
			</aside>

			{/* Main content */}
			<main className="flex-1 p-4 md:p-8">
				<header className="mb-6 md:mb-8">
					<h2 className="text-2xl md:text-3xl text2 font-bold">
						Welcome, John Doe
					</h2>
					<p className="text-[#a479f8]/70">Here are your upcoming trips</p>
				</header>

				{/* Trips list */}
				<div className="space-y-4">
					{trips.map((trip) => (
						<div
							key={trip.shuttle_id}
							className="bg-[#1c1f2e] p-4 rounded-lg flex flex-col md:flex-row md:items-center justify-between hover:bg-[#1c1f2e]/80 transition-colors">
							<div>
								<h3 className="font-semibold text2">
									{trip.starting} to {trip.destination}
								</h3>
								<p className="text-sm text-[#a479f8]/70">
									Shuttle ID: {trip.shuttle_id}
								</p>
								<p className="text-sm text-[#a479f8]/70">Time: {trip.time}</p>
								<p className="text-sm text-[#a479f8]/70">
									Passengers: {trip.passengers}
								</p>
							</div>
							<ChevronRight
								size={24}
								className="text-[#a479f8]/50 hidden md:block"
							/>
						</div>
					))}
				</div>
			</main>
		</div>
	);
}
