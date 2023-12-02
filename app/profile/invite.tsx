'use client';

import { inviteUser } from "@/app/auth/invite";
import { User } from "@/types/user";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { Button, Text, TextInput, Title } from "@tremor/react";
import { useSearchParams } from "next/navigation";
import { DetailedHTMLProps, HTMLAttributes, useState } from "react";
import { z } from "zod";

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
export default function InviteUsers({ user, ...divParams }: { user?: Partial<User> } & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  // define states
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // set callback URL
  // https://next-auth.js.org/getting-started/client#specifying-a-callbackurl
  const callbackUrl = useSearchParams().get("callbackUrl") || "/";

  // handle sign in function
  const handleInvite = async () => {
    setLoading(true);
    // parse the data
    try {
      const parsedEmail = InvitedEmail.parse(email);
      await inviteUser(parsedEmail, { callbackUrl });
      setSuccess(true);
    } catch (e: any) {
      console.warn("Error with invite", e);
      setError(e?.message);
    };
    setLoading(false);
  };

  return (
    <div className="mt-10" {...divParams}>
        <Title className="mb-1 ml-1">Invite New Users</Title>
        <TextInput type="email" onSelect={() => setError("")} onValueChange={(val) => setEmail(val)} placeholder="Enter Email" />
        <Button onClick={handleInvite} icon={PaperAirplaneIcon} aria-disabled={loading} loading={loading} className="mt-4 w-full">
          Invite User
        </Button>
        <Text className="mt-1 text-center" color="red">{error}</Text>
    </div>
  );
}
