import { gql } from "apollo-server";

const driverType = gql`
	type Query {
		getShuttleDriver(uid: ID!): [Shuttle_Driver!]!
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
		): String!
	}

	type Shuttle_Driver {
		Name: String
		Email: String
		Phone: String
		UID: ID!
		Shuttle_No: String
		Car_No: String
		Shuttle_Id: String
	}
`;

export default driverType;
