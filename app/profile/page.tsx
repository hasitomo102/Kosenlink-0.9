import { ActionButton } from "@/app/components/action-button";
import SignOutButton from "@/app/components/signout-button";
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
    
  	/**
     * Define the submitting form action
     *
     * @param {FormData} data
     */
    const submitFormAction = async (formData: FormData) => {
      "use server";
      try {
        // update the data with the server action
        if (user?.email) {
          console.log("Updating user");
          await updateUser({ email: user?.email,  })
        }
      } catch (e: any) {
        console.warn("error with form action", e);
      }
    };

    return (
      <main className="p-4 md:p-10 mx-auto max-w-7xl">
        {/* <ProfileForm user={user} /> */}
        <form action={submitFormAction}>
            <label className="block text-sm font-medium leading-6 text-gray-900">
            First Name
            </label>
            <div className="mt-2">
            <input
                name="firstName"
                id="firstName"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder={user?.firstName || "First Name"}
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
                placeholder={user?.lastName || "Last Name"}
            />
            </div>
            {/* <ActionButton title="Submit" action={handleSubmit} /> */}
            <Button type="submit">Submit</Button>
            <SignOutButton redirectURL="/" />
      </form>
      </main>
    )
  }