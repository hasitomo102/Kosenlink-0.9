'use client';

import { User } from "@/types/user";
import { Button } from "@tremor/react";
import { getSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * Main profile page
 *
 * @export
 * @return {*} 
 */
export default function ProfileForm({ user }: { user?: Partial<User> }) {
    // define router
    const router = useRouter();

    console.log(user);

    return (
        <div> 
        { user?.id ?
                        <div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                        First Name
                        </label>
                        <div className="mt-2">
                        <input
                            name="first"
                            id="first"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder={user.firstName || "First Name"}
                        />
                        </div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                        Last Name
                        </label>
                        <div className="mt-2">
                        <input
                            name="last"
                            id="last"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder={user.lastName || "Last Name"}
                        />
                        </div>
                        <Button onClick={() => signOut()} variant="light">Sign Out</Button>
                    </div> : <Button onClick={() => router.push("/")} variant="light">Return to Home Screen</Button>
        }
      </div>
    )
  }