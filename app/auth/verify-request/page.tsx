'use client';

import { Button, TextInput } from "@tremor/react";
import Link from "next/link";

/**
 * Sign in page using the next auth framework
 * https://authjs.dev/guides/basics/pages?frameworks=core#email-sign-in
 * Can also make use of a redirect: https://next-auth.js.org/getting-started/client#using-the-redirect-false-option
 *
 * @export
 * @return {*} 
 */
export default function VerifyRequest() {

  return (
    <div className="flex-grow mx-auto w-full max-w-sm p-6">
      <div className="mx-auto w-full max-w-sm p-6">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            A sign in link has been sent to your email address.
        </h2>
      </div>
    </div>
  );
}
