'use client';

import React, { useEffect, useState, useRef } from 'react';
import { FiTruck, FiShield, FiClock, FiAward } from 'react-icons/fi';

const Features = () => {
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
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const cardData = [
    {
      icon: <FiTruck className="w-5 h-5 text-gray-300" />,
      title: 'Free Shipping',
      desc: 'Global priority delivery on all luxury orders over $500.',
    },
    {
      icon: <FiShield className="w-5 h-5 text-gray-300" />,
      title: 'Secure Payments',
      desc: 'Military-grade encryption for every single transaction.',
    },
    {
      icon: <FiClock className="w-5 h-5 text-gray-300" />,
      title: '24/7 Support',
      desc: 'Dedicated concierges available around the clock.',
    },
    {
      icon: <FiAward className="w-5 h-5 text-gray-300" />,
      title: 'Authentic Only',
      desc: 'Guaranteed original items with NFT-backed certificates.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="bg-[#050508] text-white py-24 px-4 sm:px-8 md:px-16 overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Side Content & Stats */}
        <div
          className={`lg:col-span-6 space-y-8 transition-all cubic-bezier(0.16, 1, 0.3, 1) duration-1000 transform ${
            isVisible
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 -translate-x-16'
          }`}
        >
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-b from-white to-gray-400">
              Crafting Excellence <br /> Since 2012
            </h2>
            <p className="text-sm md:text-base text-gray-400 font-light max-w-xl leading-relaxed">
              Our commitment to quality transcends borders. We partner with the
              world's most talented artisans to bring you pieces that are not
              just products, but legacies.
            </p>
          </div>

          {/* Counters / Stats */}
          <div className="flex items-center gap-12 pt-4">
            <div className="space-y-1">
              <span className="text-3xl md:text-4xl font-extrabold tracking-tight text-white block">
                1M+
              </span>
              <span className="text-[10px] md:text-xs uppercase tracking-widest font-semibold text-gray-500 block">
                Happy Customers
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-3xl md:text-4xl font-extrabold tracking-tight text-white block">
                50+
              </span>
              <span className="text-[10px] md:text-xs uppercase tracking-widest font-semibold text-gray-500 block">
                Global Awards
              </span>
            </div>
          </div>
        </div>

        {/* Right Side 2x2 Grid Cards */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {cardData.map((card, index) => (
            <div
              key={index}
              style={{
                transitionDelay: isVisible ? `${index * 120}ms` : '0ms',
              }}
              className={`bg-[#0d0e12]/60 border border-gray-900 rounded-2xl p-6 flex flex-col justify-start gap-4 backdrop-blur-md transition-all cubic-bezier(0.16, 1, 0.3, 1) duration-700 transform ${
                isVisible
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-12 scale-95'
              } hover:border-gray-800 hover:bg-[#13151b]/80 hover:shadow-[0_0_30px_rgba(255,255,255,0.02)] group`}
            >
              {/* Icon Container */}
              <div className="w-10 h-10 rounded-xl bg-gray-950 flex items-center justify-center border border-gray-900 group-hover:border-gray-700 transition-colors">
                {card.icon}
              </div>

              {/* Text Info */}
              <div className="space-y-1.5">
                <h3 className="text-base font-semibold text-gray-200 group-hover:text-white transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
