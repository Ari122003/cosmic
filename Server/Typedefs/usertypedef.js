import { gql } from "apollo-server";

const userType = gql`
	type Query {
		getUser(uid: ID!): UserResponse
	}
	type Mutation {
		adduser(
			name: String
			uid: String
			email: String
			image: String
		): addUserResponse


		logout: LogoutResponse


		setCookie(token: String!): String
	}

	type LogoutResponse {
		success: Boolean!
		message: String!
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
