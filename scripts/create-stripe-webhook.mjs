import process from "node:process";
import Stripe from "stripe";

const secretKey = process.env.STRIPE_SECRET_KEY;
const appUrl = process.env.APP_URL;

if (!secretKey) {
  throw new Error("STRIPE_SECRET_KEY is required");
}

if (!appUrl) {
  throw new Error("APP_URL is required");
}

const stripe = new Stripe(secretKey);
const webhookUrl = `${appUrl.replace(/\/$/, "")}/api/stripe/webhook`;

const existing = await stripe.webhookEndpoints.list({
  limit: 100
});

const current = existing.data.find((endpoint) => endpoint.url === webhookUrl);

if (current) {
  console.log(`Existing webhook endpoint found: ${current.id} -> ${current.url}`);
  console.log("If you need a new signing secret, create a new endpoint or rotate it in Stripe.");
  process.exit(0);
}

const endpoint = await stripe.webhookEndpoints.create({
  url: webhookUrl,
  enabled_events: ["checkout.session.completed", "checkout.session.async_payment_succeeded"],
  api_version: "2024-06-20"
});

console.log(`Created webhook endpoint: ${endpoint.id}`);
console.log(`Webhook URL: ${endpoint.url}`);
console.log(`Signing secret: ${endpoint.secret}`);
