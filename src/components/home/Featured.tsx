'use client';
import { getFeaturedProducts } from '@/db/productsdataapi';
import React, { useEffect, useState, useRef } from 'react';
import FeaturedCard from './FeaturedCard';
import { ArrowRight } from 'lucide-react';

interface Product {
  _id: string;
  title: string;
  category: string;
  price: number;
  image: string;
}

const Featured = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [animate, setAnimate] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFeaturedProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
        } else {
          setAnimate(false);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [products]);

  return (
    <section
      ref={sectionRef}
      className="bg-[#050508] text-white py-20 px-4 md:px-8 overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto">
        {/* Top Header Section */}
        <div
          className={`flex items-end justify-between mb-10 transition-all cubic-bezier(0.16, 1, 0.3, 1) duration-1000 transform ${
            animate ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'
          }`}
        >
          <div>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-b from-white to-gray-400">
              Featured Masterpieces
            </h2>
            <p className="text-sm text-gray-400 mt-2 font-light">
              Our most coveted digital assets this season.
            </p>
          </div>

          {/* View All Link */}
          <a
            href="/products"
            className="group flex items-center gap-1 text-sm font-semibold text-blue-500 hover:text-blue-400 transition-colors"
          >
            View All
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <FeaturedCard
              key={product._id}
              product={product}
              index={index}
              animate={animate}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Featured;
