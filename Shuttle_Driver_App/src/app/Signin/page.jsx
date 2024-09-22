"use client";

import LoginForm from "@/components/login-form";
import { useAuth } from "@/Context/Auth";
import React from "react";

export default function page() {
	const { Login } = useAuth();

	async function signIn(data) {
		try {

			
			const res = await Login(data);



			console.log(res);
		} catch (error) {
			console.log(error.message);
		}
	}

	return <LoginForm signIn={signIn} />;
}
