import { gql } from "apollo-server";

const driverType = gql`
	type Query {
		getShuttleDriver(uid: ID!): getShuttleDriverResponse!
	}
	type Mutation {
		addDriver(
			uid: String!
			name: String!
			email: String!
			dob: String!
			phone: String!
			car: String!
			route: String!
			token: String!
		): addDriverResponse!
	}

	type addDriverResponse {
		success: Boolean!
		message: String!
	}
	type getShuttleDriverResponse {
		success: Boolean!
		message: String!
		shuttleDriver: [Shuttle_Driver!]!
	}

	type Shuttle_Driver {
		Name: String
		Email: String
		Phone: String
		UID: ID!
		Shuttle_No: String
		Car_No: String
		Route: String
	}
`;

export default driverType;
