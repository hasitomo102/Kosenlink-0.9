import { createTransport } from "nodemailer";
import { SendVerificationRequestParams } from "next-auth/providers";
import { ExtraEmailOptions } from "@/types/auth";

/**
 * Function to send verification request
 * https://next-auth.js.org/providers/email#customizing-emails
 *
 * @param {SendVerificationRequestParams} { identifier, url, provider, theme }
 */
export async function sendVerificationRequest(params: SendVerificationRequestParams) {
  // get the parameters and the extra options from the sign in request
  const { identifier, url, provider, theme } = params;
  const extraOptions = {
  senderName: undefined,
  emailSubject: undefined,
  emailMessage: undefined,
  buttonText: undefined,
};
  console.log("NEXTAUTH_URL", process.env.NEXTAUTH_URL);
  console.log("AUTH_URL", process.env.AUTH_URL);
  console.log("VERCEL_URL", process.env.VERCEL_URL);
  console.log("NEXT_INTERNAL_URL", process.env.NEXTAUTH_URL_INTERNAL);
  console.log("AUTH_REDIRECT_PROXY_URL", process.env.AUTH_REDIRECT_PROXY_URL);
  console.log("AUTH_SECRET", process.env.AUTH_SECRET);
  console.log("NEXTAUTH_SECRET", process.env.NEXTAUTH_SECRET);

  // NOTE: You are not required to use `nodemailer`, use whatever you want.
  console.log("Creating transport");
  const transport = createTransport(provider.server);
  console.log("Transport created, sending mail");
  const result = await transport.sendMail({
    to: identifier,
    from: `${extraOptions.senderName || "Neo Open Source"} <${provider.from}>`,
    subject: extraOptions.emailSubject || `Sign in to your Neo account`,
    text: text(extraOptions.emailMessage),
    html: html({ url, emailMessage: extraOptions.emailMessage, buttonText: extraOptions.buttonText, theme }),
  });
  console.log("sent mail");
  const failed = result?.rejected?.concat(result.pending)?.filter(Boolean);
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
  };
}

/**
 * Email HTML body
 * Insert invisible space into domains from being turned into a hyperlink by email
 * clients like Outlook and Apple mail, as this is confusing because it seems
 * like they are supposed to click on it to sign in.
 *
 * @note We don't add the email address to avoid needing to escape it, if you do, remember to sanitize it!
 */
function html(params: { url: string, emailMessage?: string, buttonText?: string, theme: any }) {
  const { url, emailMessage, buttonText, theme } = params;

  const brandColor = theme.brandColor || "#346df1"
  const color = {
    background: "#f9f9f9",
    text: "#444",
    mainBackground: "#fff",
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: theme.buttonText || "#fff",
  };

  return `
  <body style="background: ${color.background};">
    <table width="100%" border="0" cellspacing="20" cellpadding="0"
      style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
      <tr>
        <td align="center"
          style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
          ${emailMessage || "Sign into your Neo Account."}
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 20px 0;">
          <table border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><a href="${url}"
                  target="_blank"
                  style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">
                  ${buttonText || "Sign In"}
              </a></td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td align="center"
          style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
          If you did not request this email you can safely ignore it.
        </td>
      </tr>
    </table>
  </body>
  `;
}

/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
function text(message?: string) {
  return `\n${message || "Sign in."}\n\n`;
};