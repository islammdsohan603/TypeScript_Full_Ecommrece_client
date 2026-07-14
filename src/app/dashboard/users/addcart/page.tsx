import { getCartApi } from '@/db/productsdataapi';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import DeleteCartButton from '@/components/dashboard/DeleteCartButton';
import { FaEye, FaShoppingBag } from 'react-icons/fa';

const AddtoCart = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userEmail = session?.user?.email;

  const cartData = userEmail ? await getCartApi(userEmail) : [];

  if (!cartData || cartData.length === 0) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4 text-center select-none">
        <div className="w-16 h-16 rounded-full bg-orange-950/20 border border-orange-900/30 flex items-center justify-center text-orange-400 text-xl">
          <FaShoppingBag />
        </div>
        <div className="space-y-1">
          <h2 className="text-base font-medium text-gray-200">
            Your Cart is Empty
          </h2>
          <p className="text-xs text-gray-500 font-light max-w-xs">
            Looks like you haven't added any luxury items to your cart yet.
          </p>
        </div>
        <Link
          href="/products"
          className="text-xs bg-white text-black px-5 py-2.5 rounded-xl font-semibold transition-all hover:bg-gray-200 active:scale-95 mt-2"
        >
          Discover Products
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 select-none max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-orange-950/20">
        <div className="space-y-1">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">
            Cart Items ({String(cartData.length).padStart(2, '0')})
          </h1>
          <p className="text-xs text-gray-500 font-light">
            Review your selected luxury items before checking out.
          </p>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button className="px-3 py-1.5 bg-[#16100d] border border-orange-950/40 rounded-lg text-[11px] font-medium text-gray-400 hover:text-white transition-colors cursor-pointer">
            Filter 🔍
          </button>
          <button className="px-3 py-1.5 bg-[#16100d] border border-orange-950/40 rounded-lg text-[11px] font-medium text-gray-400 hover:text-white transition-colors cursor-pointer">
            Sort ⇅
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {cartData.map(item => {
          const formattedDate = item.addedAt
            ? new Date(item.addedAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })
            : 'Recent';

          return (
            <div
              key={item._id}
              className="group bg-[#0d0705]/50 border border-orange-950/10 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-5 backdrop-blur-md shadow-lg shadow-black/20 transition-all duration-300 hover:border-orange-500/20"
            >
              {/* লেফট সেকশন: ইমেজ এবং প্রোডাক্টের নাম-ডিটেইলস */}
              <div className="flex items-center gap-4 flex-1 min-w-0">
                {/* প্রোডাক্ট ইমেজ */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-black/40 border border-orange-950/20 shrink-0">
                  <Image
                    src={item.images}
                    alt={item.title}
                    fill
                    sizes="96px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* নাম, আইডি এবং ডেট */}
                <div className="space-y-1.5 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-200 line-clamp-1 group-hover:text-white transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-gray-500 font-mono tracking-wider uppercase">
                    ID: #{item.productId.slice(-8)}
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 pt-1">
                    <div className="text-[11px] text-gray-400">
                      <span className="text-gray-500 font-light">
                        Added Date:
                      </span>{' '}
                      {formattedDate}
                    </div>
                    {item.quantity > 1 && (
                      <div className="text-[11px] text-orange-500/80 font-medium">
                        Qty: {item.quantity} ({item.price} each)
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* মিডল সেকশন: অ্যামাউন্ট এবং স্ট্যাটাস */}
              <div className="flex items-center justify-between md:justify-end gap-8 lg:gap-16 px-2 md:px-0 border-t border-b border-orange-950/10 py-3 md:py-0 md:border-none">
                {/* প্রাইস */}
                <div className="space-y-0.5 md:text-right">
                  <p className="text-[10px] text-gray-500 uppercase font-light tracking-wider">
                    Amount
                  </p>
                  <p className="text-base font-bold text-orange-400">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>

                {/* স্ট্যাটাস ব্যাজ */}
                <div className="space-y-1 md:text-center">
                  <p className="text-[10px] text-gray-500 uppercase font-light tracking-wider hidden md:block">
                    Status
                  </p>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-950/40 border border-orange-500/20 text-[10px] font-medium text-orange-400">
                    <span className="w-1 h-1 rounded-full bg-orange-400 animate-pulse" />
                    In Cart
                  </span>
                </div>
              </div>

              {/*  (View & Delete) */}
              <div className="flex items-center gap-2 w-full md:w-auto shrink-0 md:pl-2">
                {/* View Button */}
                <Link
                  href={`/details/${item.productId}`}
                  className="flex-1 md:flex-none px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-gray-200 text-xs font-medium rounded-lg transition-all duration-300 active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer min-w-24"
                >
                  <FaEye className="w-3.5 h-3.5 text-gray-400" />
                  Details
                </Link>

                {/* Delete Button Component */}
                <DeleteCartButton itemId={item._id} />
              </div>
            </div>
          );
        })}
      </div>

      {/* 💳 Total Price & Checkout Section */}
      {cartData.length > 0 && (
        <div className="mt-8 pt-6 border-t border-orange-950/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-[#0d0705]/30 p-6 rounded-2xl border border-orange-950/10 backdrop-blur-md">
          {/*  left side details*/}
          <div className="space-y-1">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Total Order Value
            </h2>
            <div className="flex items-baseline gap-2">
              <h1 className="text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-white via-orange-400 to-amber-500 tracking-tight">
                $
                {cartData
                  .reduce(
                    (total, item) =>
                      total + Number(item.price) * (Number(item.quantity) || 1),
                    0,
                  )
                  .toFixed(2)}
              </h1>
              <span className="text-xs text-gray-400 font-light">
                (
                {cartData.reduce(
                  (totalQty, item) => totalQty + (Number(item.quantity) || 1),
                  0,
                )}{' '}
                items)
              </span>
            </div>
            <p className="text-[10px] text-gray-500 font-light">
              Taxes and shipping will be calculated at checkout.
            </p>
          </div>

          {/*right side */}
          <div className="w-full md:w-auto">
            <Link
              href="/dashboard/checkout"
              className="w-full md:w-auto inline-flex items-center justify-center bg-linear-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white text-xs md:text-sm font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-orange-950/40 transition-all duration-300 active:scale-[0.98] cursor-pointer tracking-wide uppercase"
            >
              Proceed to Checkout ➔
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddtoCart;
