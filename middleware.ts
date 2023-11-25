import { auth } from "@/app/lib/auth";

// docs: https://authjs.dev/guides/upgrade-to-v5?authentication-method=middleware#authentication-methods
export default auth((req) => {
  // req.auth
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};