// src/app/products/page.tsx
import Category from '@/components/productscomponents/Category';
import PriceCategory from '@/components/productscomponents/PriceCategory';
import ProdcutCard from '@/components/productscomponents/ProdcutCard';

import { getAllProductsApi } from '@/db/productsdataapi';

interface PageProps {
  searchParams: Promise<{ category?: string; sort?: string }>;
}

const ProductsPage = async ({ searchParams }: PageProps) => {
  // ১. URL থেকে ক্যাটাগরি ও সর্ট ভ্যালু নেওয়া
  const resolvedParams = await searchParams;
  const currentCategory = resolvedParams.category || 'all';
  const currentSort = resolvedParams.sort || '';

  // ২. ব্যাকএন্ড থেকে ফিল্টার করা ডাটা আনা
  const products = await getAllProductsApi(currentCategory, currentSort);

  return (
    <div className="min-h-screen bg-[#050508] text-white py-10">
      <section className="w-11/12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* ফিল্টার সেকশন */}
        <div className="col-span-1 space-y-6 bg-[#0d0e12]/50 p-6 border border-gray-900 rounded-2xl h-fit">
          <div>
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Filter by Category
            </h2>
            <Category selected={currentCategory} />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Sort by Price
            </h2>
            <PriceCategory selected={currentSort} />
          </div>
        </div>

        {/* প্রোডাক্ট লিস্ট গ্রিড */}
        <div className="col-span-3">
          <h1 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-linear-to-b from-white to-gray-400">
            Curated Digital Collection ({products.length})
          </h1>

          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.length > 0 ? (
              products.map(product => (
                <ProdcutCard key={product._id} product={product} />
              ))
            ) : (
              <p className="text-gray-500 text-sm col-span-3 py-10 text-center">
                No products found in this category.
              </p>
            )}
          </div> */}
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
