'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useSession } from '@/lib/auth-client'; // 🌟 Better-Auth সেশন ইম্পোর্ট করা হলো

interface CheckoutProps {
  // মেইন কার্ট পেজ থেকে পাস করা কার্ট লিস্ট ডাটা
  cartItems: Array<{
    title: string; // আপনার ডাটাবেজের ফিল্ড অনুযায়ী title বা name ব্যবহার করুন
    price: number;
    quantity: number;
    images: string;
  }>;
}

const Checkout = ({ cartItems = [] }: CheckoutProps) => {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession(); // 🌟 লগইন থাকা ইউজারের ডাটা গেট করা হলো

  const handleCheckout = async () => {
    // ১. কার্ট খালি থাকলে চেকআউট আটকে দিন
    if (!cartItems || cartItems.length === 0) {
      toast.error('Your cart is empty!');
      return;
    }

    // ২. লগইন ছাড়া চেকআউট করতে দিলে এরর দিন
    if (!session?.user?.email) {
      toast.error('Please log in to proceed to checkout!');
      return;
    }

    try {
      setLoading(true);

      const SERVER_URL =
        process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';

      // ৩. ব্যাকএন্ড এপিআই-তে রিকোয়েস্ট পাঠানো
      const res = await fetch(`${SERVER_URL}/api/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartItems: cartItems, // 🌟 ভুল 'cartData' পরিবর্তন করে সঠিক প্রপস 'cartItems' বসানো হয়েছে
          userEmail: session.user.email, // 🌟 স্ট্যাটিক মেইলের বদলে ইউজারের রিয়েল ইমেইল পাঠানো হচ্ছে
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Payment initialization failed');
      }

      // ৪. স্ট্রাইপের সিকিউর পেমেন্ট পেজে রিডাইরেক্ট করা
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error('Failed to get payment URL from server');
      }
    } catch (error: any) {
      console.error('Checkout error:', error);
      toast.error(error.message || 'Something went wrong during checkout');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleCheckout}
        disabled={loading}
        className="w-full md:w-auto inline-flex items-center justify-center bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white text-xs md:text-sm font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-orange-950/40 transition-all duration-300 active:scale-[0.98] cursor-pointer tracking-wide uppercase disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Processing Checkout...' : 'Proceed to Checkout ➔'}
      </button>
    </div>
  );
};

export default Checkout;
