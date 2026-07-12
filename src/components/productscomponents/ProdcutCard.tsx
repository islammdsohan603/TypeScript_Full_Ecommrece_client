// src/components/productscomponents/ProdcutCard.tsx
'use client';

import React from 'react';
import Image from 'next/image';

interface ProductProps {
  product: {
    _id: string;
    title: string;
    brand: string;
    price: number;
    discountPrice?: number;
    images: string;
    rating: number;
  };
}

const ProdcutCard: React.FC<ProductProps> = ({ product }) => {
  return (
    <div className="group relative bg-[#0d0e12]/60 border border-gray-900 hover:border-gray-800 rounded-2xl p-4 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(255,255,255,0.02)] flex flex-col justify-between overflow-hidden">
      {/* ইমেজ কন্টেইনার জুম অ্যানিমেশন সহ */}
      <div className="relative w-full h-48 rounded-xl overflow-hidden bg-gray-950 mb-4">
        <Image
          src={product.images}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {product.discountPrice && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
            Sale
          </span>
        )}
      </div>

      {/* প্রোডাক্ট ডিটেইলস */}
      <div className="flex-grow">
        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">
          {product.brand}
        </p>
        <h3 className="text-sm font-medium text-gray-200 line-clamp-2 mt-1 group-hover:text-white transition-colors">
          {product.title}
        </h3>
      </div>

      {/* প্রাইস এবং অ্যাকশন */}
      <div className="mt-4 pt-3 border-t border-gray-900 flex items-center justify-between">
        <div>
          {product.discountPrice ? (
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold text-white">
                ${product.discountPrice}
              </span>
              <span className="text-xs text-gray-500 line-through">
                ${product.price}
              </span>
            </div>
          ) : (
            <span className="text-base font-bold text-white">
              ${product.price}
            </span>
          )}
        </div>

        <button className="text-xs bg-white text-black px-3 py-2 rounded-xl font-medium active:scale-95 transition-all cursor-pointer hover:bg-gray-200">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProdcutCard;
