'use client';
import React from 'react';
import Image from 'next/image';

interface ProductProps {
  product: {
    _id: string;
    title: string;
    category: string;
    price: number;
    image: string;
  };
  index: number;
  animate: boolean;
}

const FeaturedCard = ({ product, index, animate }: ProductProps) => {
  return (
    <div
      style={{
        transitionDelay: animate ? `${index * 150}ms` : '0ms',
      }}
      className={`group relative bg-[#0d0e12]/60 border border-gray-900 rounded-2xl p-4 flex flex-col justify-between backdrop-blur-md transition-all duration-700 transform ${
        animate
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-12 scale-95'
      } hover:border-gray-800 hover:bg-[#13151b]/80 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]`}
    >
      <div>
        {/* Product Image Container */}
        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#07080a] mb-5 border border-gray-900">
          <Image
            src={product.image || '/placeholder.png'}
            alt={product.title}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
          />
          {/* Top-Right Heart/Wishlist Icon */}
          <button className="absolute top-3 right-3 p-1.5 rounded-full bg-black/40 border border-white/5 backdrop-blur-sm text-gray-400 hover:text-red-500 transition-colors z-10 cursor-pointer">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>

        {/* Title and Price Info */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-base font-semibold text-gray-200 tracking-tight group-hover:text-white transition-colors">
            {product.title}
          </h3>
          <span className="text-base font-bold text-blue-500 tracking-tight">
            ${product.price}
          </span>
        </div>

        {/* Category Description */}
        <p className="text-xs text-gray-500 mb-5">{product.category}</p>
      </div>

      {/* Futuristic Add to Bag Button */}
      <button className="w-full py-2.5 bg-gray-900/40 group-hover:bg-blue-600 border border-gray-800 group-hover:border-blue-500 text-gray-400 group-hover:text-white text-xs font-semibold rounded-xl transition-all duration-300 active:scale-95 cursor-pointer shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
        Add to Bag
      </button>
    </div>
  );
};

export default FeaturedCard;
