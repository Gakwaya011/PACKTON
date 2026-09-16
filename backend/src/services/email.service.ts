import nodemailer, { type Transporter } from "nodemailer";

const SMTP_HOST = process.env["SMTP_HOST"];
const SMTP_PORT = process.env["SMTP_PORT"];
const SMTP_USER = process.env["SMTP_USER"];
const SMTP_PASSWORD = process.env["SMTP_PASS"];
const SMTP_FROM = process.env["SMTP_FROM"] ?? "Packton <no-reply@packton.com>";

export const isEmailConfigured = Boolean(SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASSWORD);

let transporter: Transporter | null = null;

function getTransporter(): Transporter {
  if (!transporter) {
    const port = Number(SMTP_PORT);
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
    });
  }
  return transporter;
}

/**
 * Fire-and-forget-friendly mail send. Returns whether it actually went out —
 * callers that depend on delivery (e.g. handing someone their only copy of a
 * generated password) should check the return value and fall back accordingly,
 * rather than assuming success.
 */
export async function sendMail(to: string, subject: string, text: string): Promise<boolean> {
  if (!isEmailConfigured) {
    console.log(`[email:stub] would send to ${to}: ${subject}\n${text}`);
    return false;
  }

  try {
    await getTransporter().sendMail({ from: SMTP_FROM, to, subject, text });
    return true;
  } catch (err) {
    console.error("[email] failed to send", err);
    return false;
  }
}

export async function sendCredentialsEmail(to: string, name: string, password: string): Promise<boolean> {
  const subject = "Your Packton account";
  const text = `Hi ${name},

An account has been created for you on Packton.

Email: ${to}
Temporary password: ${password}

Please sign in and consider changing your password.

— Packton`;

  return sendMail(to, subject, text);
}

export async function sendPasswordResetEmail(to: string, name: string, resetLink: string): Promise<boolean> {
  const subject = "Reset your Packton password";
  const text = `Hi ${name},

We received a request to reset your Packton password. Click the link below to choose a new one:

${resetLink}

This link expires in 1 hour. If you didn't request this, you can safely ignore this email — your password won't change.

— Packton`;

  return sendMail(to, subject, text);
}
