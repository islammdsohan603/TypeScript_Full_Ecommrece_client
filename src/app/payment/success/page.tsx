import Link from 'next/link';
import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen bg-[#050508] text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#0d0e12]/60 border border-emerald-900/30 rounded-2xl p-8 text-center backdrop-blur-md">
        <FaCheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4 animate-bounce" />
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-300">
          Payment Successful!
        </h1>
        <p className="text-xs text-gray-500 mt-2 font-light">
          Thank you for your luxury purchase. Your transaction has been
          processed safely.
        </p>

        <div className="mt-8 space-y-3">
          <Link
            href="/dashboard"
            className="block w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl transition-all duration-300"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/"
            className="block w-full py-3 bg-gray-900 hover:bg-gray-800 text-gray-300 text-xs font-semibold rounded-xl transition-all duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
