"use client";

import { Inter } from "next/font/google";
import React from "react";
import "./globals.css";
import Navbar from "@/Components/Navbar";
import StoreProvider from "@/Redux/StoreProvider";
import { AuthProvider } from "@/Context/Auth";
import {
	ApolloClient,
	ApolloLink,
	ApolloProvider,
	concat,
	HttpLink,
	InMemoryCache,
} from "@apollo/client";
import { usePathname } from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import { ApolloClientsProvider } from "@/Context/Apollo";

const inter = Inter({ subsets: ["latin"] });

import { CookieProvider } from "@/Context/Cookie";
import { SignupProvider } from "@/Context/Signup";
import FetchProvider from "@/Context/Fetch";

export default function RootLayout({ children }) {
	const noNav = [
		"/Shuttle_Driver",
		"/Cab_Driver",
		"/Driver_Form",
		"/Signin",
		"/Signin/User",
	];
	const path = usePathname();

	const showNav = noNav.includes(path);

	const httpLink = new HttpLink({
		uri: `${process.env.NEXT_PUBLIC_URL}/graphql`,
		credentials: "include",
	});

	console.log(sessionStorage.getItem("token"));
	
	const authMiddleware = new ApolloLink((operation, forward) => {
		const token = sessionStorage.getItem("token");

		operation.setContext({
			headers: {
				authorization: token ? `Bearer ${token}` : "",
			},
		});
		return forward(operation);
	});

	const clien1 = new ApolloClient({
		link: concat(authMiddleware, httpLink),
		cache: new InMemoryCache(),
	});
	const clien2 = new ApolloClient({
		uri: `http://localhost:7000/Shuttle_endpoint`,
		credentials: "include",
		cache: new InMemoryCache(),
	});

	return (
		<html lang="en">
			<body className={inter.className}>
				<StoreProvider>
					<ApolloProvider client={{ clien1, clien2 }}>
						<ApolloClientsProvider>
							<CookieProvider>
								<SignupProvider>
									<AuthProvider>
										<FetchProvider>
											<NextTopLoader color="#131621" speed={200} />
											{!showNav && <Navbar />}
											{children}
										</FetchProvider>
									</AuthProvider>
								</SignupProvider>
							</CookieProvider>
						</ApolloClientsProvider>
					</ApolloProvider>
				</StoreProvider>
			</body>
		</html>
	);
}
