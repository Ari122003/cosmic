import cookie from "cookie";
import { GraphQLError } from "graphql";

const cookieResolver = {
	Mutation: {
		setCookie: async (parent, args, { req, res }) => {
			try {
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

				return "Cookie updated";
			} catch (error) {
				throw new GraphQLError("Internal server error : " + error.message);
			}
		},

		logout: async (parent, args, { req, res }) => {
			try {
				const tokenCookie = cookie.serialize("Token", null, {
					maxAge: 0,
					httpOnly: true,
					secure: true,
					sameSite: "strict",
					path: "/",
				});

				res.setHeader("Set-Cookie", [tokenCookie]);

				return "You are logged out";
			} catch (error) {
				throw new GraphQLError("Internal server error : " + error.message);
			}
		},
	},
};

export default cookieResolver;
