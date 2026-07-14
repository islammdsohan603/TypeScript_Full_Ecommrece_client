'use client';

import { authClient } from '@/lib/auth-client';
import React, { useState } from 'react';
import { FaGoogle } from 'react-icons/fa6';

const Google = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignInGoogle = async () => {
    try {
      setIsLoading(true);
      await authClient.signIn.social({
        provider: 'google',

        callbackURL: '/dashboard/users/profile',
      });
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleSignInGoogle}
        disabled={isLoading}
        className="flex w-full items-center justify-center gap-2 py-3 bg-[#050508]/80 border border-gray-900 hover:border-gray-700 rounded-xl text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FaGoogle
          className={`w-4 h-4 text-gray-400 ${isLoading ? 'animate-spin' : ''}`}
        />
        <span className="text-xs">
          {isLoading ? 'Connecting...' : 'Google'}
        </span>
      </button>
    </div>
  );
};

export default Google;
