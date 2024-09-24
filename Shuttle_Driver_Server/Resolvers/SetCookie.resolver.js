import cookie from "cookie";
import { GraphQLError } from "graphql";

const setCookieResolver = {
	Mutation: {
		setCookie: async (_, arg, { req, res }) => {
			try {
				const authHeader = req.headers.authorization;

				const token =
					(authHeader && authHeader.split(" ")[1]) || req.cookies?.Token;

				res.cookie("Token", token, {
					maxAge: 10 * 365 * 24 * 60 * 60, 
					httpOnly: true,
					sameSite: "strict",
					secure: true,
				});

				return "Cookie Updated";
			} catch (error) {
				throw new GraphQLError("Internal Server Error: " + error, {
					status: 500,
				});
			}
		},
	},


	
};

export default setCookieResolver;
