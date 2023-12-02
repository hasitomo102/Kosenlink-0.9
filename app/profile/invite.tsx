'use client';

import { User } from "@/types/user";
import { CheckCircleIcon, PaperAirplaneIcon, SparklesIcon } from "@heroicons/react/24/solid";
import { Button, Text, TextInput, Title } from "@tremor/react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { fromZodError } from 'zod-validation-error';

// set schema
const InvitedEmail = z.string().email("Please enter a valid email address.");

/**
 * Basic invite page screen for new invites
 * https://authjs.dev/guides/basics/pages?frameworks=core#email-sign-in
 * Can also make use of a redirect: https://next-auth.js.org/getting-started/client#using-the-redirect-false-option
 *
 * @export
 * @return {*} 
 */
export default function InviteUsers() {
  // define states
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // function that will create the callback url to the profile screen with the query parameters
  const createProfileCallbackUrl = (callbackUrl: string) => {
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
  const handleInvite = async () => {
    setLoading(true);
    // parse the data
    try {
      const parsedEmail = InvitedEmail.parse(email);

      // check if user is in database
      const emailParams = new URLSearchParams();
      emailParams.set('email', parsedEmail);
      const userResponse = await fetch(`/api/get-user?${emailParams.toString()}`);
      const userData: Partial<User | null> = await userResponse.json();

      // if it is a new user, set the referring url in the parameters for the profile screen
      if (!userData) {
        const newCallbackUrl = createProfileCallbackUrl(callbackUrl);
        await signIn('email', { email: parsedEmail, callbackUrl: newCallbackUrl, redirect: false, invite: true });
        setSuccess(true);
      } else {
        // return the normal callback url if user already has an account
        await signIn('email', { email: parsedEmail, callbackUrl, redirect: false, invite: true });
        setSuccess(true);
      }
    } catch (e: any) {
      console.warn("Error with invite", e);
      setError(e?.message);
    };
    setLoading(false);
  };

  return (
    <div className="mt-10">
        <Title className="mb-1 ml-1">Invite New Users</Title>
        <TextInput type="email" onSelect={() => setError("")} onValueChange={(val) => setEmail(val)} placeholder="Enter Email" />
        <Button onClick={handleInvite} icon={PaperAirplaneIcon} aria-disabled={loading} loading={loading} className="mt-4 w-full">
          Invite User
        </Button>
        <Text className="mt-1 text-center" color="red">{error}</Text>
    </div>
  );
}
