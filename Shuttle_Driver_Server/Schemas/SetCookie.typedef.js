import { gql } from "apollo-server";

const setCookieType = gql`
	type Mutation {
		setCookie: String!
	}
`;

export default setCookieType;
