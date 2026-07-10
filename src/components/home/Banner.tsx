'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaArrowRightLong } from 'react-icons/fa6';

const Banner = () => {
  const [animate, setAnimate] = useState<boolean>(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <section className="relative min-h-screen bg-[#050508] text-white overflow-hidden px-4 py-20 lg:py-0 flex items-center">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-linear-to-b from-blue-900/10 via-transparent to-transparent blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left Content */}
        <div className="text-center lg:text-left">
          <h1
            className={`text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-b from-white to-gray-400 drop-shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-all duration-1000 transform ${
              animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            The Future of Tech,
            <br />
            Reimagined.
          </h1>

          <p
            className={`mt-6 text-sm md:text-base text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed transition-all duration-1000 delay-300 transform ${
              animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Experience unparalleled performance and uncompromising design.
            <br className="hidden sm:inline" />
            Nexus brings the next generation of hardware directly to your
            workspace.
          </p>

          <div
            className={`mt-8 flex flex-wrap justify-center lg:justify-start gap-4 transition-all duration-1000 delay-500 transform ${
              animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white text-sm font-semibold rounded-lg flex items-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all duration-300 cursor-pointer">
              Shop Now
              <FaArrowRightLong className="w-4 h-4" />
            </button>

            <button className="px-6 py-3 bg-gray-900/60 hover:bg-gray-800 border border-gray-800 text-gray-300 text-sm font-semibold rounded-lg transition-all duration-300 cursor-pointer">
              Explore Ecosystem
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div
          className={`w-full transition-all duration-1000 delay-700 transform ${
            animate
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-16 scale-95'
          }`}
        >
          <div className="relative rounded-2xl border border-gray-900 bg-linear-to-b from-gray-900/20 to-black/40 p-1 backdrop-blur-sm shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <div className="relative overflow-hidden rounded-xl aspect-[16/10] bg-[#090a10]">
              <Image
                src="/laptop.avif"
                alt="Nexus Pro X Laptop"
                fill
                priority
                className="object-cover object-center opacity-90"
              />

              <div className="absolute inset-0 bg-linear-to-t from-[#050508] via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 z-20 text-left">
                <span className="inline-block px-3 py-1 text-[10px] uppercase tracking-widest font-medium bg-gray-800/80 border border-gray-700 rounded-full text-gray-400 mb-2">
                  Flagship Series
                </span>

                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white">
                  Nexus Pro X
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
