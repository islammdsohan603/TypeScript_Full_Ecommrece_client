import React from 'react';

export default function DashboardLoading() {
  return (
    <div className="space-y-8 animate-pulse p-2">
      {/* Header */}
      <div className="space-y-2">
        <div className="h-8 bg-gray-900/80 rounded-xl w-2/5" />
        <div className="h-4 bg-gray-900/50 rounded w-3/5" />
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-36 bg-gradient-to-br from-gray-900/80 to-gray-800/40 border border-gray-800/20 rounded-2xl overflow-hidden relative"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700/10 to-transparent animate-[shimmer_1.8s_ease-in-out_infinite]" />
          </div>
        ))}
      </div>

      {/* Activity section */}
      <div className="h-28 bg-gray-900/40 border border-gray-800/20 rounded-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700/10 to-transparent animate-[shimmer_1.8s_ease-in-out_infinite]" />
      </div>

      {/* Cart list items */}
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-24 bg-gray-900/40 border border-gray-800/20 rounded-xl relative overflow-hidden"
            style={{ animationDelay: `${i * 120}ms` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700/10 to-transparent animate-[shimmer_1.8s_ease-in-out_infinite]" />
          </div>
        ))}
      </div>
    </div>
  );
}
