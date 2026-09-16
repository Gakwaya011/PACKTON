const USERNAME = process.env["AFRICASTALKING_USERNAME"];
const API_KEY = process.env["AFRICASTALKING_API_KEY"];
const SENDER_ID = process.env["AFRICASTALKING_SENDER_ID"];

export const isSmsConfigured = Boolean(USERNAME && API_KEY);

/**
 * Fire-and-forget SMS send via Africa's Talking. No-ops with a console log when
 * credentials aren't configured yet, so the rest of the order flow never blocks on it.
 */
export async function sendSms(to: string, message: string): Promise<void> {
  if (!isSmsConfigured) {
    console.log(`[sms:stub] would send to ${to}: ${message}`);
    return;
  }

  try {
    const params = new URLSearchParams({
      username: USERNAME!,
      to,
      message,
      ...(SENDER_ID ? { from: SENDER_ID } : {}),
    });

    const res = await fetch("https://api.africastalking.com/version1/messaging", {
      method: "POST",
      headers: {
        apiKey: API_KEY!,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: params.toString(),
    });

    if (!res.ok) {
      console.error(`[sms] Africa's Talking request failed: ${res.status} ${await res.text()}`);
    }
  } catch (err) {
    console.error("[sms] failed to send SMS", err);
  }
}
