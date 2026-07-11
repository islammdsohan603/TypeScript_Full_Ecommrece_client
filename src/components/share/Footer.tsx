'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Globe, AtSign } from 'lucide-react';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);

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

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const footerLinks = [
    {
      title: 'SHOP',
      links: ['Collections', 'Boutique', 'New Arrivals', 'Sale'],
    },
    {
      title: 'COMPANY',
      links: [
        'Privacy Policy',
        'Terms of Service',
        'Sustainability',
        'Editorial',
      ],
    },
    {
      title: 'HELP',
      links: ['Shipping & Returns', 'Contact Us', 'FAQ', 'Store Locator'],
    },
  ];

  return (
    <footer
      ref={footerRef}
      className="bg-[#050508] text-white pt-24 pb-12 px-6 sm:px-12 md:px-20 border-t border-white/5 overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 pb-16">
        {/* Left Side: Brand Logo, Description & Socials */}
        <div
          className={`md:col-span-4 space-y-6 transition-all cubic-bezier(0.16, 1, 0.3, 1) duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-widest text-white">
            Luxury
          </h2>
          <p className="text-xs md:text-sm text-gray-500 font-light max-w-xs leading-relaxed">
            Defining the intersection of technology and luxury through curated
            excellence.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4 text-gray-400">
            <a
              href="#"
              className="hover:text-white transition-colors p-1 bg-white/5 rounded-full border border-white/5 hover:border-white/20"
            >
              <Globe className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors p-1 bg-white/5 rounded-full border border-white/5 hover:border-white/20"
            >
              <AtSign className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Right Side: Links Columns (Staggered Animation via Index delay) */}
        <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8 md:justify-items-end">
          {footerLinks.map((column, colIndex) => (
            <div
              key={column.title}
              style={{
                transitionDelay: isVisible
                  ? `${(colIndex + 1) * 150}ms`
                  : '0ms',
              }}
              className={`space-y-4 transition-all cubic-bezier(0.16, 1, 0.3, 1) duration-1000 transform ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <h3 className="text-xs font-semibold tracking-widest text-gray-400">
                {column.title}
              </h3>
              <ul className="space-y-2.5">
                {column.links.map(link => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-xs sm:text-sm text-gray-500 hover:text-white font-light transition-colors duration-300 block"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Copyright Section */}
      <div
        className={`max-w-7xl mx-auto pt-8 border-t border-white/5 text-center transition-all cubic-bezier(0.16, 1, 0.3, 1) duration-1000 delay-700 transform ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-98'
        }`}
      >
        <p className="text-[10px] md:text-xs tracking-widest text-gray-600 uppercase font-medium">
          © 2026 LUMINA DIGITAL STOREFRONT. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
