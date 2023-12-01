'use client';

import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { Subtitle, Title } from "@tremor/react";

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
    <div className="flex-grow mx-auto w-full max-w-lg p-6">
      <div className="mx-auto w-full max-w-lg p-6">
        <CheckCircleIcon className="mt-10 h-10 text-green-600 text-center w-full" />
        <Title className="mt-4 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">
            The magic link has been sent!
        </Title>
        <Subtitle className="mt-4">Open your email and click on the magic link to sign in.</Subtitle>
      </div>
    </div>
  );
}
