import { gql } from "apollo-server";

const userType = gql`
	type Query {
		getUser(uid: ID!): UserResponse
	}
	type Mutation {
		adduser(
			name: String!
			uid: String!
			email: String!
			image: String!
		): addUserResponse
		logout: String
		setCookie(token: String!): String
	}

	type UserResponse {
		success: Boolean!
		message: String!
		user: User
	}

	type addUserResponse {
		success: Boolean!
		message: String!
	}

	type User {
		Name: String
		Email: String
		Phone: Int
		Image: String
		UID: ID!
	}
`;

export default userType;
