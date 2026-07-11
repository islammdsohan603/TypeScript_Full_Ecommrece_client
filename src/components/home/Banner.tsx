'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { FaArrowRightLong } from 'react-icons/fa6';

const Banner = () => {
  const [imageAnimate, setImageAnimate] = useState<boolean>(false);
  const [textAnimate, setTextAnimate] = useState<boolean>(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let textTimeout: NodeJS.Timeout;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImageAnimate(true);

          textTimeout = setTimeout(() => {
            setTextAnimate(true);
          }, 500);
        } else {
          setImageAnimate(false);
          setTextAnimate(false);
          if (textTimeout) clearTimeout(textTimeout);
        }
      },
      {
        threshold: 0.15,
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      if (textTimeout) clearTimeout(textTimeout);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#050508] text-white overflow-hidden flex items-center justify-center px-4 py-16 select-none"
    >
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <div
          className={`relative w-full h-full max-w-7xl max-h-[85vh] mx-auto overflow-hidden lg:rounded-3xl border border-white/5 transition-all cubic-bezier(0.16, 1, 0.3, 1) duration-1000 transform ${
            imageAnimate ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        >
          <Image
            src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=1920&auto=format&fit=crop"
            alt="Luxury Watch Background"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-black/80" />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-3xl mx-auto text-center flex flex-col items-center justify-center">
        <h1
          className={`text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-[0_4px_24px_rgba(255,255,255,0.2)] transition-all cubic-bezier(0.16, 1, 0.3, 1) duration-1000 transform ${
            textAnimate
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          Elegance Redefined
        </h1>

        <p
          className={`mt-6 text-xs sm:text-sm md:text-base text-gray-300 max-w-xl leading-relaxed transition-all cubic-bezier(0.16, 1, 0.3, 1) duration-1000 transform ${
            textAnimate
              ? 'opacity-100 translate-y-0 delay-300'
              : 'opacity-0 translate-y-8'
          }`}
        >
          Experience the fusion of timeless craftsmanship and futuristic design.
          Curated for the modern vanguard.
        </p>

        <div
          className={`mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto transition-all cubic-bezier(0.16, 1, 0.3, 1) duration-1000 transform ${
            textAnimate
              ? 'opacity-100 translate-y-0 delay-500'
              : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Shop Collection Button */}
          <button className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(37,99,235,0.35)] transition-all duration-300 cursor-pointer">
            Shop Collection
            <FaArrowRightLong className="w-4 h-4" />
          </button>

          {/* View Lookbook Glassmorphism Button */}
          <button className="w-full sm:w-auto px-8 py-3.5 bg-white/5 hover:bg-white/10 active:scale-95 border border-white/10 text-gray-200 text-sm font-semibold rounded-xl backdrop-blur-md transition-all duration-300 cursor-pointer">
            View Lookbook
          </button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
