import ProfileForm from "@/app/profile/form";
import { Button } from "@tremor/react";
import { signOut } from "next-auth/react";

/**
 * Main profile page
 *
 * @export
 * @return {*} 
 */
export default function Profile() {
    return (
      <main className="p-4 md:p-10 mx-auto max-w-7xl">
        <ProfileForm />
      </main>
    )
  }