'use client';

import React, { useEffect, useState, useRef } from 'react';
import { FaGoogle, FaEye, FaEyeSlash, FaGithub } from 'react-icons/fa';

const SignUp = () => {
  const [isVisible, setIsVisible] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const [showPass, setShowpass] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.1 },
    );

    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={formRef}
      className="min-h-screen bg-[#050508] text-white flex items-center justify-center px-4 py-16 select-none"
    >
      <div
        className={`w-full max-w-md bg-[#0d0e12]/60 border border-gray-900 rounded-2xl p-8 backdrop-blur-md transition-all cubic-bezier(0.16, 1, 0.3, 1) duration-1000 transform ${
          isVisible
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-12 scale-98'
        } hover:border-gray-800`}
      >
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-b from-white to-gray-400">
            Create An Account
          </h1>
          <p className="text-xs text-gray-500 mt-1.5 font-light">
            Join Luxury to access exclusive digital assets.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={e => e.preventDefault()} className="space-y-5">
          {/* Name Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-400 tracking-wider uppercase">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="Enter your name"
              className="w-full px-4 py-3 bg-[#050508]/80 border border-gray-900 rounded-xl text-sm font-light text-gray-200 placeholder-gray-600 focus:outline-none focus:border-gray-700 focus:bg-[#13151b]/80 transition-all duration-300"
            />
          </div>

          {/* Email Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-400 tracking-wider uppercase">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className="w-full px-4 py-3 bg-[#050508]/80 border border-gray-900 rounded-xl text-sm font-light text-gray-200 placeholder-gray-600 focus:outline-none focus:border-gray-700 focus:bg-[#13151b]/80 transition-all duration-300"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-400 tracking-wider uppercase">
              Password
            </label>

            <div className="relative flex items-center">
              <input
                type={showPass ? 'text' : 'password'}
                name="password"
                required
                placeholder="Enter your password"
                className="w-full px-4 py-3 pr-12 bg-[#050508]/80 border border-gray-900 rounded-xl text-sm font-light text-gray-200 placeholder-gray-600 focus:outline-none focus:border-gray-700 focus:bg-[#13151b]/80 transition-all duration-300"
              />

              <button
                type="button"
                onClick={() => setShowpass(!showPass)}
                className="absolute right-4 text-gray-500 hover:text-gray-300 transition-colors cursor-pointer select-none"
              >
                {showPass ? (
                  <FaEyeSlash className="w-4 h-4" />
                ) : (
                  <FaEye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Image URL Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-400 tracking-wider uppercase">
              Photo URL
            </label>
            <input
              type="url"
              name="image"
              required
              placeholder="Enter your photo url"
              className="w-full px-4 py-3 bg-[#050508]/80 border border-gray-900 rounded-xl text-sm font-light text-gray-200 placeholder-gray-600 focus:outline-none focus:border-gray-700 focus:bg-[#13151b]/80 transition-all duration-300"
            />
          </div>

          {/* Main Submit Button */}
          <button
            type="submit"
            className="w-full mt-2 py-3 bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white text-sm font-semibold rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.25)] cursor-pointer"
          >
            Sign Up
          </button>
        </form>

        {/* Divider line OR text */}
        <div className="relative flex py-6 items-center">
          <div className="flex-grow border-t border-gray-900"></div>
          <span className="flex-shrink mx-4 text-[10px] tracking-widest text-gray-600 uppercase font-medium">
            Or continue with
          </span>
          <div className="flex-grow border-t border-gray-900"></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 py-3 bg-[#050508]/80 border border-gray-900 hover:border-gray-700 rounded-xl text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 cursor-pointer active:scale-95">
            <FaGoogle className="w-4 h-4 text-gray-400 group-hover:text-white" />
            <span className="text-xs">Google</span>
          </button>

          <button className="flex items-center justify-center gap-2 py-3 bg-[#050508]/80 border border-gray-900 hover:border-gray-700 rounded-xl text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 cursor-pointer active:scale-95">
            <FaGithub className="w-4 h-4 text-gray-400 group-hover:text-white" />
            <span className="text-xs">GitHub</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
