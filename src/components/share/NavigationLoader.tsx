'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function NavigationLoader() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prevPathname = useRef(pathname);

  // Start loader on pathname change
  useEffect(() => {
    if (prevPathname.current === pathname) return;
    prevPathname.current = pathname;

    // Start progress
    setProgress(0);
    setVisible(true);

    // Quickly ramp to ~85% then slow down (simulated progress)
    let current = 0;
    timerRef.current = setInterval(() => {
      current += Math.random() * 15;
      if (current >= 85) {
        current = 85;
        if (timerRef.current) clearInterval(timerRef.current);
      }
      setProgress(current);
    }, 120);

    // Complete after a short delay
    const completeTimer = setTimeout(() => {
      if (timerRef.current) clearInterval(timerRef.current);
      setProgress(100);
      setTimeout(() => setVisible(false), 400);
    }, 600);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      clearTimeout(completeTimer);
    };
  }, [pathname]);

  if (!visible) return null;

  return (
    <>
      {/* Top progress bar */}
      <div
        className="fixed top-0 left-0 z-[99999] h-[3px] transition-all duration-300 ease-out"
        style={{
          width: `${progress}%`,
          background: 'linear-gradient(to right, #f97316, #f59e0b, #fbbf24)',
          boxShadow: '0 0 12px rgba(249, 115, 22, 0.7)',
          opacity: progress === 100 ? 0 : 1,
        }}
      />

      {/* Glowing tip */}
      <div
        className="fixed top-0 z-[99999] h-[3px] w-24 transition-all duration-300 ease-out"
        style={{
          left: `calc(${progress}% - 24px)`,
          background: 'radial-gradient(ellipse at right, #f97316, transparent)',
          opacity: progress === 100 ? 0 : 0.8,
        }}
      />

      {/* Full-screen overlay for hard navigations */}
      {progress < 30 && (
        <div className="fixed inset-0 z-[9998] bg-[#050508]/60 backdrop-blur-[2px] flex items-end justify-center pb-10 pointer-events-none">
          <div className="flex items-center gap-2 text-gray-400 text-xs font-light tracking-widest">
            <div className="w-4 h-4 rounded-full border border-orange-500/40 border-t-orange-400 animate-spin" />
            <span>Loading...</span>
          </div>
        </div>
      )}
    </>
  );
}
