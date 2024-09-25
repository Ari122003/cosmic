import { GraphQLError } from "graphql";
import getRoutes from "../Handler/Route_Handler.js";

const Shuttle_resolver = {
	Query: {
		getShuttle: async (parent, args, { req, res }) => {
			try {
				const data = await getRoutes(args);

				return data;
			} catch (error) {
				throw new GraphQLError("Internal Server Error:" + error.message);
			}
		},
	},
};

export default Shuttle_resolver;
