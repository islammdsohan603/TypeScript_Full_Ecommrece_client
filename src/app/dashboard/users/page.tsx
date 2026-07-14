'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from '@/lib/auth-client';
import { getCartApi, CartItem } from '@/db/productsdataapi';
import {
  FaBoxOpen,
  FaUserShield,
  FaArrowUpRightFromSquare,
  FaShapes,
} from 'react-icons/fa6';

const UsersDashboard = () => {
  const { data: session, isPending: sessionPending } = useSession();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const user = session?.user;

  useEffect(() => {
    const fetchCartData = async () => {
      if (user?.email) {
        try {
          const data = await getCartApi(user.email);
          setCartItems(data);
        } catch (error) {
          console.error('Error loading dashboard data:', error);
        } finally {
          setLoading(false);
        }
      } else if (!sessionPending) {
        setLoading(false);
      }
    };

    fetchCartData();
  }, [user?.email, sessionPending]);

  const totalCartCount = cartItems.reduce(
    (acc, item) => acc + (Number(item.quantity) || 1),
    0,
  );

  const overviewStats = [
    {
      id: 1,
      title: 'Items in Cart',
      value: loading ? '...' : String(totalCartCount).padStart(2, '0'),
      desc: 'Pending in your shopping cart',
      icon: FaShapes,
      color: 'from-orange-500/20 to-amber-500/5',
      iconColor: 'text-orange-400',
      borderColor: 'border-orange-500/20',
    },
    {
      id: 2,
      title: 'Total Orders',
      value: '00',
      desc: 'No active orders currently',
      icon: FaBoxOpen,
      color: 'from-blue-500/20 to-indigo-500/5',
      iconColor: 'text-blue-400',
      borderColor: 'border-blue-500/10',
    },
    {
      id: 3,
      title: 'Profile Status',
      value: user ? 'Verified' : 'Guest',
      desc: 'Your account is active & secure',
      icon: FaUserShield,
      color: 'from-emerald-500/20 to-teal-500/5',
      iconColor: 'text-emerald-400',
      borderColor: 'border-emerald-500/10',
    },
  ];

  if (sessionPending || loading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="space-y-2">
          <div className="h-8 bg-gray-900 rounded w-1/3" />
          <div className="h-4 bg-gray-900 rounded w-1/2" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="h-32 bg-gray-900 rounded-2xl" />
          <div className="h-32 bg-gray-900 rounded-2xl" />
          <div className="h-32 bg-gray-900 rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 select-none">
      {/* হেডার সেকশন */}
      <div className="space-y-1">
        <h1 className="text-xl md:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-white via-gray-200 to-gray-500">
          Welcome back, {user?.name || 'Guest'} ✨
        </h1>
        <p className="text-xs text-gray-500 font-light">
          Here is an overview of your luxury e-commerce account activity.
        </p>
      </div>

      {/* 📊 ৩টি প্রিমিয়াম ওভারভিউ কার্ড গ্রিড */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {overviewStats.map(stat => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className={`relative overflow-hidden rounded-2xl bg-linear-to-br ${stat.color} p-6 border ${stat.borderColor} backdrop-blur-md shadow-xl shadow-black/20 group transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/30`}
            >
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <FaArrowUpRightFromSquare className="w-3 h-3 text-gray-500 hover:text-white cursor-pointer" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-gray-400 tracking-wide uppercase">
                    {stat.title}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                    {stat.value}
                  </h3>
                </div>

                <div
                  className={`p-3.5 rounded-xl bg-[#0d0705]/60 border border-gray-950 shadow-inner ${stat.iconColor}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-gray-950/40 text-[11px] text-gray-500 font-light flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                {stat.desc}
              </div>
            </div>
          );
        })}
      </div>

      {/* সাম্প্রতিক কার্যকলাপ */}
      <div className="rounded-2xl border border-orange-950/10 bg-[#0d0705]/20 p-6 backdrop-blur-xs text-center py-12">
        <p className="text-xs text-gray-600 font-light">
          {totalCartCount > 0
            ? `You have ${totalCartCount} item(s) pending in your cart.`
            : 'No recent activities to display.'}
        </p>
      </div>
    </div>
  );
};

export default UsersDashboard;
