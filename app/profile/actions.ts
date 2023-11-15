'use server';

import { AuthOptions } from "@/app/lib/auth";
import { updateUser } from "@/app/lib/users";
import { getServerSession } from "next-auth";

 
/**
 * Server action for the profile screen form
 *
 * @export
 * @param {FormData} formData
 */
export async function updateProfileData(formData: FormData) {
  const rawFormData = {
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
  };

  // get the user profile
  const session = await getServerSession(AuthOptions);
  if (!session?.user?.email) throw Error("User is not authenticated");
  
  // update the database
  updateUser({ ...rawFormData, email: session?.user.email });
}