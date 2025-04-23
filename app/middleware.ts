import { auth as middleware } from "@/app/auth/config";
import { NextResponse, type NextRequest } from "next/server";

// Not working right now - have to place in main directory outside of app
// Combination of a few new resources
// Auth v5: https://authjs.dev/reference/nextjs#in-middleware
// upgrade guide: https://authjs.dev/guides/upgrade-to-v5
export default middleware((request: NextRequest) => {
    if (request.nextUrl.pathname.startsWith("/profile") && !request.auth?.user?.email) {
        return NextResponse.rewrite(new URL("/api/auth/signin", request.url));
    }
});