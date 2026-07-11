'use client';

import React, { useEffect, useState, useRef } from 'react';

const Newsletter = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#050508] text-white py-28 px-4 sm:px-6 md:px-8 flex items-center justify-center overflow-hidden select-none"
    >
      <div
        className={`w-full max-w-2xl mx-auto text-center flex flex-col items-center justify-center transition-all cubic-bezier(0.16, 1, 0.3, 1) duration-1000 transform ${
          isVisible
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-12 scale-98'
        }`}
      >
        {/* Title Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-b from-white to-gray-400">
          Stay Ahead of the Curve
        </h2>

        {/* Subtitle / Description */}
        <p className="mt-4 text-xs sm:text-sm md:text-base text-gray-400 font-light max-w-md leading-relaxed">
          Subscribe to receive early access to new drops and exclusive editorial
          content.
        </p>

        {/* Form Input Group Container */}
        <form
          onSubmit={e => e.preventDefault()}
          className="mt-10 w-full flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg"
        >
          {/* Email Input Field */}
          <input
            type="email"
            placeholder="Your professional email"
            required
            className="w-full px-5 py-3.5 bg-[#0d0e12]/60 border border-gray-900 rounded-xl text-sm font-light text-gray-200 placeholder-gray-600 focus:outline-none focus:border-gray-700 focus:bg-[#13151b]/80 transition-all duration-300 backdrop-blur-md"
          />

          {/* Premium White Join Button */}
          <button
            type="submit"
            className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-gray-200 text-black font-semibold text-sm rounded-xl transition-all duration-300 cursor-pointer active:scale-95 flex items-center justify-center whitespace-nowrap shadow-[0_0_30px_rgba(255,255,255,0.1)]"
          >
            Join Luxury
          </button>
        </form>

        {/* Bottom Disclaimer/Note */}
        <p className="mt-5 text-[10px] tracking-widest text-gray-600 uppercase font-medium">
          Privacy guaranteed. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
