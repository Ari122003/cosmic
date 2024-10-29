import React, { createContext, useContext } from "react";
import { useApolloClients } from "./Apollo";
import { gql, useLazyQuery } from "@apollo/client";

const fetchContext = createContext(null);

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

const routeQuery = gql`
	query test($lat: Float!, $long: Float!) {
		getRoutes(Lat: $lat, Long: $long) {
			Shuttle_id
			Starting
			Destination
			Start_time
		}
	}
`;

const ShuttlesQuery = gql`
	query test($start: String!, $dest: String!, $time: String!) {
		getShuttleData(start: $start, dest: $dest, time: $time) {
			Seat
			Fare
			Starting
			Destination
			PickupTime
			DropTime
			Shuttle_id
		}
	}
`;

export default function FetchProvider({ children }) {
	const { client1, client2 } = useApolloClients();

	const [getUser] = useLazyQuery(query, { client: client1 });
	const [getRoutes] = useLazyQuery(routeQuery, { client: client2 });
	const [getShuttleData] = useLazyQuery(ShuttlesQuery, { client: client2 });

	async function getUserData(uid) {
		try {
			const res = await getUser({
				variables: {
					uid,
				},
			});

			return res.data.getUser;
		} catch (error) {
			throw new Error(error.graphQLErrors[0].message);
		}
	}

	async function fetchRoutes(lat, long) {
		try {
			const res = await getRoutes({
				variables: {
					lat,
					long,
				},
			});

			return res.data.getRoutes;
		} catch (error) {
			console.log(error);

			throw new Error(error.graphQLErrors[0].message);
		}
	}

	async function fetchShuttles(start, dest, time) {

		try {
			const res = await getShuttleData({
				variables: {
					start,
					dest,
					time,
				},
			});
			return res.data.getShuttleData;
		} catch (error) {
			throw new Error(error.graphQLErrors[0].message);
		}
	}

	return (
		<fetchContext.Provider value={{ getUserData, fetchRoutes, fetchShuttles }}>
			{children}
		</fetchContext.Provider>
	);
}

export const useFetch = () => useContext(fetchContext);
