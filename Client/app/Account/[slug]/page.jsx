"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/Context/Auth";
import UserAccount from "@/Components/UserAccount";
import { useFetch } from "@/Context/Fetch";
import { useSignup } from "@/Context/Signup";

export default function user() {
	const { user, loading } = useAuth();
	const [det, setDet] = useState(null);
	const router = useRouter();
	const { getUserData } = useFetch();

	const { LogOut } = useSignup();

	const getData = async () => {
		try {
			if (user) {
				const res = await getUserData(user.uid);
				console.log(res);

				setDet(res);
				
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	async function logOut() {
		try {
			const res = await LogOut();
			console.log(res);

			router.push("/");
		} catch (error) {
			console.log(error.message);
		}
	}

	useEffect(() => {
		getData();
	}, [user, loading]);

	return <UserAccount data={det} logOut={logOut} />;
}
