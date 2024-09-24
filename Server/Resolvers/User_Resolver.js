import { addNewUser } from "../Handlers/User_Handler.js";
import { getAUser } from "../Handlers/User_Handler.js";
import { GraphQLError } from "graphql";

const userResolver = {
	Mutation: {
		adduser: async (parent, arg, { req, res }) => {
			try {
				const { name, email, uid, image } = arg;

				const res = await addNewUser(name, email, uid, image);

				return res;
			} catch (error) {
				throw new GraphQLError("Internal server error : " + error.message);
			}
		},
	},

	Query: {
		getUser: async (parent, arg, { req, res }) => {
			try {
				const user = await getAUser(arg.uid);

				return user;
			} catch (error) {
				throw new GraphQLError("Internal server error : " + error.message);
			}
		},
	},
};
export default userResolver;
