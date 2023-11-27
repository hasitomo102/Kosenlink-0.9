import { auth as middleware } from "@/app/lib/auth";
import { NextResponse } from "next/server";

export default middleware((request) => {
    // force login if the user
    if (request.nextUrl.pathname.startsWith("/profile") && !request.auth?.user?.email) {
        return NextResponse.rewrite(
            new URL("/api/auth/signin", request.url)
        )
    }
});

export const config = { matcher: ["/about/:path*"] }