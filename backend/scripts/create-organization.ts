/**
 * One-off provisioning script for B2B organizations, until an admin dashboard exists.
 * Usage: npx tsx scripts/create-organization.ts "Acme Corp"
 */
import "dotenv/config";
import { randomBytes } from "node:crypto";
import { prisma } from "../src/lib/prisma.js";

const name = process.argv[2];
if (!name) {
  console.error("Usage: npx tsx scripts/create-organization.ts \"Organization Name\"");
  process.exit(1);
}

const apiKey = `pk_${randomBytes(24).toString("hex")}`;

const organization = await prisma.organization.create({
  data: { name, apiKey },
});

console.log(`Created organization "${organization.name}" (${organization.id})`);
console.log(`API key: ${apiKey}`);
console.log("Give this key to the client for CSV manifest uploads via X-API-Key header.");

process.exit(0);
