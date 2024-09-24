import { GraphQLError } from "graphql";
import saveUser from "../Handlers/Save_user.js";
import cookie from "cookie";

const driverResolver = {
	Mutation: {
		addDriver: async (_, args, { req, res }) => {
			try {
				const response = await saveUser(args);

				const authHeader = req.headers.authorization;

				const token =
					(authHeader && authHeader.split(" ")[1]) || req.cookies?.Token;

				const tokenCookie = cookie.serialize("Token", token, {
					maxAge: 10 * 365 * 24 * 60 * 60,
					httpOnly: true,
					secure: true,
					sameSite: "strict",
					path: "/",
				});

				res.setHeader("Set-Cookie", [tokenCookie]);

				return response;
			} catch (error) {
				throw new GraphQLError("Internal server error: " + error.message);
			}
		},
	},
};

export default driverResolver;
