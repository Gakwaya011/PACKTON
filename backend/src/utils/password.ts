import bcrypt from "bcrypt";
import { randomBytes } from "node:crypto";

const SALT_ROUNDS = 12;

export function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, SALT_ROUNDS);
}

export function comparePassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

/** A one-off password for accounts an admin creates on someone else's behalf. */
export function generateTempPassword(): string {
  return randomBytes(9).toString("base64url");
}
