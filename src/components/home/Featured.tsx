'use client';
import { getFeaturedProducts } from '@/db/productsdataapi';
import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFeaturedProducts();
        setProducts(data);

        setAnimate(true);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="bg-[#050508] text-white py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Header Section */}
        <div className="flex items-end justify-between mb-10">
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
            <ArrowRight />
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
