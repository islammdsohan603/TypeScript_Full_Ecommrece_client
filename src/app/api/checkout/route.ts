import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-01-27.acacia' as any, // আপনার স্ট্রাইপ ভার্সন অনুযায়ী অটোমেটিক কাজ করবে
});

export async function POST(req: Request) {
  try {
    const { cartItems } = await req.json(); // ফ্রন্টএন্ড থেকে কার্টের ডাটা পাবেন

    // কার্ট আইটেমগুলোকে স্ট্রাইপের ফরম্যাটে রূপান্তর করা
    const lineItems = cartItems.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round(item.price * 100), // স্ট্রাইপ সেন্ট (cents) এ হিসাব করে, তাই ১০০ দিয়ে গুন
      },
      quantity: item.quantity,
    }));

    const origin =
      process.env.NEXT_PUBLIC_BETTER_AUTH_URL || 'http://localhost:3000';

    // স্ট্রাইপ চেকআউট সেশন তৈরি করা
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/payment/failed`,
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error('Stripe Checkout Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
