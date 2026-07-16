'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from '@/lib/auth-client';
import { getUersPayment } from '@/db/productsdataapi';
import { CreditCard, Calendar, ShoppingBag, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

interface OrderItem {
  name: string;
  image: string | null;
  quantity: number;
  totalAmountUSD: number;
}

interface Order {
  _id: string;
  sessionId: string;
  status: string;
  totalAmountUSD: number;
  currency: string;
  createdAt: string;
  items: OrderItem[];
}

const UserPayments = () => {
  const { data: session, isPending } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (session?.user?.email) {
        setLoading(true);
        const data = await getUersPayment(session.user.email);
        setOrders(data);
        setLoading(false);
      }
    };

    if (!isPending) {
      fetchOrders();
    }
  }, [session, isPending]);

  if (isPending || loading) {
    return (
      <div className="min-h-screen bg-[#050508] text-white flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-blue-500"></span>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-[#050508] text-white flex items-center justify-center">
        <p className="text-gray-400">
          Please login to view your payment history.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050508] text-white py-12 px-4 md:px-8 select-none">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 flex items-center gap-3">
            <CreditCard className="text-blue-500 w-8 h-8" /> Payment History
          </h1>
          <p className="text-sm text-gray-500 mt-2 font-light">
            Review your successful purchases and orders.
          </p>
        </div>

        {/* Empty State */}
        {orders.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-gray-900 rounded-2xl bg-[#0d0e12]/30">
            <ShoppingBag className="w-12 h-12 mx-auto text-gray-600 mb-4" />
            <p className="text-gray-400">No payment transactions found.</p>
          </div>
        ) : (
          /* Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {orders.map(order => (
              <div
                key={order._id}
                className="bg-[#0d0e12]/60 border border-gray-900 hover:border-gray-800 rounded-2xl p-6 backdrop-blur-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Meta Details */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="space-y-1">
                      <p className="text-[10px] tracking-widest text-gray-500 uppercase font-mono">
                        Session ID: {order.sessionId.substring(0, 15)}...
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-400 font-light">
                        <Calendar className="w-3..5 h-3.5 text-blue-500" />
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </div>
                    </div>
                    {/* Paid Badge */}
                    <span className="flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full uppercase tracking-wider">
                      <CheckCircle2 className="w-3 h-3" /> {order.status}
                    </span>
                  </div>

                  {/* Items Purchased List */}
                  <div className="border-t border-b border-gray-900/60 py-4 my-4 space-y-3">
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-[#13151b] border border-gray-800 rounded-lg flex items-center justify-center">
                            <ShoppingBag className="w-4 h-4 text-gray-500" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-200 truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500 font-light">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <div className="text-sm font-mono text-gray-300">
                          ${item.totalAmountUSD.toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Total Block */}
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs tracking-wider text-gray-400 uppercase font-semibold">
                    Total Paid
                  </span>
                  <span className="text-xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                    ${order.totalAmountUSD.toFixed(2)}{' '}
                    <span className="text-xs font-normal text-gray-500">
                      {order.currency.toUpperCase()}
                    </span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPayments;
