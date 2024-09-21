import saveUser from "../Handlers/Save_user.js";
import cookie from "cookie";

const driverResolver = {
	Mutation: {
		addDriver: async (_, args, { req, res }) => {
			try {
				const response = await saveUser(args);

				const tokenCookie = cookie.serialize("Token", args.token, {
					maxAge: 10 * 365 * 24 * 60 * 60,
					httpOnly: true,
					secure: true,
					sameSite: "strict",
					path: "/",
				});

				res.setHeader("Set-Cookie", [tokenCookie]);

				return {
					success: true,
					message: response,
				};
			} catch (error) {
				return {
					success: false,
					message: "Internal Server Error: " + error.message,
				};
			}
		},
	},
};

export default driverResolver;
