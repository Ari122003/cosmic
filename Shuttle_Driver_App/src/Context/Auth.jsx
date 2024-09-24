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
		)
	}
`;

const cookieQuery = gql`
	mutation test {
		setCookie
	}
`;

export const AuthProvider = ({ children }) => {
	const [addDriver] = useMutation(signupQuery);
	const [setCookie] = useMutation(cookieQuery);

	// Signup

	async function firebaseSignup(auth, email, password) {
		try {
			const res = await createUserWithEmailAndPassword(auth, email, password);

			return res;
		} catch (error) {
			throw new Error(error.code);
		}
	}

	async function graphqlSignup(uid, data) {
		try {
			const res = await addDriver({
				variables: {
					uid,
					...data,
				},
			});

			return res.data.addDriver;
		} catch (error) {
			throw new Error(error.graphQLErrors[0].message);
		}
	}

	async function SignUp(data) {
		try {
			const { email, password } = data;

			const res = await firebaseSignup(auth, email, password);

			const token = await res.user.getIdToken();

			sessionStorage.setItem("token", token);

			const response = await graphqlSignup(res.user.uid, data);

			return response;
		} catch (error) {
			throw new Error(error.message);
		}
	}

	// Login

	async function firebaseLogin(auth, email, password) {
		try {
			const res = await signInWithEmailAndPassword(auth, email, password);

			return res;
		} catch (error) {
			throw new Error(error.code);
		}
	}

	async function Login(data) {
		try {
			const { email, password } = data;

			const res = await firebaseLogin(auth, email, password);

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

			console.log(res.data.setCookie);
		} catch (error) {
			throw new Error(error.graphQLErrors[0].message);
		}
	}

	return (
		<authContext.Provider value={{ SignUp, Login }}>
			{children}
		</authContext.Provider>
	);
};

export const useAuth = () => useContext(authContext);
