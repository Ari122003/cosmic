import { bookShuttle } from "../Handler/Booking_Handler.js";
import { GraphQLError } from "graphql";

const bookingResolver = {
	Mutation: {
		addBooking: async (_, arg, { req, res }) => {
			try {
				const res = await bookShuttle(arg);

				return res;
			} catch (error) {
				throw new GraphQLError("Internal server error: " + error.message);
			}
		},
	},
};

export default bookingResolver;
