import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

// Mock Price ID - In production, use env var
const PRO_PLAN_PRICE_ID = "price_123456789"; 

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, email } = body; // In prod, get from session

    if (!userId || !email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: PRO_PLAN_PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: \`\${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true\`,
      cancel_url: \`\${process.env.NEXT_PUBLIC_APP_URL}/dashboard?canceled=true\`,
      customer_email: email,
      metadata: {
        userId,
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
