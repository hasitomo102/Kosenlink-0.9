'use client';

import { ActionButton } from "@/app/components/action-button";
import { updateUser } from "@/app/lib/users";
import { updateProfileData } from "@/app/profile/actions";
import { User } from "@/types/user";
import { Button } from "@tremor/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { z } from "zod";

/**
 * Define the form schema for zod form validation
 */
const FormSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
});

/**
 * Main profile page
 *
 * @export
 * @return {*} 
 */
export default function ProfileForm({ user }: { user?: Partial<User> }) {
    // define router
    const router = useRouter();
    // State to manage form data and errors
    const [formData, setFormData] = useState({ firstName: '', lastName: '' });
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

    // Handle form submission
    const handleSubmit = async () => {
        // Validate the form data
        try {
            const data = FormSchema.parse(formData);
            setFormErrors({});
            await updateUser({ email: user?.email || "", ...data });
            // Form data is valid, you can submit it to the server or perform other actions
            console.log('Form data is valid:', formData);
            } catch (error) {
                // Validation failed, set the form errors
                if (error instanceof Error) {
                    setFormErrors({ [error.name[0]]: error.message });
                }
        }
    };

    return (
        // <form action={updateProfileData}>
        <div>
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
                        <ActionButton title="Submit" action={handleSubmit} />
                        <Button onClick={() => signOut()} variant="light">Sign Out</Button>
                    </div> : <Button onClick={() => router.push("/")} variant="light">Return to Home Screen</Button>
        }
      </div>
    )
}
