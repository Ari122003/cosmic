import { NextResponse } from "next/server";

async function verify(token) {
	try {
		const res = await fetch("http://localhost:3000/api/Verify", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});

		const status = res.status;

		if (status === 200) {
			return true;
		}

		return false;
	} catch (error) {
		return false;
	}
}

export async function middleware(request) {
	let token =
		request.cookies.get("Token") && request.cookies.get("Token").value;

	let isVerified = false;

	isVerified = await verify(token);

	const path = request.nextUrl.pathname;

	if (path === "/") {
		if (!isVerified) {
			return NextResponse.redirect(new URL(`/Signin`, request.url));
		}
	} else if (path === "/Signin") {
		if (isVerified) {
			return NextResponse.redirect(new URL(`/`, request.url));
		}
	} else if (path === "/Register") {
		if (isVerified) {
			return NextResponse.redirect(new URL(`/`, request.url));
		}
	}
}

export const config = {
	matcher: ["/", "/Signin", "/Register"],
};
