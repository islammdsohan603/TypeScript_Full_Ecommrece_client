import React from 'react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050508]/90 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-5">
        {/* Luxury spinner */}
        <div className="relative w-16 h-16">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-2 border-orange-500/20" />
          {/* Spinning arc */}
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-orange-500 border-r-amber-400 animate-spin" />
          {/* Inner pulsing dot */}
          <div className="absolute inset-[22px] rounded-full bg-gradient-to-br from-orange-500 to-amber-500 animate-pulse shadow-lg shadow-orange-500/50" />
        </div>

        {/* Brand + text */}
        <div className="text-center space-y-1">
          <p className="text-white text-sm font-semibold tracking-widest uppercase">
            Luxury
          </p>
          <p className="text-gray-500 text-[11px] font-light tracking-wider">
            Loading your experience...
          </p>
        </div>

        {/* Shimmer bar */}
        <div className="w-32 h-[2px] rounded-full bg-gray-800 overflow-hidden">
          <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-orange-500 to-transparent animate-[shimmer_1.4s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}
