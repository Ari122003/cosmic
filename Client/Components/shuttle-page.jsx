"use client";

import { useState, useEffect } from "react";
import { format, addDays, isSunday, getDay } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";

// Dummy data for shuttles
const shuttles = [
	{
		id: 1,
		pickup: "City Center",
		drop: "Airport",
		pickupTime: "10:00 AM",
		dropTime: "11:30 AM",
		fare: "$25",
		seatsAvailable: 5,
	},
	{
		id: 2,
		pickup: "Suburb",
		drop: "Downtown",
		pickupTime: "09:30 AM",
		dropTime: "10:45 AM",
		fare: "$20",
		seatsAvailable: 3,
	},
	{
		id: 3,
		pickup: "Beach",
		drop: "Mountain Resort",
		pickupTime: "08:00 AM",
		dropTime: "10:00 AM",
		fare: "$35",
		seatsAvailable: 2,
	},
	{
		id: 4,
		pickup: "University",
		drop: "Tech Park",
		pickupTime: "07:45 AM",
		dropTime: "08:30 AM",
		fare: "$15",
		seatsAvailable: 8,
	},
];

export function ShuttleDisplay({ shuttles }) {
	const [selectedDay, setSelectedDay] = useState(new Date());
	const [today, setToday] = useState(new Date());
	const [day, setDay] = useState(null);
	const params = useSearchParams();
	const router = useRouter();

	useEffect(() => {
		setDay("Today");

		setToday(new Date());
	}, []);

	const getDayButtons = () => {
		const dayButtons = [];
		const daysToShow = isSunday(today) ? 6 : 7 - getDay(today);

		for (let i = 0; i < daysToShow; i++) {
			const day = addDays(today, i);
			const isToday = i === 0;
			dayButtons.push(
				<button
					key={i}
					onClick={() => handleDayClick(day, isToday)}
					className={`px-4 py-2 rounded-md ${
						format(selectedDay, "yyyy-MM-dd") === format(day, "yyyy-MM-dd")
							? "bg-[#a479f8] text-[#131621]"
							: "bg-[#131621] text-[#a479f8] border border-[#a479f8]"
					} hover:opacity-80 transition-opacity`}>
					{isToday ? "Today" : format(day, "EEEE")}
				</button>
			);
		}
		return dayButtons;
	};

	const handleDayClick = (day, isToday) => {
		setSelectedDay(day);
		if (isToday) {
			handleTodayClick();
		} else {
			handleOtherDayClick(format(day, "EEEE"));
		}
	};

	const handleTodayClick = () => {
		setDay("Today");
	};

	const handleOtherDayClick = (dayName) => {
		setDay(dayName);

		// const daysOfWeek = [
		// 	"Sunday",
		// 	"Monday",
		// 	"Tuesday",
		// 	"Wednesday",
		// 	"Thursday",
		// 	"Friday",
		// 	"Saturday",
		// ];

		// const today = new Date();
		// const currentDayIndex = today.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6

		// // Find the index of the target day
		// const targetDayIndex = daysOfWeek.indexOf(dayName);

		// // Calculate the difference in days between today and the target day
		// let dayDifference = targetDayIndex - currentDayIndex;

		// // If the target day is earlier in the week (negative difference), move it to the next week
		// if (dayDifference < 0) {
		// 	dayDifference += 7;
		// }

		// // Calculate the target date by adding the difference
		// const targetDate = new Date();
		// targetDate.setDate(today.getDate() + dayDifference);
	};

	function book(sid) {
		const params = new URLSearchParams({ day }).toString();
		router.push(`/Services/Shuttle/${sid}?${params}`);
	}

	return (
		<div className="min-h-screen bg-[#131621] text-[#a479f8] p-4 md:p-8">
			<div className="text-center mb-8">
				<h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-[#a479f8] to-[#6B82F7] text-transparent bg-clip-text">
					Shuttle App
				</h1>
				<div className="flex flex-wrap justify-center gap-2 mb-8">
					{getDayButtons()}
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
				{shuttles &&
					shuttles.map((shuttle, index) => (
						<div
							key={index}
							onClick={() => {
								book(shuttle.Shuttle_id);
							}}
							className="bg-[#1c1f2e] p-6 rounded-lg shadow-lg relative overflow-hidden">
							<div className="absolute top-0 right-0 bg-[#a479f8] text-[#131621] px-3 py-1 rounded-bl-lg font-semibold">
								#{shuttle.Shuttle_id}
							</div>
							<div className="space-y-3 pt-6">
								<div className="flex justify-between items-center">
									<div className="text-[#6B82F7] font-semibold">
										{params.get("start")}
									</div>
									<div className="text-[#a479f8]">{shuttle.PickupTime}</div>
								</div>
								<div className="flex justify-between items-center">
									<div className="text-[#6B82F7] font-semibold">
										{params.get("dest")}
									</div>
									<div className="text-[#a479f8]">{shuttle.DropTime}</div>
								</div>
								<div className="flex justify-between items-center mt-4">
									<div className="text-[#6B82F7]">Fare</div>
									<div className="text-[#a479f8] font-bold">{shuttle.Fare}</div>
								</div>
								<div className="flex justify-between items-center">
									<div className="text-[#6B82F7]">Seats Available</div>
									<div className="text-[#a479f8] font-bold">{shuttle.Seat}</div>
								</div>
							</div>
						</div>
					))}
			</div>
		</div>
	);
}
