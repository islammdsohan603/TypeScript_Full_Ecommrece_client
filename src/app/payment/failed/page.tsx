import Link from 'next/link';
import React from 'react';
import { FaTimesCircle } from 'react-icons/fa';

const PaymentFailed = () => {
  return (
    <div className="min-h-screen bg-[#050508] text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#0d0e12]/60 border border-rose-900/30 rounded-2xl p-8 text-center backdrop-blur-md">
        <FaTimesCircle className="w-16 h-16 text-rose-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-300">
          Payment Failed!
        </h1>
        <p className="text-xs text-gray-500 mt-2 font-light">
          Something went wrong or the payment was canceled. Please try again
          later.
        </p>

        <div className="mt-8 space-y-3">
          <Link
            href="/"
            className="block w-full py-3 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-xl transition-all duration-300"
          >
            Try Checkout Again
          </Link>
          <Link
            href="/dashboard"
            className="block w-full py-3 bg-gray-900 hover:bg-gray-800 text-gray-300 text-xs font-semibold rounded-xl transition-all duration-300"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
