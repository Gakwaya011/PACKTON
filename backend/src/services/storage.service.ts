import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const ACCOUNT_ID = process.env["R2_ACCOUNT_ID"];
const ACCESS_KEY_ID = process.env["R2_ACCESS_KEY_ID"];
const SECRET_ACCESS_KEY = process.env["R2_SECRET_ACCESS_KEY"];
const BUCKET = process.env["R2_BUCKET"];
const PUBLIC_URL = process.env["R2_PUBLIC_URL"];

export const isStorageConfigured = Boolean(
  ACCOUNT_ID && ACCESS_KEY_ID && SECRET_ACCESS_KEY && BUCKET && PUBLIC_URL
);

let client: S3Client | null = null;

function getClient(): S3Client {
  if (!client) {
    client = new S3Client({
      region: "auto",
      endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: ACCESS_KEY_ID!,
        secretAccessKey: SECRET_ACCESS_KEY!,
      },
    });
  }
  return client;
}

/**
 * Uploads a file to Cloudflare R2 and returns its public URL.
 * Callers must check `isStorageConfigured` first — this throws if credentials are missing,
 * since proof-of-delivery capture is not something that should silently no-op.
 */
export async function uploadFile(buffer: Buffer, key: string, contentType: string): Promise<string> {
  if (!isStorageConfigured) {
    throw new Error("File storage is not configured");
  }

  await getClient().send(
    new PutObjectCommand({
      Bucket: BUCKET!,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    })
  );

  return `${PUBLIC_URL}/${key}`;
}
