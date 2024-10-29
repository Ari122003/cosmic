"use client";

import { ShuttleDisplay } from "@/Components/shuttle-page";
import { useFetch } from "@/Context/Fetch";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function getCurrentTime() {
	const now = new Date();
	let hours = now.getHours();
	const minutes = now.getMinutes();
	const modifier = hours >= 12 ? "PM" : "AM";
	hours = hours % 12 || 12;
	const formattedTime = `${hours}:${minutes
		.toString()
		.padStart(2, "0")} ${modifier}`;
	return formattedTime;
}

export default function page() {
	const { fetchShuttles } = useFetch();
	const params = useSearchParams();
	const [shuts, setShuts] = useState(null);

	async function getShuttles() {
		try {
			const res = await fetchShuttles(
				params.get("start"),
				params.get("dest"),
				"10:00 AM"
			);
			setShuts(res);
		} catch (error) {
			console.log(error.message);
		}
	}

	useEffect(() => {
		getShuttles();
	}, []);

	return <ShuttleDisplay shuttles={shuts} />;
}
