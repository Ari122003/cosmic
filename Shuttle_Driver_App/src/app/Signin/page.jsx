"use client";

import LoginForm from "@/components/login-form";
import { useAuth } from "@/Context/Auth";
import { useRouter } from "next/navigation";
import React from "react";

export default function page() {
	const { Login } = useAuth();
	const router = useRouter();

	async function signIn(data) {
		try {
			const res = await Login(data);

			console.log(res);

			router.replace("/");
		} catch (error) {
			console.log(error.message);
		}
	}

	return <LoginForm signIn={signIn} />;
}
