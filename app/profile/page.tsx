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
 * Main profile page
 *
 * @export
 * @return {*} 
 */
export default async function Profile() {
    // fetch the session and user
    const session = await auth();
    const user = await getUserWithEmail(session?.user?.email, true);
    
  	/**
     * Define the submitting form action
     *
     * @param {FormData} data
     */
    const submitFormAction = async (formData: FormData) => {
      "use server";
      const parsedData = FormSchema.parse({
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
      });
      
      try {
        // update the data with the server action
        if (user?.email) {
          await updateUser({ email: user?.email, ...parsedData });
        }
      } catch (e: any) {
        console.warn("error with form action", e);
        throw Error(e);
      }
    };

    return (
      <main className="p-4 md:p-10 mx-auto max-w-7xl">
        {/* <ProfileForm user={user} /> */}
        <form action={submitFormAction}>
            <label className="block text-sm font-medium leading-6 text-gray-900 mt-2">
            First Name
            </label>
            <TextInput
                name="firstName"
                id="firstName"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder={user?.firstName || "First Name"}
                defaultValue={user?.firstName}
            />
            <label className="block text-sm font-medium leading-6 text-gray-900 mt-2">
            Last Name
            </label>
            <TextInput
                name="lastName"
                id="lastName"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder={user?.lastName || "Last Name"}
                defaultValue={user?.lastName}
            />
            <SubmitButton loadingText="Updating...">Update User</SubmitButton>
            <SignOutButton redirectURL="/" />
      </form>
      </main>
    )
  }