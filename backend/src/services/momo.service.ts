import { randomUUID } from "node:crypto";

const MOMO_SUBSCRIPTION_KEY = process.env["MOMO_SUBSCRIPTION_KEY"];
const MOMO_API_USER = process.env["MOMO_API_USER"];
const MOMO_API_KEY = process.env["MOMO_API_KEY"];
const MOMO_TARGET_ENVIRONMENT = process.env["MOMO_TARGET_ENVIRONMENT"] ?? "sandbox";
const MOMO_BASE_URL = process.env["MOMO_BASE_URL"] ?? "https://sandbox.momodeveloper.mtn.com";

const AIRTEL_CLIENT_ID = process.env["AIRTEL_CLIENT_ID"];
const AIRTEL_CLIENT_SECRET = process.env["AIRTEL_CLIENT_SECRET"];
const AIRTEL_BASE_URL = process.env["AIRTEL_BASE_URL"] ?? "https://openapiuat.airtel.africa";

export const isMomoConfigured = Boolean(MOMO_SUBSCRIPTION_KEY && MOMO_API_USER && MOMO_API_KEY);
export const isAirtelConfigured = Boolean(AIRTEL_CLIENT_ID && AIRTEL_CLIENT_SECRET);

export type RemittanceMethod = "MTN_MOMO" | "AIRTEL_MONEY";

export interface RemittanceResult {
  status: "SENT" | "STUB" | "FAILED";
  reference?: string;
  error?: string;
}

async function getMomoAccessToken(): Promise<string> {
  const credentials = Buffer.from(`${MOMO_API_USER}:${MOMO_API_KEY}`).toString("base64");
  const res = await fetch(`${MOMO_BASE_URL}/disbursement/token/`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Ocp-Apim-Subscription-Key": MOMO_SUBSCRIPTION_KEY!,
    },
  });
  if (!res.ok) throw new Error(`MTN MoMo token request failed: ${res.status}`);
  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

async function disburseMtnMomo(phone: string, amount: number, currency: string): Promise<RemittanceResult> {
  try {
    const token = await getMomoAccessToken();
    const referenceId = randomUUID();

    const res = await fetch(`${MOMO_BASE_URL}/disbursement/v1_0/transfer`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Reference-Id": referenceId,
        "X-Target-Environment": MOMO_TARGET_ENVIRONMENT,
        "Ocp-Apim-Subscription-Key": MOMO_SUBSCRIPTION_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount.toFixed(2),
        currency,
        payee: { partyIdType: "MSISDN", partyId: phone },
        payerMessage: "Packton COD remittance",
        payeeNote: "Packton COD remittance",
      }),
    });

    if (res.status !== 202) {
      return { status: "FAILED", error: `MTN MoMo transfer request failed: ${res.status}` };
    }
    return { status: "SENT", reference: referenceId };
  } catch (err) {
    return { status: "FAILED", error: err instanceof Error ? err.message : "Unknown error" };
  }
}

async function getAirtelAccessToken(): Promise<string> {
  const res = await fetch(`${AIRTEL_BASE_URL}/auth/oauth2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: AIRTEL_CLIENT_ID,
      client_secret: AIRTEL_CLIENT_SECRET,
      grant_type: "client_credentials",
    }),
  });
  if (!res.ok) throw new Error(`Airtel Money token request failed: ${res.status}`);
  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

async function disburseAirtelMoney(phone: string, amount: number): Promise<RemittanceResult> {
  try {
    const token = await getAirtelAccessToken();
    const transactionId = randomUUID();

    const res = await fetch(`${AIRTEL_BASE_URL}/standard/v1/disbursements/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        payee: { msisdn: phone },
        reference: transactionId,
        transaction: { amount, id: transactionId },
      }),
    });

    if (!res.ok) {
      return { status: "FAILED", error: `Airtel Money disbursement failed: ${res.status}` };
    }
    return { status: "SENT", reference: transactionId };
  } catch (err) {
    return { status: "FAILED", error: err instanceof Error ? err.message : "Unknown error" };
  }
}

/**
 * Pays out a collected COD amount to the merchant's mobile money account.
 * No-ops with a STUB result when the relevant provider isn't configured yet —
 * the Payment row still gets created, just not marked remitted.
 */
export async function disburseRemittance(
  method: RemittanceMethod,
  phone: string,
  amount: number,
  currency = "RWF"
): Promise<RemittanceResult> {
  if (method === "MTN_MOMO") {
    if (!isMomoConfigured) {
      console.log(`[momo:stub] would disburse ${amount} ${currency} to ${phone} via MTN MoMo`);
      return { status: "STUB" };
    }
    return disburseMtnMomo(phone, amount, currency);
  }

  if (!isAirtelConfigured) {
    console.log(`[momo:stub] would disburse ${amount} ${currency} to ${phone} via Airtel Money`);
    return { status: "STUB" };
  }
  return disburseAirtelMoney(phone, amount);
}
