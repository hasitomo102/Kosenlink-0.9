import { auth } from "@/app/auth/config";
import { getInvitedUsers, getUserWithEmail } from "@/app/lib/users";
import { InvitedUser, User } from "@/types/user";
import { NextRequest, NextResponse } from "next/server";

/**
 * Route will fetch the user object from the email inputted
 *
 * @export
 * @param {{ params: { slug: string } }} { params }
 */
export async function GET(request: NextRequest): Promise<NextResponse<Partial<InvitedUser>[]>> {
    // get the current authenticated user
    // https://authjs.dev/guides/upgrade-to-v5?authentication-method=api-route#authentication-methods
    const session = await auth();
    if (!session?.user?.email) throw Error("invited-user api route: No logged in user");

    // get email from search params
    const searchParams = request.nextUrl.searchParams;
    const invitedEmail = searchParams.get('invitedEmail');

    try {
        const invitedUsers = await getInvitedUsers(session.user.email, invitedEmail);
        return NextResponse.json(invitedUsers);
    } catch (error: any) {
        throw Error(error);
    }
};

/**
 * POST request to change the invited user
 *
 * @export
 * @param {Request} request
 * @return {*} 
 */
export async function POST(request: NextRequest) {
    // get email from search params
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get('email');

    // get the request body
    const res = await request.json();
    return NextResponse.json({ res });
}