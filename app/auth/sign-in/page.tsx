'use client';

import { getUserWithEmail } from "@/app/lib/users";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { Button, Text, TextInput } from "@tremor/react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { startTransition, useState } from "react";
import { z } from "zod";
import { fromZodError } from 'zod-validation-error';

// set schema
const LoginEmail = z.string().email("Please enter a valid email address.");

/**
 * Sign in page using the next auth framework
 * https://authjs.dev/guides/basics/pages?frameworks=core#email-sign-in
 * Can also make use of a redirect: https://next-auth.js.org/getting-started/client#using-the-redirect-false-option
 *
 * @export
 * @return {*} 
 */
export default function SignIn() {
  // define states
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  // get router
  const { replace } = useRouter();

  // function that will create the callback url to the profile screen with the query parameters
  const createCallbackUrl = (callbackUrl: string) => {
    const params = new URLSearchParams();
    if (callbackUrl) {
      params.set('callbackUrl', callbackUrl);
    } else {
      params.delete('callbackUrl');
    };

    return `${window.location.origin}/profile?${params.toString()}`
  };

  // set callback URL
  // https://next-auth.js.org/getting-started/client#specifying-a-callbackurl
  const callbackUrl = useSearchParams().get("callbackUrl") || "/";

  // handle sign in function
  const handleSignIn = async () => {
    setLoading(true);
    // parse the data
    try {
      const parsedEmail = LoginEmail.parse(email);
      // check if user is in database
      // const user = await getUserWithEmail(parsedEmail, true);

      // if it is a new user, set the referring url in the parameters for the profile screen
      if (true) {
        const newCallbackUrl = createCallbackUrl(callbackUrl);
        await signIn('email', { email: parsedEmail, callbackUrl: newCallbackUrl });
      } else {
        // return the normal callback url if user already has an account
        await signIn('email', { email: parsedEmail, callbackUrl });
      }
    } catch (e: any) {
      const error = fromZodError(e);
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex-grow mx-auto w-full max-w-sm p-6">
      <div className="mx-auto w-full max-w-sm p-6">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Enter your email to sign in
        </h2>
        <TextInput onSelect={() => setError("")} onValueChange={(val) => setEmail(val)} className="mt-4" placeholder="Enter your email" />
        <Button icon={SparklesIcon} aria-disabled={loading} loading={loading} onClick={handleSignIn} className="mt-4 w-full">Send magic sign-in link</Button>
        <Text className="mt-2 text-center" color="red">{error}</Text>
      </div>
    </div>
  );
}
