"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeftRight, Search } from "lucide-react";
import { Badge } from "@/Components/ui/badge";

const mockShuttleRoutes = [
	{ id: 1, start: "New York", destination: "Boston", travelTime: "4h 30m" },
	{
		id: 2,
		start: "Los Angeles",
		destination: "San Francisco",
		travelTime: "6h 15m",
	},
	{ id: 3, start: "Chicago", destination: "Detroit", travelTime: "4h 45m" },
	{ id: 4, start: "Miami", destination: "Orlando", travelTime: "3h 30m" },
	{ id: 5, start: "Seattle", destination: "Portland", travelTime: "3h 15m" },
];

export function ShuttleDashboard() {
	const [from, setFrom] = useState("");
	const [to, setTo] = useState("");
	const [isRotated, setIsRotated] = useState(false);

	const handleSwap = () => {
		setFrom(to);
		setTo(from);
		setIsRotated(!isRotated);
	};

	return (
		<div className="min-h-screen bg-[#131621] text-[#a479f8] p-4 sm:p-8 md:mx-20">
			<h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-[#6583f7]">
				Shuttle Search Dashboard
			</h1>
			<div className="mb-6 sm:mb-8 flex flex-col gap-4">
				<div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-end">
					<div className="flex-1">
						<label htmlFor="from" className="block mb-2 text-sm font-medium">
							From
						</label>
						<Input
							id="from"
							placeholder="Enter departure location"
							value={from}
							onChange={(e) => setFrom(e.target.value)}
							className="bg-[#1c2133] border-[#2c3347] text-[#a479f8]"
						/>
					</div>
					<div className="flex justify-center">
						<Button
							onClick={handleSwap}
							className="bg-[#1c2133] border-[#2c3347] text-[#a479f8] hover:bg-[#2c3347] self-stretch w-auto sm:self-auto"
							aria-label="Swap from and to locations">
							<ArrowLeftRight
								className={`h-5 w-5 transition-transform duration-300 ${
									isRotated ? "rotate-180" : ""
								}`}
							/>
						</Button>
					</div>
					<div className="flex-1">
						<label htmlFor="to" className="block mb-2 text-sm font-medium">
							To
						</label>
						<Input
							id="to"
							placeholder="Enter destination"
							value={to}
							onChange={(e) => setTo(e.target.value)}
							className="bg-[#1c2133] border-[#2c3347] text-[#a479f8]"
						/>
					</div>
				</div>
				<div className="flex justify-center my-3">
					<Button className="bg-[#6583f7] text-white hover:bg-[#5470e6] ">
						<Search className="mr-2 h-4 w-4" /> Search
					</Button>
				</div>
			</div>
			<h2 className="text-xl sm:text-2xl font-semibold mb-4 text-[#6583f7]">
				Routes near you
			</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{mockShuttleRoutes.map((route) => (
					<Card
						key={route.id}
						className="relative bg-[#1c2133] border-[#2c3347]">
						<CardHeader className="relative pr-20">
							<CardTitle className="text-[#6583f7] text-lg break-words">
								{route.start} to {route.destination}
							</CardTitle>
							<div className="absolute top-2 right-2 bg-white text-white text-xs md:text-sm lg:text-base font-semibold  rounded-md">
								<Badge variant="outline">Badge</Badge>
							</div>
						</CardHeader>
						<CardContent>
							<p className="text-[#a479f8]">Travel Time: {route.travelTime}</p>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
