/**
 * Bootstraps admin accounts. There's no self-serve or in-app path to ADMIN by design
 * (only an existing admin can create/promote other users, and never to ADMIN via the API) —
 * this script is the one deliberate, out-of-band way to create one.
 *
 * If the email already has an account, it's promoted in place. If not, a brand new
 * ADMIN account is created with a generated password, emailed to them if SMTP is
 * configured (see email.service.ts) — otherwise the password is printed here instead.
 *
 * Usage: npx tsx scripts/make-admin.ts someone@example.com ["Full Name"]
 */
import "dotenv/config";
import { prisma } from "../src/lib/prisma.js";
import { generateTempPassword, hashPassword } from "../src/utils/password.js";
import { sendCredentialsEmail } from "../src/services/email.service.js";

const email = process.argv[2];
const name = process.argv[3];

if (!email) {
  console.error('Usage: npx tsx scripts/make-admin.ts someone@example.com ["Full Name"]');
  process.exit(1);
}

const existing = await prisma.user.findUnique({ where: { email } });

if (existing) {
  const updated = await prisma.user.update({ where: { id: existing.id }, data: { role: "ADMIN" } });
  console.log(`${updated.email} is now ADMIN.`);
} else {
  const tempPassword = generateTempPassword();
  const passwordHash = await hashPassword(tempPassword);

  const created = await prisma.user.create({
    data: { email, name: name ?? "Admin", passwordHash, role: "ADMIN" },
  });

  console.log(`Created new ADMIN account for ${created.email}.`);

  const emailed = await sendCredentialsEmail(created.email, created.name, tempPassword);
  if (emailed) {
    console.log(`Credentials emailed to ${created.email}.`);
  } else {
    console.log(`SMTP isn't configured — temporary password: ${tempPassword}`);
  }
}

process.exit(0);
