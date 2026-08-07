const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY!;
const BASE_URL = "https://api.paystack.co";

interface PaystackInitResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

interface PaystackVerifyResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    status: string; // "success" | "failed" | "abandoned"
    reference: string;
    amount: number;
    currency: string;
    customer: { email: string; name: string };
    paid_at: string;
  };
}

/**
 * Initialize a Paystack transaction.
 * @param email  Customer email
 * @param amount Amount in GHS (will be converted to pesewas)
 * @param reference  Unique reference string
 * @param metadata   Optional extra data stored on Paystack
 */
export async function initializePaystackTransaction(
  email: string,
  amount: number, // in GHS
  reference: string,
  metadata?: Record<string, unknown>
): Promise<PaystackInitResponse> {
  const res = await fetch(`${BASE_URL}/transaction/initialize`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      amount: Math.round(amount * 100), // convert to pesewas
      reference,
      currency: "GHS",
      callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/verify`,
      metadata,
    }),
  });

  if (!res.ok) throw new Error("Paystack initialization failed");
  return res.json();
}

/**
 * Verify a Paystack transaction by reference.
 */
export async function verifyPaystackTransaction(
  reference: string
): Promise<PaystackVerifyResponse> {
  const res = await fetch(`${BASE_URL}/transaction/verify/${reference}`, {
    headers: { Authorization: `Bearer ${PAYSTACK_SECRET}` },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Paystack verification failed");
  return res.json();
}
