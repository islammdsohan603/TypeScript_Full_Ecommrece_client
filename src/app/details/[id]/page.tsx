import AddButton from '@/components/AddtoButton/AddButton';
import { getDetailsproductsApi } from '@/db/productsdataapi';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import {
  FaChevronLeft,
  FaShieldAlt,
  FaTruck,
  FaBoxOpen,
  FaStar,
  FaTags,
} from 'react-icons/fa';

interface PageProps {
  params: Promise<{ id: string }>;
}

const ProductsDetails = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  //  data fetch
  const product = await getDetailsproductsApi(id);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#050508] text-white flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500 text-sm font-light">
          Product details could not be loaded.
        </p>
        <Link
          href="/products"
          className="text-xs bg-white text-black px-4 py-2 rounded-xl font-medium"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050508] text-white py-12 select-none">
      <div className="w-11/12 max-w-6xl mx-auto space-y-8">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors group"
        >
          <FaChevronLeft className="w-3 h-3 transition-transform group-hover:-translate-x-0.5" />
          Back to collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-6 relative w-full aspect-square bg-[#0d0e12]/60 border border-gray-950 rounded-2xl overflow-hidden p-6 backdrop-blur-md">
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#050508]">
              <Image
                src={product.images}
                alt={product.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
                priority
              />
            </div>
            {product.discountPrice && (
              <span className="absolute top-8 left-8 bg-blue-600/90 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                Offer
              </span>
            )}
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-[10px] text-gray-500 font-semibold uppercase tracking-widest">
                <span>{product.brand}</span>
                <span>•</span>
                <span className="text-blue-400 flex items-center gap-1">
                  <FaTags className="w-2.5 h-2.5" /> {product.category}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-b from-white to-gray-400 leading-tight">
                {product.title}
              </h1>
            </div>

            <div className="flex items-center gap-3 text-xs text-gray-400 bg-[#0d0e12]/40 border border-gray-950 px-3 py-2 rounded-xl w-fit">
              <div className="flex items-center gap-1 text-amber-500">
                <FaStar className="w-3 h-3 fill-current" />
                <span className="font-semibold text-white">
                  {product.rating}
                </span>
              </div>
              <span className="text-gray-600">|</span>
              <span>{product.reviews} Global Reviews</span>
            </div>

            <div className="py-4 border-t border-b border-gray-950 flex items-baseline gap-4">
              {product.discountPrice ? (
                <>
                  <span className="text-3xl font-bold text-white">
                    ${product.discountPrice}
                  </span>
                  <span className="text-sm text-gray-600 line-through">
                    ${product.price}
                  </span>
                </>
              ) : (
                <span className="text-3xl font-bold text-white">
                  ${product.price}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Overview
              </h3>
              <p className="text-sm font-light text-gray-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            {product.features && product.features.length > 0 && (
              <div className="space-y-2.5">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Key Features
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {product.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-xs font-light text-gray-400"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-700" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4 text-[11px] font-light text-gray-400">
              <div className="flex items-center gap-2.5 px-3 py-2.5 bg-[#0d0e12]/30 border border-gray-950 rounded-xl">
                <FaShieldAlt className="text-gray-600 w-4 h-4 flex-shrink-0" />
                <div>
                  <p className="text-gray-500 font-medium">Warranty</p>
                  <p className="text-gray-300 mt-0.5 truncate">
                    {product.warranty}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 px-3 py-2.5 bg-[#0d0e12]/30 border border-gray-950 rounded-xl">
                <FaBoxOpen className="text-gray-600 w-4 h-4 flex-shrink-0" />
                <div>
                  <p className="text-gray-500 font-medium">Availability</p>
                  <p
                    className={`mt-0.5 font-medium ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`}
                  >
                    {product.stock > 0
                      ? `${product.stock} Units In Stock`
                      : 'Out of Stock'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 px-3 py-2.5 bg-[#0d0e12]/30 border border-gray-950 rounded-xl">
                <FaTruck className="text-gray-600 w-4 h-4 flex-shrink-0" />
                <div>
                  <p className="text-gray-500 font-medium">Shipping</p>
                  <p className="text-gray-300 mt-0.5">Fast & Secure Delivery</p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex gap-4">
              {/* add to button */}
              <div className="w-full">{<AddButton product={product} />}</div>

              <div className="px-4 py-3 bg-[#0d0e12]/60 border border-gray-950 text-[10px] font-mono text-gray-500 rounded-xl flex flex-col justify-center">
                <span>SKU</span>
                <span className="text-gray-300 font-sans mt-0.5 font-medium">
                  {product.sku}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsDetails;
