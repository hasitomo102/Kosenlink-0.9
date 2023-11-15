import { getServerSession } from 'next-auth';
import { getSession, useSession } from 'next-auth/react';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
 
// This function can be marked `async` if using `await` inside
/**
 * Resources
 * https://nextjs.org/docs/app/building-your-application/routing/middleware#nextresponse
 * https://nextjs.org/docs/app/building-your-application/routing/middleware
 * https://medium.com/@zachshallbetter/middleware-in-next-js-a-comprehensive-guide-7dd0a928541a
 *
 * @export
 * @param {NextRequest} request
 * @return {*} 
 */
// export async function middleware(request: NextRequest) {
//     // const session = await getServerSession();
//     const session = await getSession();
//     console.log("HIHIH");
//     console.log("url", request.url);
//     console.log("nexturl", request.nextUrl);
//     console.log("session", session);
//     // return NextResponse.next();
//     // if (!session?.user) return NextResponse.redirect("/");
//     // return NextResponse.next();
// };
export { default } from 'next-auth/middleware';
 
// See "Matching Paths" below to learn more
// https://nextjs.org/docs/app/building-your-application/routing/middleware#matching-paths
export const config = {
  matcher: ['/profile'],
}