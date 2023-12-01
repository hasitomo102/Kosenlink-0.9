import { getUserWithEmail } from "@/app/lib/users";
import { User } from "@/types/user";
import { NextResponse } from "next/server";

/**
 * Route will fetch the user object from the email inputted
 *
 * @export
 * @param {{ params: { slug: string } }} { params }
 */
export async function GET({ params }: { params: { email: string } }): Promise<NextResponse<Partial<User | null>>> {
    try {
        // fetch the email
        const user = await getUserWithEmail(params.email, true);
        return NextResponse.json(user || null);
    } catch (error: any) {
        throw Error(error);
    }
};