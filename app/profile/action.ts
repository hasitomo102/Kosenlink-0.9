import SignOutButton from "@/app/components/signout-button";
import SubmitButton from "@/app/components/submit-form-button";
import { auth } from "@/app/lib/auth";
import { getUserWithEmail, updateUser } from "@/app/lib/users";
import { TextInput } from "@tremor/react";
import { z } from "zod";

/**
 * Define the form schema for zod form validation
 */
const FormSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
  });

/**
 * Define the submitting form action
 *
 * @param {FormData} data
 */
export const submitFormAction = async (email: string, formData: FormData) => {
    "use server";
    const parsedData = FormSchema.parse({
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
    });
    
    try {
        // update the data with the server action
        if (email) {
            await updateUser({ email, ...parsedData });
        }
    } catch (e: any) {
        console.warn("error with form action", e);
        throw Error(e);
    }
    };