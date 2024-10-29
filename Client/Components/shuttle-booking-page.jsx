"use client";

import Image from "next/image";
import { MapPin, Clock, DollarSign } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

export default function ShuttleBooking() {
	return (
		<div className="min-h-screen bg-[#131621] text-white md:mx-20">
			<div className="container mx-auto px-4 py-8">
				<h1 className="text-3xl md:text-4xl font-bold text-[#a479f8] mb-8">
					Shuttle Booking
				</h1>

				<Card className="bg-[#1c1f2e] border-gray-700 mb-8">
					<CardHeader>
						<CardTitle className="text-[#a479f8]">Map</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="bg-gray-700 h-[60vh] flex items-center justify-center">
							<p>Map will be displayed here</p>
						</div>
					</CardContent>
				</Card>

				<Card className="bg-[#1c1f2e] border-gray-700">
					<CardHeader>
						<CardTitle className="text-white">Booking Details</CardTitle>
					</CardHeader>
					<CardContent className="space-y-6">
						<Image
							src="/shuttle.jpeg"
							alt="Shuttle"
							width={600}
							height={300}
							className=" h-48 w-full object-cover object-center rounded-lg"
						/>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white">
							<div>
								<h3 className="text-lg font-semibold mb-2  text-[#a479f8]">
									Shuttle ID
								</h3>
								<p>SH-12345</p>
							</div>
							<div>
								<h3 className="text-lg font-semibold mb-2 flex items-center text-[#a479f8]">
									<MapPin className="mr-2" /> Pickup Location
								</h3>
								<p>123 Main St, City Center</p>
							</div>
							<div>
								<h3 className="text-lg font-semibold mb-2 flex items-center text-[#a479f8]">
									<Clock className="mr-2" /> Pickup Time
								</h3>
								<p>09:00 AM</p>
							</div>
							<div>
								<h3 className="text-lg font-semibold mb-2 flex items-center text-[#a479f8]">
									<MapPin className="mr-2" /> Drop Location
								</h3>
								<p>456 Park Ave, Downtown</p>
							</div>
							<div>
								<h3 className="text-lg font-semibold mb-2 flex items-center text-[#a479f8]">
									<Clock className="mr-2" /> Drop Time
								</h3>
								<p>10:30 AM</p>
							</div>
							<div>
								<h3 className="text-lg font-semibold mb-2 flex items-center text-[#a479f8]">
									<DollarSign className="mr-2" /> Fare
								</h3>
								<p>$25.00</p>
							</div>
						</div>
						<div className="flex justify-center">
							<Button className=" bg-[#a479f8] hover:bg-[#8a5cf5] text-white mt-4">
								Proceed to Payment
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
