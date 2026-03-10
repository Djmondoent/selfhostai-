import { createHmac, timingSafeEqual } from "node:crypto";

import { BILLING_COOKIE_NAME, billingPlans, type BillingPlanKey } from "@/lib/billing";

type AccessGrant = {
  planKey: BillingPlanKey;
  sessionId: string;
  customerEmail: string | null;
  issuedAt: number;
};

function getSecret() {
  const secret = process.env.ACCESS_COOKIE_SECRET;

  if (!secret) {
    throw new Error("ACCESS_COOKIE_SECRET is not configured");
  }

  return secret;
}

function sign(payload: string) {
  return createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

export function encodeAccessGrant(grant: AccessGrant) {
  const payload = Buffer.from(JSON.stringify(grant)).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function decodeAccessGrant(value?: string | null) {
  if (!value) {
    return null;
  }

  const [payload, signature] = value.split(".");

  if (!payload || !signature) {
    return null;
  }

  const expected = sign(payload);
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  if (signatureBuffer.length !== expectedBuffer.length) {
    return null;
  }

  if (!timingSafeEqual(signatureBuffer, expectedBuffer)) {
    return null;
  }

  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as AccessGrant;
    return billingPlans.some((plan) => plan.key === parsed.planKey) ? parsed : null;
  } catch {
    return null;
  }
}

export function hasPaidAccess(cookieValue?: string | null) {
  return decodeAccessGrant(cookieValue) !== null;
}

export function getAccessCookieName() {
  return BILLING_COOKIE_NAME;
}
