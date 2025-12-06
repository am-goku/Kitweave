import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/db";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature") as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    // Retrieve subscription details
    const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

    if (!session?.metadata?.userId) {
      return NextResponse.json({ error: "User ID missing in metadata" }, { status: 400 });
    }

    // Update User in DB
    await prisma.user.update({
      where: { id: session.metadata.userId },
      data: {
        stripeCustomerId: session.customer as string,
        role: "PRO", 
        // In real app, upsert Subscription model here too
      },
    });
  }

  if (event.type === "customer.subscription.deleted") {
     // Handle cancellation
     // prisma.user.update({ where: { stripeCustomerId: ... }, data: { role: "FREE" }})
  }

  return NextResponse.json({ received: true });
}
