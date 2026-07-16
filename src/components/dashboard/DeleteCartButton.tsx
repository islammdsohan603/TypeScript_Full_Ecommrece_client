'use client';

import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

interface DeleteButtonProps {
  itemId: string;
}

const DeleteCartButton = ({ itemId }: DeleteButtonProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to remove this item?',
    );
    if (!confirmDelete) return;

    try {
      setIsDeleting(true);
      const SERVER_URL = (process.env.NEXT_PUBLIC_SERVER_URL || '').replace(/\/+$/, '');

      const res = await fetch(`${SERVER_URL}/api/cart/delete/${itemId}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Item removed from cart!');
        router.refresh(); // সার্ভার কম্পোনেন্টের ডাটা রিফ্রেশ করার জন্য
      } else {
        toast.error(data.message || 'Failed to delete');
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Something went wrong');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="flex-1 py-2.5 bg-red-950/20 hover:bg-red-900/30 border border-red-900/40 text-red-400 text-xs font-medium rounded-xl transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
    >
      <FaTrashAlt className={`w-3 h-3 ${isDeleting ? 'animate-pulse' : ''}`} />
      {isDeleting ? 'Removing...' : 'Delete'}
    </button>
  );
};

export default DeleteCartButton;
