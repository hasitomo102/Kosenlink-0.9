'use client';

import { Button, TextInput } from "@tremor/react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

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

  const handleSignIn = async () => {
    setLoading(true);
    await signIn('email', { email });
    setLoading(false);
  };

  // set callback URL
  // https://next-auth.js.org/getting-started/client#specifying-a-callbackurl
  const callbackURL = useSearchParams();
  console.log(callbackURL);

  return (
    <div className="flex-grow mx-auto w-full max-w-sm p-6">
      <div className="mx-auto w-full max-w-sm p-6">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
        <TextInput onValueChange={(val) => setEmail(val)} className="mt-4" placeholder="Enter your email" />
        <Button aria-disabled={loading} loading={loading} onClick={handleSignIn} className="mt-4 w-full">Sign in with Email</Button>
      </div>
    </div>
  );
}
