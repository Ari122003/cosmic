import { bookShuttle } from "../Handler/Booking_Handler.js";

const bookingResolver = {
	Mutation: {
		addBooking: async (_, arg, { req, res }) => {
			try {
				bookShuttle(arg);

                return {
                    success: true,
                    message: "Booking Successful",
                }
			} catch (error) {
                return {
                    success: false,
                    message: "Booking Failed",
                }
            }
		},
	},
};

export default bookingResolver;
