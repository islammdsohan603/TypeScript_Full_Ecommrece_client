'use client';

import { authClient, useSession } from '@/lib/auth-client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
  FaSignOutAlt,
  FaRegCalendarAlt,
  FaEnvelope,
  FaUserCheck,
} from 'react-icons/fa';

const Profilepage = () => {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [logoutLoading, setLogoutLoading] = useState(false);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-[#050508]" />;
  }

  const user = session?.user;

  const handleSignOut = async () => {
    try {
      setLogoutLoading(true);
      await authClient.signOut();
      toast.success('Logged out successfully!');
      window.location.href = '/signin';
    } catch (error) {
      toast.error('Failed to log out');
      console.error(error);
    } finally {
      setLogoutLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050508] text-white flex items-center justify-center px-4 py-16 select-none relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md bg-[#0d0e12]/60 border border-gray-950 rounded-2xl p-8 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.5)] transition-all duration-1000 transform opacity-0 translate-y-6 scale-98 animate-[fadeInUp_0.8s_ease-out_forwards]">
        {isPending ? (
          <div className="space-y-6 animate-pulse">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-24 h-24 bg-gray-900 rounded-full" />
              <div className="h-5 bg-gray-900 rounded w-1/3" />
              <div className="h-3 bg-gray-900 rounded w-1/2" />
            </div>
            <div className="space-y-3 pt-4 border-t border-gray-950">
              <div className="h-4 bg-gray-900 rounded w-full" />
              <div className="h-4 bg-gray-900 rounded w-4/5" />
            </div>
          </div>
        ) : user ? (
          <div className="space-y-6">
            <div className="flex flex-col items-center text-center">
              <div className="relative w-24 h-24 rounded-full p-0.5 bg-linear-to-b from-gray-700 to-gray-950 shadow-inner mb-4 group overflow-hidden">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-[#050508]">
                  <Image
                    src={
                      user.image ||
                      'https://img.freepik.com/premium-vector/male-face-avatar-icon-set-flat-design-social-media-profiles_1281173-3806.jpg?w=2000'
                    }
                    alt={user.name || 'User'}
                    fill
                    sizes="96px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                </div>
              </div>
              <h1 className="text-xl font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-b from-white to-gray-400">
                {user.name}
              </h1>
              <span className="text-[10px] mt-1.5 px-2.5 py-0.5 border border-blue-900/40 bg-blue-950/20 text-blue-400 rounded-full font-medium tracking-wider uppercase flex items-center gap-1">
                <FaUserCheck className="w-2.5 h-2.5" /> Verified User
              </span>
            </div>

            <div className="space-y-3.5 pt-5 border-t border-gray-950 text-sm font-light text-gray-300">
              <div className="flex items-center gap-3 px-4 py-3 bg-[#050508]/40 border border-gray-950 rounded-xl">
                <FaEnvelope className="text-gray-600 w-4 h-4 flex-shrink-0" />
                <div className="truncate">
                  <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">
                    Email Address
                  </p>
                  <p className="text-gray-200 truncate mt-0.5">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 px-4 py-3 bg-[#050508]/40 border border-gray-950 rounded-xl">
                <FaRegCalendarAlt className="text-gray-600 w-4 h-4 flex-shrink-0" />
                <div>
                  <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">
                    Joined Since
                  </p>
                  <p className="text-gray-200 mt-0.5">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })
                      : 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleSignOut}
              disabled={logoutLoading}
              className="w-full mt-2 py-3 bg-red-950/20 hover:bg-red-900/30 border border-red-900/40 text-red-400 text-sm font-medium rounded-xl transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaSignOutAlt
                className={`w-3.5 h-3.5 ${logoutLoading ? 'animate-spin' : ''}`}
              />
              {logoutLoading ? 'Signing Out...' : 'Sign Out'}
            </button>
          </div>
        ) : (
          <div className="text-center py-6 space-y-5">
            <div className="w-12 h-12 rounded-full bg-amber-950/30 border border-amber-900/50 flex items-center justify-center mx-auto text-amber-500 text-lg font-bold">
              !
            </div>
            <div className="space-y-1">
              <h2 className="text-base font-medium text-gray-200">
                No Profile Found
              </h2>
              <p className="text-xs text-gray-500 max-w-xs mx-auto font-light">
                Please create an account or login to access your luxury digital
                space.
              </p>
            </div>
            <button
              onClick={() => router.push('/signup')}
              className="w-full py-3 bg-white text-black text-sm font-semibold rounded-xl transition-all duration-300 active:scale-[0.98] cursor-pointer hover:bg-gray-200 shadow-lg"
            >
              Get Started / SignUp
            </button>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(24px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default Profilepage;
