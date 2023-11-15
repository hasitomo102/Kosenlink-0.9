'use client';

import { updateProfileData } from "@/app/profile/actions";
import { User } from "@/types/user";
import { Button } from "@tremor/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

/**
 * Main profile page
 *
 * @export
 * @return {*} 
 */
export default function ProfileForm({ user }: { user?: Partial<User> }) {
    // define router
    const router = useRouter();

    return (
        <form action={updateProfileData}> 
        { user?.id ?
                        <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                        First Name
                        </label>
                        <div className="mt-2">
                        <input
                            name="firstName"
                            id="firstName"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder={user.firstName || "First Name"}
                        />
                        </div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                        Last Name
                        </label>
                        <div className="mt-2">
                        <input
                            name="lastName"
                            id="lastName"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder={user.lastName || "Last Name"}
                        />
                        </div>
                        <Button type="submit">Save Changes</Button>
                        <Button onClick={() => signOut()} variant="light">Sign Out</Button>
                    </div> : <Button onClick={() => router.push("/")} variant="light">Return to Home Screen</Button>
        }
      </form>
    )
  }