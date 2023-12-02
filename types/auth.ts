import { SignInOptions } from "next-auth/react";

/**
 * Extra options returned for the invite options
 * Will be inputted into the next auth sign in function, and to personalize email invites
 *
 * @export
 * @interface InviteOptions
 */
export interface InviteOptions {
    email?: string;
    callbackUrl?: string;
    invite?: 'true' | 'false';
};