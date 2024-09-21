import { getAuth } from "firebase-admin/auth";
import admin from "firebase-admin";
import cred from "../credentials.json" assert { type: "json" };

const app = admin.apps.length
	? admin.app("Auth Server")
	: admin.initializeApp(
			{
				credential: admin.credential.cert(cred),
			},
			"Auth Server"
	  );

const auth = getAuth(app);

const verifyToken = async (req, res, next) => {
	try {
		const token = req.body?.variables?.token || req.cookies?.Token;

		if (!token) {
			return res.status(403).json({ msg: "Unauthorized" });
		}

		const user = await auth.verifyIdToken(token);
		next();
	} catch (error) {
		return res.status(401).json({ msg: "Unauthorized" });
	}
};

export default verifyToken;
