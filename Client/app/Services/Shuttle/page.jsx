"use client";

import { useApolloClients } from "@/Context/Apollo";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, Suspense, useMemo } from "react";
import { motion } from "framer-motion";

import { BiSortAlt2 } from "react-icons/bi";
import { ShuttleDashboard } from "@/Components/shuttle-dashboard";

const query = gql`
	query test($lat: Float!, $long: Float!) {
		getShuttle(Lat: $lat, Long: $long) {
			Starting
			Destination
		}
	}
`;

export default function Shuttle() {
	const [shuttles, setShuttles] = useState([]);

	const { client2 } = useApolloClients();

	const [getShuttle] = useLazyQuery(query, { client: client2 });

	const [start, setStart] = useState("From");
	const [dest, setDest] = useState("To");

	const router = useRouter();

	const search = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const data = Object.fromEntries(formData.entries());

		const time = "10:31 AM";

		const details = {
			start: data.start,
			dest: data.dest,
			time,
		};

		const params = new URLSearchParams(details).toString();
		router.push(`/Services/Shuttle/Search_Results?${params}`);
	};
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

	// Swapping
	const startChange = (e) => {
		setStart(e.target.value);
	};
	const destChange = (e) => {
		setDest(e.target.value);
	};

	const startfocus = () => {
		setStart("");
	};
	const destfocus = () => {
		setDest("");
	};

	function swapper() {
		setStart(dest);
		setDest(start);
	}

	// Fetching routes

	const fetchShuttles = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(async (position) => {
				const lat = position.coords.latitude;
				const long = position.coords.longitude;

				try {
					const res = await getShuttle({
						variables: {
							lat,
							long,
						},
					});

					console.log(res);

					setShuttles(res.data.getShuttle);
				} catch (error) {
					console.error("Error fetching shuttle data:", error);
				}
			});
		}
	};

	useEffect(() => {
		fetchShuttles();
	}, []);

	return <ShuttleDashboard />;
}
