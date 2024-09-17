"use client";

import React, { useContext, useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { redirect, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { signOut, getAuth } from "firebase/auth";
import app from "@/Firebase";
import { update } from "@/Redux/Authenticator";
import { authContext, useAuth } from "@/Context/Auth";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useApolloClients } from "@/Context/Apollo";
import UserAccount from "@/Components/UserAccount";

const auth = getAuth(app);

export default function user() {
	const { client1 } = useApolloClients();

	const query = gql`
		query getuser($uid: ID!) {
			getUser(uid: $uid) {
				Name
				Email
				Phone
				Image
			}
		}
	`;

	const logoutQuery = gql`
		mutation LogOut {
			logout
		}
	`;
	const { user, loading } = useAuth();
	const [getUser] = useLazyQuery(query, { client: client1 });
	const [logout] = useMutation(logoutQuery, { client: client1 });
	const [det, setDet] = useState(null);
	const router = useRouter();

	const getData = async () => {
		if (user) {
			const res = await getUser({
				variables: {
					uid: user.uid,
				},
			});

			console.log(res);

			setDet(res.data.getUser);
		}
	};

	const logOut = () => {
		signOut(auth)
			.then(async () => {
				const res = await logout();
				console.log(res);
				router.replace("/");
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		getData();
	}, [user, loading]);

	return <UserAccount />;
}
