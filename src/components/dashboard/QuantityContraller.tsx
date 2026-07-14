'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface QuantityControllerProps {
  itemId: string;
  currentQuantity: number;
}

const CartQuantityController = ({
  itemId,
  currentQuantity,
}: QuantityControllerProps) => {
  const [quantity, setQuantity] = useState(currentQuantity);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const updateQuantity = async (newQty: number) => {
    if (newQty < 1) return;

    try {
      setIsLoading(true);
      const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

      const res = await fetch(`${SERVER_URL}/api/cart/update-quantity`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId, quantity: newQty }),
      });

      if (res.ok) {
        setQuantity(newQty);
        router.refresh();
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || 'Failed to update quantity');
      }
    } catch (error) {
      console.error('Quantity update error:', error);
      toast.error('Network error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center bg-black/40 border border-orange-950/30 rounded-lg p-0.5 shadow-inner">
      <button
        onClick={() => updateQuantity(quantity - 1)}
        disabled={quantity <= 1 || isLoading}
        className="w-7 h-7 flex items-center justify-center text-xs font-bold text-gray-400 hover:text-white hover:bg-orange-950/20 rounded-md transition-all active:scale-90 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
      >
        －
      </button>

      <span className="w-8 text-center text-xs font-mono font-bold text-orange-400">
        {String(quantity).padStart(2, '0')}
      </span>

      <button
        onClick={() => updateQuantity(quantity + 1)}
        disabled={isLoading}
        className="w-7 h-7 flex items-center justify-center text-xs font-bold text-gray-400 hover:text-white hover:bg-orange-950/20 rounded-md transition-all active:scale-90 disabled:opacity-30 cursor-pointer"
      >
        ＋
      </button>
    </div>
  );
};

export default CartQuantityController;
