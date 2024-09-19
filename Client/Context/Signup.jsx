import React, { createContext, useContext } from "react";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	GoogleAuthProvider,
	signInWithPopup,
} from "firebase/auth";
import app from "@/Firebase";
import { gql, useMutation } from "@apollo/client";
import { useApolloClients } from "./Apollo";
import { useCookie } from "./Cookie";
import { useRouter } from "next/navigation";
import { getDatabase, ref, set } from "firebase/database";

const auth = getAuth(app);
const db = getDatabase(app);

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
		logout {
			success
			message
		}
	}
`;

const signinQuery = gql`
	mutation addUser(
		$name: String!
		$uid: String!
		$email: String!
		$image: String!
	) {
		adduser(name: $name, uid: $uid, email: $email, image: $image) {
			success
			message
		}
	}
`;

export const SignupProvider = ({ children }) => {
	const { client1 } = useApolloClients();
	const { setToken } = useCookie();
	const [addDriver] = useMutation(query, { client: client1 });
	const [logout] = useMutation(logoutQuery, { client: client1 });
	const [adduser] = useMutation(signinQuery, { client: client1 });

	const router = useRouter();

	// Driver Signup

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

	// Driver Signin
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

	// User Signin

	async function loginWithGoogle() {
		const provider = new GoogleAuthProvider();

		try {
			const result = await signInWithPopup(auth, provider);
			const token = await result.user.getIdToken();

			await setToken(token);

			const { email, displayName, photoUrl } = result.user.reloadUserInfo;

			const res = await adduser({
				variables: {
					name: displayName,
					email: email,
					uid: result.user.uid,
					image: photoUrl,
				},
			});

			await set(ref(db, `Roles/${result.user.uid}`), {
				Role: "Rider",
			});

			if (!res.data.adduser.success) {
				throw new Error(res.data.adduser.message);
			}

			return {
				res,
				uid: result.user.uid,
			};
		} catch (error) {
			throw new Error("Login error:" + error.message);
		}
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

			return res.data.logout.message;
		} catch (err) {
			throw new Error(err.message);
		}
	}

	return (
		<signupContext.Provider
			value={{ googleSignup, googleLogin, LogOut, loginWithGoogle }}>
			{children}
		</signupContext.Provider>
	);
};

export const useSignup = () => useContext(signupContext);
