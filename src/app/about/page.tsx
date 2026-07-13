import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'About Us | Luxury',
  description:
    'Discover the story behind Luxury — craftsmanship, values, and the vision that drives our curated digital boutique.',
};

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-[#050508] text-white">
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_35%)] px-6 py-20 sm:px-10 lg:px-20">
        <div className="relative max-w-6xl mx-auto grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.28em] text-blue-300/80">
              About Luxury
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              A new standard in digital luxury.
            </h1>
            <p className="max-w-2xl text-sm sm:text-base text-gray-300 leading-8">
              We create immersive luxury experiences for the modern connoisseur.
              Every collection is crafted with precision, curated for style, and
              built to leave a lasting impression.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                <p className="text-sm uppercase tracking-[0.24em] text-gray-400 mb-3">
                  Heritage
                </p>
                <h2 className="text-2xl font-semibold text-white">
                  Built on craft and confidence.
                </h2>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                <p className="text-sm uppercase tracking-[0.24em] text-gray-400 mb-3">
                  Vision
                </p>
                <h2 className="text-2xl font-semibold text-white">
                  Designed for the future of elevated living.
                </h2>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-[#0d0e12]/70 p-10 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.24em] text-blue-300/80">
                Our story
              </p>
              <p className="text-gray-300 leading-8 text-sm sm:text-base">
                Luxury was founded to redefine what it means to discover premium
                lifestyle products online. We blend tradition with technology,
                using thoughtful storytelling, intentional curation, and a
                relentless attention to detail.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2 rounded-3xl border border-white/10 bg-white/5 p-5">
                  <p className="text-3xl font-bold text-white">2012</p>
                  <p className="text-sm text-gray-400">
                    Year craftsmanship became digital.
                  </p>
                </div>
                <div className="space-y-2 rounded-3xl border border-white/10 bg-white/5 p-5">
                  <p className="text-3xl font-bold text-white">500+</p>
                  <p className="text-sm text-gray-400">
                    Curated pieces crafted for modern collectors.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#09090d] px-6 py-20 sm:px-10 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-4 text-center mb-14">
            <p className="text-sm uppercase tracking-[0.32em] text-blue-300/80">
              What we value
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Purpose-led luxury with clarity and care.
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {[
              {
                label: 'Sustainability',
                description:
                  'We seek partnerships that reduce impact while preserving elegance.',
              },
              {
                label: 'Authenticity',
                description:
                  'Every item is chosen for its story, quality, and lasting value.',
              },
              {
                label: 'Service',
                description:
                  'Expert guidance and seamless support are part of every experience.',
              },
            ].map(item => (
              <div
                key={item.label}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.2)] transition hover:-translate-y-1 hover:border-white/20"
              >
                <h3 className="text-xl font-semibold text-white mb-3">
                  {item.label}
                </h3>
                <p className="text-sm leading-7 text-gray-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10 lg:px-20">
        <div className="max-w-6xl mx-auto grid gap-12 lg:grid-cols-2 items-center">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.24em] text-blue-300/80">
              Proven performance
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Every detail is designed to inspire confidence.
            </h2>
            <p className="text-gray-300 leading-8 text-sm sm:text-base">
              We take a service-first approach to premium commerce, blending
              immersive visuals with clear navigation and fast support for every
              customer. From discovery to delivery, each moment is polished.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { value: '24/7', label: 'Concierge access' },
              { value: '98%', label: 'Customer satisfaction' },
              { value: '10k+', label: 'Trusted patrons' },
              { value: 'Global', label: 'Worldwide delivery' },
            ].map(stat => (
              <div
                key={stat.label}
                className="rounded-[2rem] border border-white/10 bg-[#0d0e12]/80 p-8"
              >
                <p className="text-4xl font-bold text-white">{stat.value}</p>
                <p className="mt-3 text-sm text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
