import { AuthOptions } from "@/app/lib/auth";
import { getUserWithEmail } from "@/app/lib/users";
import ProfileForm from "@/app/profile/form";
import { Button } from "@tremor/react";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";

/**
 * Main profile page
 *
 * @export
 * @return {*} 
 */
export default async function Profile() {
    const session = await getServerSession(AuthOptions);
    // fetch the user with the email
    const user = await getUserWithEmail(session?.user?.email, true);
    return (
      <main className="p-4 md:p-10 mx-auto max-w-7xl">
        <ProfileForm user={user} />
      </main>
    )
  }