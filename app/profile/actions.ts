'use server';

import { AuthOptions } from "@/app/lib/auth";
import { updateUser } from "@/app/lib/users";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";

/**
 * Define the form schema for zod form validation
 */
const FormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

 
/**
 * Server action for the profile screen form
 *
 * @export
 * @param {FormData} formData
 */
export async function updateProfileData(formData: FormData) {
  // parse the data
  const parsedData = FormSchema.parse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
  });

  // get the user profile
  const session = await getServerSession(AuthOptions);
  if (!session?.user?.email) throw Error("User is not authenticated");
  
  // update the database
  updateUser({ ...parsedData, email: session.user.email });

  // revalidate path
  revalidatePath('/profile'); 
}