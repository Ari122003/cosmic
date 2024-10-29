import { gql } from "apollo-server";

const shuttleData_type = gql`
	type Query {
		getShuttleData(start: String!, dest: String!, time: String!): [Shuttles]

		getSingleShuttle(sid: String!, pickup: String!, drop: String!): [Shuttle]
	}

	type Shuttles {
		Seat: Int
		Shuttle_id: String
		Starting: String
		Destination: String
		Start_time: String
		Dest_time: String
		Fare: Int
		PickupTime: String
		DropTime: String
	}

	type Shuttle {
		Fare: Int
		PickupTime: String
		DropTime: String
	}
`;

export default shuttleData_type;
