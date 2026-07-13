'use client';

import React, { useState } from 'react';
import { useSession } from '@/lib/auth-client';
import { toast } from 'react-toastify';

interface ProductProps {
  product: {
    _id: string;
    title: string;
    price: number;
    discountPrice?: number;
    images: string;
    stock: number;
  };
}

const AddButton = ({ product }: ProductProps) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const handleAddToCart = async () => {
    if (!session?.user) {
      toast.error('Please sign in to add products to your cart!');
      return;
    }

    try {
      setLoading(true);
      await delay(400);

      const finalPrice = product.discountPrice || product.price;

      // ৩. ব্যাকএন্ড এপিআই-তে ডেটা পাঠানো
      const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
      const res = await fetch(`${SERVER_URL}/api/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product._id,
          title: product.title,
          price: finalPrice,
          images: product.images,
          userEmail: session.user.email,
        }),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        toast.success('Successfully added to cart! 🛒');
      } else {
        toast.error(data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Cart error:', error);
      toast.error('Failed to add product to cart');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={product.stock === 0 || loading}
        className="w-full py-3.5 bg-white text-black text-sm font-semibold rounded-xl transition-all active:scale-[0.99] hover:bg-gray-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-4 w-4 text-black"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing...
          </>
        ) : (
          'Add to Cart'
        )}
      </button>
    </div>
  );
};

export default AddButton;
