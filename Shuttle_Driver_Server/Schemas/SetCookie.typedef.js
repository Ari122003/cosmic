import { gql } from "apollo-server";

const setCookieType = gql`
	type Mutation {
		setCookie: setCookieResponse!
	}

	type setCookieResponse {
		success: Boolean!
		message: String!
	}
`;

export default setCookieType;
