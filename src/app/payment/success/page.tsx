'use client';

import Link from 'next/link';
import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { FaCheckCircle, FaBoxOpen, FaReceipt } from 'react-icons/fa';

interface OrderItem {
  name: string;
  image: string | null;
  quantity: number;
  unitAmountUSD: number;
  totalAmountUSD: number;
  currency: string;
}

interface Order {
  _id: string;
  sessionId: string;
  userEmail: string;
  status: string;
  items: OrderItem[];
  totalAmountUSD: number;
  currency: string;
  paidAt: string;
}

type PageState = 'verifying' | 'success' | 'already_saved' | 'error';

const PaymentSuccess = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const [state, setState] = useState<PageState>('verifying');
  const [order, setOrder] = useState<Order | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const verifyPayment = useCallback(async () => {
    if (!sessionId) {
      setState('error');
      setErrorMsg('No session ID found in URL.');
      return;
    }

    try {
      const SERVER_URL =
        (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000').replace(/\/+$/, '');

      const res = await fetch(`${SERVER_URL}/api/verify-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Verification failed');
      }

      setOrder(data.order);
      setState(data.alreadySaved ? 'already_saved' : 'success');
    } catch (err: any) {
      console.error('Verify payment error:', err);
      setErrorMsg(err.message || 'Something went wrong');
      setState('error');
    }
  }, [sessionId]);

  useEffect(() => {
    verifyPayment();
  }, [verifyPayment]);

  // ── VERIFYING STATE ──────────────────────────────────────────────
  if (state === 'verifying') {
    return (
      <div className="min-h-screen bg-[#050508] flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-5">
          <div className="relative w-14 h-14">
            <div className="absolute inset-0 rounded-full border-2 border-emerald-500/20" />
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-emerald-400 border-r-teal-400 animate-spin" />
            <div className="absolute inset-[18px] rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 animate-pulse" />
          </div>
          <div className="text-center">
            <p className="text-white text-sm font-semibold tracking-widest uppercase">
              Confirming Payment
            </p>
            <p className="text-gray-500 text-[11px] font-light mt-1">
              Saving your order details...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── ERROR STATE ──────────────────────────────────────────────────
  if (state === 'error') {
    return (
      <div className="min-h-screen bg-[#050508] text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#0d0e12]/60 border border-rose-900/30 rounded-2xl p-8 text-center backdrop-blur-md">
          <div className="w-16 h-16 rounded-full bg-rose-950/30 border border-rose-800/30 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <h1 className="text-xl font-bold text-rose-400 mb-2">
            Verification Failed
          </h1>
          <p className="text-xs text-gray-500 font-light">{errorMsg}</p>
          <div className="mt-8 space-y-3">
            <Link
              href="/dashboard/users/addcart"
              className="block w-full py-3 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-xl transition-all duration-300"
            >
              Back to Cart
            </Link>
            <Link
              href="/"
              className="block w-full py-3 bg-gray-900 hover:bg-gray-800 text-gray-300 text-xs font-semibold rounded-xl transition-all duration-300"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── SUCCESS / ALREADY SAVED STATE ───────────────────────────────
  const paidDate = order?.paidAt
    ? new Date(order.paidAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : null;

  return (
    <div className="min-h-screen bg-[#050508] text-white flex items-center justify-center p-4 py-12">
      <div className="max-w-lg w-full space-y-4">
        {/* Header card */}
        <div className="bg-[#0d0e12]/60 border border-emerald-900/30 rounded-2xl p-8 text-center backdrop-blur-md">
          <div className="relative inline-block mb-4">
            <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
            <FaCheckCircle className="relative w-14 h-14 text-emerald-400" />
          </div>

          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-300">
            Payment Successful!
          </h1>
          <p className="text-xs text-gray-500 mt-2 font-light">
            {state === 'already_saved'
              ? 'Your order was already confirmed.'
              : 'Your order has been confirmed and saved.'}
          </p>

          {/* Order meta */}
          {order && (
            <div className="mt-5 grid grid-cols-2 gap-3 text-left">
              <div className="bg-emerald-950/20 border border-emerald-900/20 rounded-xl p-3">
                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-light">
                  Order Total
                </p>
                <p className="text-lg font-black text-emerald-400 mt-0.5">
                  ${order.totalAmountUSD.toFixed(2)}{' '}
                  <span className="text-xs font-normal uppercase text-gray-500">
                    {order.currency}
                  </span>
                </p>
              </div>
              <div className="bg-emerald-950/20 border border-emerald-900/20 rounded-xl p-3">
                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-light">
                  Items
                </p>
                <p className="text-lg font-black text-white mt-0.5">
                  {order.items.length}{' '}
                  <span className="text-xs font-normal text-gray-500">
                    product{order.items.length !== 1 ? 's' : ''}
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Order items */}
        {order && order.items.length > 0 && (
          <div className="bg-[#0d0e12]/60 border border-gray-800/30 rounded-2xl p-5 backdrop-blur-md">
            <div className="flex items-center gap-2 mb-4">
              <FaBoxOpen className="text-orange-400 w-3.5 h-3.5" />
              <h2 className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Order Summary
              </h2>
            </div>

            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-4 py-3 border-b border-gray-800/30 last:border-0"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {/* Item image or fallback icon */}
                    <div className="w-10 h-10 rounded-lg bg-gray-800/60 border border-gray-700/30 flex items-center justify-center shrink-0 overflow-hidden">
                      {item.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <FaBoxOpen className="text-gray-600 w-4 h-4" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-gray-200 truncate">
                        {item.name}
                      </p>
                      <p className="text-[10px] text-gray-500 font-light">
                        Qty: {item.quantity} × ${item.unitAmountUSD.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs font-bold text-emerald-400 shrink-0">
                    ${item.totalAmountUSD.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* Receipt footer */}
            <div className="mt-4 pt-4 border-t border-gray-800/30 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
                <FaReceipt className="w-3 h-3" />
                {paidDate && <span>{paidDate}</span>}
              </div>
              <p className="text-[10px] font-mono text-gray-600 truncate max-w-[140px]">
                #{sessionId?.slice(-12)}
              </p>
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/dashboard/users"
            className="py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl transition-all duration-300 text-center"
          >
            View Dashboard
          </Link>
          <Link
            href="/products"
            className="py-3 bg-gray-900 hover:bg-gray-800 text-gray-300 text-xs font-semibold rounded-xl transition-all duration-300 text-center"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
