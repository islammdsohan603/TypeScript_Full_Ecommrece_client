import React from 'react';

export default function ProductsLoading() {
  return (
    <div className="bg-[#050508] min-h-screen py-10 px-4">
      <div className="w-11/12 max-w-7xl mx-auto space-y-8">
        {/* Header skeleton */}
        <div className="animate-pulse space-y-3">
          <div className="h-8 w-48 bg-gray-800/70 rounded-lg" />
          <div className="h-4 w-72 bg-gray-800/40 rounded" />
        </div>

        {/* Filter row skeleton */}
        <div className="flex gap-3 animate-pulse">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-9 w-24 bg-gray-800/50 rounded-xl" />
          ))}
        </div>

        {/* Product grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-[#0d0e12]/60 border border-gray-800/30 rounded-2xl overflow-hidden animate-pulse"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {/* Image placeholder */}
              <div className="h-56 bg-gradient-to-br from-gray-800/60 to-gray-900/60 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700/20 to-transparent animate-[shimmer_1.8s_ease-in-out_infinite]" />
              </div>
              {/* Content */}
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-800/70 rounded w-3/4" />
                <div className="h-3 bg-gray-800/40 rounded w-1/2" />
                <div className="flex justify-between items-center pt-2">
                  <div className="h-5 w-16 bg-orange-900/40 rounded-lg" />
                  <div className="h-8 w-24 bg-gray-800/50 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
