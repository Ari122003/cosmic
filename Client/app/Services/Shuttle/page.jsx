"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState, Suspense, useMemo } from "react";

import { ShuttleDashboard } from "@/Components/shuttle-dashboard";
import { useFetch } from "@/Context/Fetch";

export default function Shuttle() {
	const [routes, setRoutes] = useState(null);
	const router = useRouter();
	const { fetchRoutes } = useFetch();

	const search = (start, dest) => {
		const details = {
			start,
			dest,
		};

		const params = new URLSearchParams(details).toString();
		router.push(`/Services/Shuttle/Search_Results?${params}`);
	};

	const fetchShuttles = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(async (position) => {
				const lat = position.coords.latitude;
				const long = position.coords.longitude;
				try {
					const res = await fetchRoutes(lat, long);
					setRoutes(res);
				} catch (error) {
					console.error(error.message);
				}
			});
		}
	};

	useEffect(() => {
		fetchShuttles();
	}, []);

	return <ShuttleDashboard routes={routes} search={search} />;
}
