import process from "node:process";
import Stripe from "stripe";

const secretKey = process.env.STRIPE_SECRET_KEY;

if (!secretKey) {
  throw new Error("STRIPE_SECRET_KEY is required");
}

const stripe = new Stripe(secretKey);

const plans = [
  {
    productId: "selfhostai_access",
    lookupKey: "selfhostai_access_599",
    name: "SelfHostAI Access",
    amount: 599,
    description: "One-time access to the SelfHostAI dashboard, generators, and deployment toolkit.",
    metadata: {
      tier: "access",
      project_size: "diy"
    }
  },
  {
    productId: "selfhostai_small_help",
    lookupKey: "selfhostai_small_help_2900",
    name: "Small Project Help",
    amount: 2900,
    description: "One-time help tier for a straightforward small project with one main deploy issue.",
    metadata: {
      tier: "support",
      project_size: "small"
    }
  },
  {
    productId: "selfhostai_growth_help",
    lookupKey: "selfhostai_growth_help_7900",
    name: "Growth Project Help",
    amount: 7900,
    description: "One-time help tier for medium-size full-stack apps with more moving parts.",
    metadata: {
      tier: "support",
      project_size: "medium"
    }
  },
  {
    productId: "selfhostai_rescue_help",
    lookupKey: "selfhostai_rescue_help_14900",
    name: "Rescue Project Help",
    amount: 14900,
    description: "One-time help tier for larger, inherited, or messy projects that need deeper rescue work.",
    metadata: {
      tier: "support",
      project_size: "large"
    }
  }
];

for (const plan of plans) {
  let product;

  try {
    product = await stripe.products.retrieve(plan.productId);
    product = await stripe.products.update(plan.productId, {
      name: plan.name,
      description: plan.description,
      metadata: plan.metadata
    });
  } catch {
    product = await stripe.products.create({
      id: plan.productId,
      name: plan.name,
      description: plan.description,
      metadata: plan.metadata
    });
  }

  const existingPrices = await stripe.prices.list({
    lookup_keys: [plan.lookupKey],
    active: true,
    limit: 1
  });

  let price = existingPrices.data[0];

  if (!price) {
    price = await stripe.prices.create({
      product: product.id,
      currency: "usd",
      unit_amount: plan.amount,
      lookup_key: plan.lookupKey,
      metadata: plan.metadata
    });
  }

  console.log(`${plan.name}: product=${product.id} price=${price.id} lookup_key=${plan.lookupKey}`);
}
