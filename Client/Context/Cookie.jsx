import React, { createContext, useContext } from "react";
import { useApolloClients } from "./Apollo";
import { gql, useMutation } from "@apollo/client";

const cookieContext = createContext(null);

const query = gql`
	mutation sendCookie {
		setCookie
	}
`;

export const CookieProvider = ({ children }) => {
	const { client1 } = useApolloClients();
	const [setCookie] = useMutation(query, { client: client1 });

	const setToken = async (token) => {
		sessionStorage.setItem("token", token);

		try {
			const res = await setCookie();
			sessionStorage.removeItem("token");
		} catch (error) {
			sessionStorage.removeItem("token");

			throw new Error(error.graphQLErrors[0].message);
		}
	};

	return (
		<cookieContext.Provider value={{ setToken }}>
			{children}
		</cookieContext.Provider>
	);
};

export const useCookie = () => useContext(cookieContext);
