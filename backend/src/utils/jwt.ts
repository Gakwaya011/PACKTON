import jwt from "jsonwebtoken";
import { createHash, randomBytes, randomUUID } from "node:crypto";
import type { Role } from "../generated/prisma/enums.js";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} must be set`);
  }
  return value;
}

const ACCESS_SECRET = requireEnv("JWT_ACCESS_SECRET");
const REFRESH_SECRET = requireEnv("JWT_REFRESH_SECRET");

const ACCESS_TOKEN_TTL = "15m";
export const REFRESH_TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export interface AccessTokenPayload {
  sub: string;
  role: Role;
}

export function signAccessToken(payload: AccessTokenPayload): string {
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: ACCESS_TOKEN_TTL });
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  return jwt.verify(token, ACCESS_SECRET) as unknown as AccessTokenPayload;
}

export function signRefreshToken(userId: string): { token: string; jti: string; expiresAt: Date } {
  const jti = randomUUID();
  const expiresAt = new Date(Date.now() + REFRESH_TOKEN_TTL_MS);
  const token = jwt.sign({ sub: userId, jti }, REFRESH_SECRET, {
    expiresIn: Math.floor(REFRESH_TOKEN_TTL_MS / 1000),
  });
  return { token, jti, expiresAt };
}

export function verifyRefreshToken(token: string): { sub: string; jti: string } {
  return jwt.verify(token, REFRESH_SECRET) as unknown as { sub: string; jti: string };
}

export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

/** A random, opaque, single-use token — for links that live outside a JWT (e.g. password reset). */
export function generateOpaqueToken(): string {
  return randomBytes(32).toString("base64url");
}
