import NextAuth from 'next-auth';
// import Github from "next-auth/providers/github";
import Email from "next-auth/providers/email"
import PostgresAdapter from "@auth/pg-adapter";
// import PostgresAdapter from '@/app/lib/postgres-adaptor';
// import { Pool } from 'pg';
import { FirestoreAdapter } from "@auth/firebase-adapter"
import { firestore } from '@/app/lib/firebase';

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
      from: process.env.EMAIL_FROM,
    }),
  ],
};

export default NextAuth(AuthOptions);
