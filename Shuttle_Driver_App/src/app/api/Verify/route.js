import { getAuth } from "firebase-admin/auth";
import admin from "firebase-admin";
import cred from "../../../../credentials.json" assert { type: "json" };
import { cookies } from "next/headers";

const app = admin.apps.length
	? admin.app("Driver App")
	: admin.initializeApp(
			{
				credential: admin.credential.cert(cred),
			},
			"Driver App"
	  );

const auth = getAuth(app);

export async function POST(req) {
	try {
		let token = req.headers.get("authorization");

		token = token.split(" ")[1];

		if (!token) {
			throw new Error("Token Unavialable");
		}

		const user = await auth.verifyIdToken(token);
		if (!user) {
			return new Response("Unauthorized", {
				status: 401,
			});
		}

		return new Response("Verified", {
			status: 200,
		});
	} catch (error) {
		return new Response(error.message, {
			status: 401,
		});
	}
}
