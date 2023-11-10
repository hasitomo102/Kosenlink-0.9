import NextAuth from 'next-auth';
import Github from "next-auth/providers/github";
import Email from "next-auth/providers/email"
import PostgresAdapter from "@auth/pg-adapter";
import { Pool } from 'pg'
import { Provider } from 'next-auth/providers';

// http guide: https://authjs.dev/guides/providers/email-http
// smtp guide: https://next-auth.js.org/providers/email

// https://authjs.dev/reference/adapter/pg
const pool = new Pool({
  host: 'localhost',
  user: 'database-user',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export default NextAuth({
  adapter: PostgresAdapter(pool),
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
    // {
    //   id: 'sendgrid',
    //   type: '',
    //   async sendVerificationRequest({identifier: email, url}) {
    //   }
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
