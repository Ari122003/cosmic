"use client";

import { SignupForm } from "@/components/signup-form";
import { useAuth } from "@/Context/Auth";
import React from "react";

export default function page() {
	const { SignUp } = useAuth();

	async function signUp(data) {
		try {
			const res = await SignUp(data);


			console.log(res);
		} catch (error) {

			console.log(error.message);
		}
	}
	return <SignupForm signUp={signUp} />;
}
