"use client";

import ShuttleBooking from "@/Components/shuttle-booking-page";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function page({ params }) {
	const param = useSearchParams();

	return <ShuttleBooking />;
}
