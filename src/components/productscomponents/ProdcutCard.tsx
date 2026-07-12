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
  console.log(product.images);
  return (
    <div className="group relative bg-[#0d0e12]/60 border border-gray-950 hover:border-gray-850 rounded-2xl p-4 transition-all cubic-bezier(0.16, 1, 0.3, 1) duration-500 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden">
      <div className="relative w-full h-48 rounded-xl overflow-hidden bg-[#050508] mb-4">
        <Image
          src={product.images}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority={false}
        />
        {product.discountPrice && (
          <span className="absolute top-3 left-3 bg-blue-600/90 backdrop-blur-xs text-white text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider shadow-sm">
            Sale
          </span>
        )}
      </div>

      <div className="flex-grow">
        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">
          {product.brand}
        </p>
        <h3 className="text-sm font-light text-gray-300 line-clamp-2 mt-1 group-hover:text-white transition-colors duration-350">
          {product.title}
        </h3>
      </div>

      <div className="mt-5 pt-3 border-t border-gray-950 flex items-center justify-between">
        <div>
          {product.discountPrice ? (
            <div className="flex items-baseline gap-2">
              <span className="text-base font-semibold text-white">
                ${product.discountPrice}
              </span>
              <span className="text-xs text-gray-600 line-through">
                ${product.price}
              </span>
            </div>
          ) : (
            <span className="text-base font-semibold text-white">
              ${product.price}
            </span>
          )}
        </div>

        <button className="text-xs bg-white text-black px-3.5 py-2 rounded-xl font-medium active:scale-95 transition-all duration-200 cursor-pointer hover:bg-gray-200">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProdcutCard;
