import { NextResponse } from "next/server";

const cache = new Map();

const auth = async (token) => {
	if (cache.has(token)) {
		return cache.get(token);
	}

	try {
		const res = await fetch("http://localhost:3000/api/Verify", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});

		const status = res.status;

		console.log(res.status);
		if (status === 200) {
			cache.set(token, true);
			return true;
		}


		return false;
	} catch (error) {
		return false;
	}
};

export async function middleware(request) {
	const path = request.nextUrl.pathname;
	let user = false;

	const tokenCookie = request.cookies.get("Token");


	if (tokenCookie) {
		try {
			const res = await auth(tokenCookie.value);

			user = res;
		} catch (error) {
			console.log(error.message);
		}
	}

	if (path == "/Services") {
		if (!user) {
			return NextResponse.redirect(new URL(`/Signin/User`, request.url));
		}
	} else if (path == "/Signin/User") {
		if (user) {
			return NextResponse.redirect(new URL("/", request.url));
		}
	} else if (path == "/Account") {
		if (!user) {
			return NextResponse.redirect(new URL(`/`, request.url));
		}
	}
}

export const config = {
	matcher: ["/"],
};
