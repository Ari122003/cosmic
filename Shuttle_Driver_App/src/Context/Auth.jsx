import React, { createContext, useContext } from "react";
import { gql, useMutation } from "@apollo/client";

import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { getAuth } from "firebase/auth";
import app from "@/lib/Firebase.js";

const auth = getAuth(app);

const authContext = createContext(null);

const signupQuery = gql`
	mutation ExampleQuery(
		$uid: String!
		$name: String!
		$email: String!
		$dob: String!
		$phone: String!
		$car: String!
		$route: String!
	) {
		addDriver(
			uid: $uid
			name: $name
			email: $email
			dob: $dob
			phone: $phone
			car: $car
			route: $route
		) {
			success
			message
		}
	}
`;

const cookieQuery = gql`
	mutation test {
		setCookie {
			success
			message
		}
	}
`;

export const AuthProvider = ({ children }) => {
	const [addDriver] = useMutation(signupQuery);
	const [setCookie] = useMutation(cookieQuery);

	// Signup

	async function SignUp(data) {
		try {
			const { email, password } = data;

			const res = await createUserWithEmailAndPassword(auth, email, password);

			const token = await res.user.getIdToken();

			sessionStorage.setItem("token", token);

			const resp = await addDriver({
				variables: {
					uid: res.user.uid,
					...data,
				},
			});

			if (!resp.data) {
				throw new Error("Internal Server Error");
			}
			if (!resp.data.addDriver.success) {
				throw new Error(resp.data.addDriver.message);
			}
			return resp.data.addDriver.message;
		} catch (error) {
			throw new Error(error.message);
		}
	}

	// Login

	async function Login(data) {
		try {
			const { email, password } = data;

			const res = await signInWithEmailAndPassword(auth, email, password);

			const token = await res.user.getIdToken();

			await setToken(token);

			return "Login Successfull";
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async function setToken(token) {
		sessionStorage.setItem("token", token);

		try {
			const res = await setCookie();

			console.log(res);

			if (!res.data) {
				throw new Error("Internal Server Error");
			}
			if (!res.data.setCookie) {
				throw new Error(res.data.setCookie.message);
			}
		} catch (error) {
			throw new Error(error.message);
		}
	}

	return (
		<authContext.Provider value={{ SignUp, Login }}>
			{children}
		</authContext.Provider>
	);
};

export const useAuth = () => useContext(authContext);
