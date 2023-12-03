import NextAuth, { NextAuthConfig } from 'next-auth';
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { firestore } from '@/app/lib/firebase';
import { sendVerificationRequest } from '@/app/auth/email-config';

// set the initial base
const initialBaseURL =
	process.env.NEXT_PUBLIC_SITE_URL ??
	process.env.NEXT_PUBLIC_VERCEL_URL ??
	"http://localhost:3000/";
/**
 * The base url for the server side code
 * https://github.com/vercel/next.js/discussions/16429
 * https://vercel.com/docs/concepts/projects/environment-variables/system-environment-variables
 * Defaults to vercel url, will fallback to env variable for local host
 */
export const BaseURL = initialBaseURL.startsWith("http")
	? initialBaseURL
	: `https://${initialBaseURL}`;

// http guide: https://authjs.dev/guides/providers/email-http
// smtp guide: https://next-auth.js.org/providers/email
// How to access: https://authjs.dev/guides/upgrade-to-v5?authentication-method=server-component#authentication-methods
export const AuthOptions = {
  adapter: FirestoreAdapter(firestore),
  secret: process.env.AUTH_SECRET,
  // https://authjs.dev/getting-started/providers/email-tutorial
  providers: [
    {
      id: 'email',
      name: 'Email',
      type: 'email',
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM || "",
      maxAge: 24 * 60 * 60,
      sendVerificationRequest: sendVerificationRequest,
      options: {},
    },
  ],
  pages: {
    signIn: '/auth/sign-in',
  },
} satisfies NextAuthConfig;

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth(AuthOptions);
