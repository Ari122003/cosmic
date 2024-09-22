import { gql } from "apollo-server";

const bookingType = gql`
	type Mutation {
		addBooking(
			uid: String!
			sid: String!
			day: String!
			pick: String!
			drop: String!
		): addBookingResponse!
	}

	type addBookingResponse {
		success: Boolean!
		message: String!
	}
`;

export default bookingType;
