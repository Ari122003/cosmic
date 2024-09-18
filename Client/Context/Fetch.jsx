import React, { createContext, useContext } from "react";
import { useApolloClients } from "./Apollo";
import { gql, useLazyQuery } from "@apollo/client";

const fetchContext = createContext(null);

const query = gql`
	query getuser($uid: ID!) {
		getUser(uid: $uid) {
			success
			message
			user {
				Name
				Email
				Phone
				Image
			}
		}
	}
`;

export default function FetchProvider({ children }) {
	const { client1 } = useApolloClients();

	const [getUser] = useLazyQuery(query, { client: client1 });

	async function getUserData(uid) {
		try {
			const res = await getUser({
				variables: {
					uid,
				},
			});

			if (!res.data) {
				throw new Error("Bad request");
			} else if (!res.data.getUser.success) {
				throw new Error(res.data.getUser.message);
			}

			return res.data.getUser.user;
		} catch (error) {
			throw new Error(error.message);
		}
	}

	return (
		<fetchContext.Provider value={{ getUserData }}>
			{children}
		</fetchContext.Provider>
	);
}

export const useFetch = () => useContext(fetchContext);
