import { createHmac, timingSafeEqual } from "node:crypto";

const ADMIN_COOKIE_NAME = "selfhostai_admin";

function getAdminSecret() {
  const secret = process.env.ADMIN_ACCESS_TOKEN;

  if (!secret) {
    throw new Error("ADMIN_ACCESS_TOKEN is not configured");
  }

  return secret;
}

function sign(value: string) {
  return createHmac("sha256", getAdminSecret()).update(value).digest("base64url");
}

export function getAdminCookieName() {
  return ADMIN_COOKIE_NAME;
}

export function createAdminCookieValue() {
  const payload = "admin";
  return `${payload}.${sign(payload)}`;
}

export function hasAdminAccess(value?: string | null) {
  if (!value) {
    return false;
  }

  const [payload, signature] = value.split(".");

  if (!payload || !signature) {
    return false;
  }

  const expected = sign(payload);
  const incomingBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  if (incomingBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return payload === "admin" && timingSafeEqual(incomingBuffer, expectedBuffer);
}
