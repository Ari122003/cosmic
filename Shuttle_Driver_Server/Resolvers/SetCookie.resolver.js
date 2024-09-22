import cookie from "cookie";

const setCookieResolver = {
	Mutation: {
		setCookie: async (_, arg, { req, res }) => {
			try {
				const authHeader = req.headers.authorization;

				const token =
					(authHeader && authHeader.split(" ")[1]) || req.cookies?.Token;

                console.log(token);
                                        

				const tokenCookie = cookie.serialize("Token", token, {
					maxAge: 10 * 365 * 24 * 60 * 60,
					httpOnly: true,
                    secure: false,
					sameSite: "lax",
					path: "/",
				});

				res.setHeader("Set-Cookie", [tokenCookie]);

				return {
					success: true,
					message: "Cookie updated",
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

export default setCookieResolver;
