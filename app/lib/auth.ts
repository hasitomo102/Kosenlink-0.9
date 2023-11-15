import NextAuth, { NextAuthOptions } from 'next-auth';
import Email from "next-auth/providers/email";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { firestore } from '@/app/lib/firebase';
import { getUserWithEmail } from '@/app/lib/users';

// http guide: https://authjs.dev/guides/providers/email-http
// smtp guide: https://next-auth.js.org/providers/email
export const AuthOptions = {
  adapter: FirestoreAdapter(firestore),
  secret: process.env.AUTH_SECRET,
  // https://authjs.dev/getting-started/providers/email-tutorial
  providers: [
    Email({
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      sendVerificationRequest: () => {
        
      },
      from: process.env.EMAIL_FROM,
    }),
  ],

  // only send magic links to existing users
  // https://next-auth.js.org/providers/email#sending-magic-links-to-existing-users
  callbacks: {
    async signIn({ user }) {
      const userExists = await getUserWithEmail(user.email);
      // email magic link to existing user, otherwise go to profile screen
      return !userExists ? true : "/profile";
    },
  }
} satisfies NextAuthOptions;

export default NextAuth(AuthOptions);
