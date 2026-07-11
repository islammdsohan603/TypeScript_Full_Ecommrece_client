'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FaqSection = () => {
  const [openId, setOpenId] = useState<number | null>(1);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: 'What is the Lumina Authenticity Guarantee?',
      answer:
        'Every product in our collection undergoes a rigorous multi-point inspection by certified experts. We provide a digital NFT certificate of authenticity with every purchase.',
    },
    {
      id: 2,
      question: 'How long does international shipping take?',
      answer:
        'We offer global priority shipping. Orders to major cities across North America, Europe, and UAE are typically delivered perfectly secured within 48 to 72 hours.',
    },
    {
      id: 3,
      question: 'What is your return policy for boutique items?',
      answer:
        'We offer a complimentary 14-day return policy for all unworn and unaltered items. The return process is fully insured and tracked for your peace of mind.',
    },
    {
      id: 4,
      question: 'Can I customize or personalise my order?',
      answer:
        'Yes, select flagship products qualify for custom engraving or bespoke material finishes. Contact our 24/7 dedicated concierge service to request modifications.',
    },
    {
      id: 5,
      question: 'What secure payment methods do you accept?',
      answer:
        'We accept all major global credit cards, Apple Pay, and secure cryptographic payments including Bitcoin and Ethereum, protected with military-grade encryption.',
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.15 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      ref={sectionRef}
      className="bg-[#050508] text-white pb-20 px-4 sm:px-6 md:px-8 overflow-hidden select-none"
    >
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        {/* Section Heading */}
        <h2
          className={`text-3xl md:text-4xl font-bold tracking-tight text-center mb-12 text-transparent bg-clip-text bg-linear-to-b from-white to-gray-400 transition-all cubic-bezier(0.16, 1, 0.3, 1) duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'
          }`}
        >
          Curious Minds
        </h2>

        {/* Accordion Wrapper */}
        <div className="w-full space-y-4">
          {faqData.map((faq, index) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                style={{
                  transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
                }}
                className={`w-full bg-[#0d0e12]/60 border border-gray-900 rounded-2xl overflow-hidden backdrop-blur-md transition-all cubic-bezier(0.16, 1, 0.3, 1) duration-700 transform ${
                  isVisible
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-10 scale-98'
                } hover:border-gray-800`}
              >
                {/* Question Trigger Button */}
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left font-medium text-sm md:text-base text-gray-200 hover:text-white transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform duration-500 flex-shrink-0 ${
                      isOpen ? 'rotate-180 text-white' : ''
                    }`}
                  />
                </button>

                {/* Smooth Max-Height Answer Panel */}
                <div
                  className={`transition-all duration-500 ease-in-out ${
                    isOpen
                      ? 'max-h-[200px] opacity-100 border-t border-white/5'
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="px-6 py-5 text-xs md:text-sm text-gray-400 font-light leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
