import { AuthOptions, auth } from "@/app/lib/auth";
import { getUserWithEmail, updateUser } from "@/app/lib/users";
import ProfileForm from "@/app/profile/form";
import { Button } from "@tremor/react";
import { signOut } from "next-auth/react";

/**
 * Main profile page
 *
 * @export
 * @return {*} 
 */
export default async function Profile() {
    const session = await auth();
    // fetch the user with the email
    const user = await getUserWithEmail(session?.user?.email, true);
    console.log("user:", user);
    // const test = await updateUser({ ...user, email: user?.email || "test@gmail.com", firstName: "Kekoa" });

    return (
      <main className="p-4 md:p-10 mx-auto max-w-7xl">
        <ProfileForm user={user} />
      </main>
    )
  }