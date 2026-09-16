import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { requireAuth } from "../middleware/auth.js";
import { validateBody } from "../middleware/validate.js";
import { AppError } from "../middleware/errorHandler.js";
import { comparePassword, hashPassword } from "../utils/password.js";
import {
  generateOpaqueToken,
  hashToken,
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";
import {
  forgotPasswordSchema,
  loginSchema,
  refreshSchema,
  registerSchema,
  resetPasswordSchema,
} from "../schemas/auth.schema.js";
import { sendPasswordResetEmail } from "../services/email.service.js";

export const authRouter = Router();

const RESET_TOKEN_TTL_MS = 60 * 60 * 1000; // 1 hour
const FRONTEND_URL = process.env["FRONTEND_URL"] ?? "http://localhost:5173";

async function issueTokenPair(userId: string, role: "CUSTOMER" | "RIDER" | "ADMIN") {
  const accessToken = signAccessToken({ sub: userId, role });
  const { token: refreshToken, expiresAt } = signRefreshToken(userId);

  await prisma.refreshToken.create({
    data: {
      userId,
      tokenHash: hashToken(refreshToken),
      expiresAt,
    },
  });

  return { accessToken, refreshToken };
}

authRouter.post("/register", validateBody(registerSchema), async (req, res) => {
  const { email, password, name, phone } = req.body;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new AppError(409, "An account with this email already exists");
  }

  const passwordHash = await hashPassword(password);
  const user = await prisma.user.create({
    data: { email, passwordHash, name, phone },
  });

  const tokens = await issueTokenPair(user.id, user.role);
  res.status(201).json({
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
    ...tokens,
  });
});

authRouter.post("/login", validateBody(loginSchema), async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await comparePassword(password, user.passwordHash))) {
    throw new AppError(401, "Invalid email or password");
  }

  const tokens = await issueTokenPair(user.id, user.role);
  res.json({
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
    ...tokens,
  });
});

authRouter.post("/refresh", validateBody(refreshSchema), async (req, res) => {
  const { refreshToken } = req.body;

  let payload: { sub: string; jti: string };
  try {
    payload = verifyRefreshToken(refreshToken);
  } catch {
    throw new AppError(401, "Invalid or expired refresh token");
  }

  const stored = await prisma.refreshToken.findUnique({
    where: { tokenHash: hashToken(refreshToken) },
  });
  if (!stored || stored.revokedAt || stored.expiresAt < new Date() || stored.userId !== payload.sub) {
    throw new AppError(401, "Invalid or expired refresh token");
  }

  const user = await prisma.user.findUnique({ where: { id: stored.userId } });
  if (!user) {
    throw new AppError(401, "Invalid or expired refresh token");
  }

  await prisma.refreshToken.update({
    where: { id: stored.id },
    data: { revokedAt: new Date() },
  });

  const tokens = await issueTokenPair(user.id, user.role);
  res.json(tokens);
});

authRouter.post("/logout", validateBody(refreshSchema), async (req, res) => {
  const { refreshToken } = req.body;

  await prisma.refreshToken.updateMany({
    where: { tokenHash: hashToken(refreshToken), revokedAt: null },
    data: { revokedAt: new Date() },
  });

  res.status(204).send();
});

authRouter.post("/forgot-password", validateBody(forgotPasswordSchema), async (req, res) => {
  const { email } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  // Always respond the same way whether or not the account exists — avoids leaking who's registered.
  if (user) {
    const rawToken = generateOpaqueToken();
    const expiresAt = new Date(Date.now() + RESET_TOKEN_TTL_MS);

    await prisma.passwordResetToken.create({
      data: { userId: user.id, tokenHash: hashToken(rawToken), expiresAt },
    });

    const resetLink = `${FRONTEND_URL}/reset-password?token=${rawToken}`;
    await sendPasswordResetEmail(user.email, user.name, resetLink);
  }

  res.json({ message: "If an account exists for that email, a reset link has been sent." });
});

authRouter.post("/reset-password", validateBody(resetPasswordSchema), async (req, res) => {
  const { token, password } = req.body;

  const stored = await prisma.passwordResetToken.findUnique({
    where: { tokenHash: hashToken(token) },
  });
  if (!stored || stored.usedAt || stored.expiresAt < new Date()) {
    throw new AppError(400, "This reset link is invalid or has expired");
  }

  const passwordHash = await hashPassword(password);

  await prisma.$transaction([
    prisma.user.update({ where: { id: stored.userId }, data: { passwordHash } }),
    prisma.passwordResetToken.update({ where: { id: stored.id }, data: { usedAt: new Date() } }),
    // Force re-login everywhere else — a reset should invalidate any session an attacker may hold.
    prisma.refreshToken.updateMany({
      where: { userId: stored.userId, revokedAt: null },
      data: { revokedAt: new Date() },
    }),
  ]);

  res.json({ message: "Password updated. Please sign in with your new password." });
});

authRouter.get("/me", requireAuth, async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.user!.id } });
  if (!user) {
    throw new AppError(401, "User not found");
  }
  res.json({ id: user.id, email: user.email, name: user.name, role: user.role });
});
