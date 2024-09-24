import React, { createContext, useContext } from "react";
import {
	ApolloClient,
	ApolloLink,
	concat,
	HttpLink,
	InMemoryCache,
} from "@apollo/client";

const ApolloClientsContext = createContext(null);

export const ApolloClientsProvider = ({ children }) => {
	const httpLink = new HttpLink({
		uri: `${process.env.NEXT_PUBLIC_URL}/graphql`,
		credentials: "include",
	});

	const authMiddleware = new ApolloLink((operation, forward) => {
		const token = sessionStorage.getItem("token");

		operation.setContext({
			headers: {
				authorization: token ? `Bearer ${token}` : "",
			},
		});
		return forward(operation);
	});
	const client1 = new ApolloClient({
		link: concat(authMiddleware, httpLink),
		cache: new InMemoryCache(),
	});

	const client2 = new ApolloClient({
		uri: "http://localhost:7000/Shuttle_endpoint",
		credentials: "include",
		cache: new InMemoryCache(),
	});

	return (
		<ApolloClientsContext.Provider value={{ client1, client2 }}>
			{children}
		</ApolloClientsContext.Provider>
	);
};

export const useApolloClients = () => useContext(ApolloClientsContext);
