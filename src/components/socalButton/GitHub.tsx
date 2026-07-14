import { authClient } from '@/lib/auth-client';
import React, { useState } from 'react';
import { FaGithub } from 'react-icons/fa6';

const GitHub = () => {
  const [isLoading, setIsLoading] = useState(false);
  const handleGitHubSignin = async () => {
    try {
      setIsLoading(true);
      await authClient.signIn.social({
        provider: 'github',

        callbackURL: '/dashboard/users/profile',
      });
    } catch (error) {
      console.error('GitHub Sign-In Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        type="submit"
        onClick={handleGitHubSignin}
        className="flex w-full items-center justify-center gap-2 py-3 bg-[#050508]/80 border border-gray-900 hover:border-gray-700 rounded-xl text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 cursor-pointer active:scale-95"
      >
        <FaGithub className="w-4 h-4 text-gray-400 group-hover:text-white" />
        <span className="text-xs">
          {isLoading ? 'Connecting...' : 'GitHub'}
        </span>
      </button>
    </div>
  );
};

export default GitHub;
