import { GraphQLError } from "graphql";
import { shuttleHandler } from "../Handler/Shuttle_Handler.js";
const shuttle_Data_Resolver = {
	Query: {
		getShuttleData: async (parent, args, { req, res }) => {
			try {
				console.log(args);
				
				const res = await shuttleHandler(args);

				return res;
			} catch (error) {
				throw new GraphQLError("Internal server error: " + error.message);
			}
		},

		getSingleShuttle: async (parent, args, { req, res }) => {
			try {
				
			} catch (error) {
				throw new GraphQLError("Internal server error: " + error.message);

			}
		}
	},
};

export default shuttle_Data_Resolver;
