import React, { createContext, useContext } from "react";
import {
	getAuth,
	signOut,
	GoogleAuthProvider,
	signInWithPopup,
} from "firebase/auth";
import app from "@/Firebase";
import { gql, useMutation } from "@apollo/client";
import { useApolloClients } from "./Apollo";
import { useCookie } from "./Cookie";
import { useRouter } from "next/navigation";

const auth = getAuth(app);

const signupContext = createContext(null);

const logoutQuery = gql`
	mutation LogOut {
		logout
	}
`;

const signinQuery = gql`
	mutation addUser(
		$name: String!
		$uid: String!
		$email: String!
		$image: String!
	) {
		adduser(name: $name, uid: $uid, email: $email, image: $image)
	}
`;

export const SignupProvider = ({ children }) => {
	const { client1 } = useApolloClients();
	const { setToken } = useCookie();
	const [logout] = useMutation(logoutQuery, { client: client1 });
	const [adduser] = useMutation(signinQuery, { client: client1 });

	const router = useRouter();

	// User Signin

	async function gqlSignin(result) {
		try {
			const { email, displayName, photoUrl } = result.user.reloadUserInfo;

			const res = await adduser({
				variables: {
					name: displayName,
					email: email,
					uid: result.user.uid,
					image: photoUrl,
				},
			});

			return res;
		} catch (error) {
			throw new Error(error.graphQLErrors[0].message);
		}
	}

	async function loginWithGoogle() {
		const provider = new GoogleAuthProvider();

		try {
			let result;
			await signInWithPopup(auth, provider)
				.then((res) => {
					result = res;
				})
				.catch((error) => {
					throw new Error(error.code);
				});
			const token = await result.user.getIdToken();

			const res = await gqlSignin(result);

			await setToken(token);

			return {
				res,
				uid: result.user.uid,
			};
		} catch (error) {
			throw new Error("Login error:" + error.message);
		}
	}

	// Log out

	async function gqlLogout() {
		try {
			const res = await logout();
			return res.data.logout;
		} catch (error) {
			throw new Error(error.graphQLErrors[0].message);
		}
	}

	async function firebaseLogout() {
		try {
			await signOut(auth);
		} catch (error) {
			throw new Error(error.code);
		}
	}

	async function LogOut() {
		try {
			await firebaseLogout();
			const res = await gqlLogout();
			return res;
		} catch (error) {
			throw new Error(error.message);
		}
	}

	return (
		<signupContext.Provider value={{ LogOut, loginWithGoogle }}>
			{children}
		</signupContext.Provider>
	);
};

export const useSignup = () => useContext(signupContext);
