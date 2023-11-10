import NextAuth from 'next-auth';
// import Github from "next-auth/providers/github";
import Email from "next-auth/providers/email"
import PostgresAdapter from "@auth/pg-adapter";
// import PostgresAdapter from '@/app/lib/postgres-adaptor';
import { Pool } from 'pg';

// http guide: https://authjs.dev/guides/providers/email-http
// smtp guide: https://next-auth.js.org/providers/email

// https://authjs.dev/reference/adapter/pg
const pool = new Pool();

export default NextAuth({
  adapter: PostgresAdapter(pool),
  secret: process.env.AUTH_SECRET,
  // https://authjs.dev/getting-started/providers/email-tutorial
  providers: [
    // {
    //   id: 'email',
    //   type: 'email',
    //   // server: {
    //   //   host: process.env.SMTP_HOST,
    //   //   port: Number(process.env.SMTP_PORT),
    //   //   auth: {
    //   //     user: process.env.SMTP_USER,
    //   //     pass: process.env.SMTP_PASSWORD,
    //   //   },
    //   // },
    //   // from: process.env.EMAIL_FROM as string,
    // },
    // Github({
    //   clientId: process.env.OAUTH_CLIENT_KEY as string,
    //   clientSecret: process.env.OAUTH_CLIENT_SECRET as string
    // }),
    // }
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
  // https://authjs.dev/guides/basics/pages
  // pages: {
  //   signIn: '/sign-in',
  //   verifyRequest: "/verify-request",
  // }
});
