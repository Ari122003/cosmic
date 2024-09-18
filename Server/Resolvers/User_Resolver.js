import { addNewUser } from "../Handlers/User_Handler.js";
import { getAUser } from "../Handlers/User_Handler.js";

const userResolver = {
	Mutation: {
		adduser: async (parent, arg, { req, res }) => {
			try {
				const { name, email, uid, image } = arg;

				const res = await addNewUser(name, email, uid, image);

				return {
					success: true,
					message: res,
				};
			} catch (error) {
				console.log(error);

				return {
					sucess: false,
					message: "Internal server error : " + error.message,
				};
			}
		},
	},

	Query: {
		getUser: async (parent, arg, { req, res }) => {
			try {
				const user = await getAUser(arg.uid);

				console.log(user);
				

				return {
					success: true,
					message: "Successfully fetched user",
					user: user,
				};
			} catch (error) {
				return {
					sucess: false,
					message: "Internal server error : " + error.message,
					user: null,
				};
			}
		},
	},
};
export default userResolver;
