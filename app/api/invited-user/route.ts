import { getUserWithEmail } from "@/app/lib/users";
import { User } from "@/types/user";
import { NextRequest, NextResponse } from "next/server";

/**
 * Route will fetch the user object from the email inputted
 *
 * @export
 * @param {{ params: { slug: string } }} { params }
 */
export async function GET(request: NextRequest): Promise<NextResponse<Partial<User | null>>> {
    // get email from search params
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get('email');

    try {
        // fetch the user with the email
        const user = await getUserWithEmail(email, true);
        return NextResponse.json(user || null);
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