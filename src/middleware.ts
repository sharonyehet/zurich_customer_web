import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
	const secret = process.env.NEXTAUTH_SECRET;
	const token = await getToken({ req, secret });

	if (!token) {
		const url = new URL("/permission-denied", req.url);
		return NextResponse.redirect(url);
	} else {
		return NextResponse.next();
	}
}

export const config = {
	matcher: ["/users"],
};
