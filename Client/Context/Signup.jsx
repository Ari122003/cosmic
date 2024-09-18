import React, { createContext, useContext } from "react";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import app from "@/Firebase";
import { gql, useMutation } from "@apollo/client";
import { useApolloClients } from "./Apollo";
import { useCookie } from "./Cookie";
import { useRouter } from "next/navigation";

const auth = getAuth(app);

const signupContext = createContext(null);

const query = gql`
	mutation add_new_driver(
		$uid: String!
		$name: String!
		$email: String!
		$dob: String!
		$phone: String!
		$car: String!
		$key: String!
	) {
		addDriver(
			uid: $uid
			name: $name
			email: $email
			dob: $dob
			phone: $phone
			car: $car
			key: $key
		)
	}
`;

const logoutQuery = gql`
	mutation LogOut {
		logout
	}
`;

export const SignupProvider = ({ children }) => {
	const { client1 } = useApolloClients();
	const { setToken } = useCookie();
	const [addDriver] = useMutation(query, { client: client1 });
	const [logout] = useMutation(logoutQuery, { client: client1 });

	const router = useRouter();

	// Signup

	async function googleSignup(data, key) {
		const { firstname, lastname, email, dob, phone, password, car } = data;

		await createUserWithEmailAndPassword(auth, email, password)
			.then(async (res) => {
				await res.user.getIdToken().then(async (token) => {
					await setToken(token);
					const resp = await addDriver({
						variables: {
							uid: res.user.uid,
							name: `${firstname} ${lastname}`,
							email,
							dob,
							phone,
							car,
							key,
						},
					});

					console.log(resp);
					router.push(`/${key}_Driver`);
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}

	// Signin
	async function googleLogin(data, key) {
		const { email, password } = data;

		signInWithEmailAndPassword(auth, email, password)
			.then((res) => {
				res.user.getIdToken().then(async (token) => {
					await setToken(token);
					router.push(`/${key}_Driver`);
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}

	// Log out

	async function LogOut() {
		try {
			await signOut(auth);

			const res = await logout();

			if (!res.data) {
				throw new Error("Bad request");
			}

			if (!res.data.logout.success) {
				throw new Error(res.data.logout.message);
			}

			console.log(res.data.logout.message);
			return res.data.logout.message;
		} catch (err) {
			console.error(err.message);
			throw new Error(err.message);
		}
	}

	return (
		<signupContext.Provider value={{ googleSignup, googleLogin, LogOut }}>
			{children}
		</signupContext.Provider>
	);
};

export const useSignup = () => useContext(signupContext);
