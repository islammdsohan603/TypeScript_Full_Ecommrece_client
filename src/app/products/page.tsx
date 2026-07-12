import Category from '@/components/productscomponents/Category';
import Pagination from '@/components/productscomponents/Pagination';
import PriceCategory from '@/components/productscomponents/PriceCategory';
import ProdcutCard from '@/components/productscomponents/ProdcutCard';
import { getAllProductsApi } from '@/db/productsdataapi';

interface PageProps {
  searchParams: Promise<{ category?: string; sort?: string; page?: string }>;
}

const ProductsPage = async ({ searchParams }: PageProps) => {
  const resolvedParams = await searchParams;
  const currentCategory = resolvedParams.category || 'all';
  const currentSort = resolvedParams.sort || '';
  const currentPage = parseInt(resolvedParams.page || '1') || 1;

  // এপিআই থেকে প্রডাক্টস এবং মেটা ডেটা ডিস্ট্রাকচার করা হলো
  const { products, meta } = await getAllProductsApi(
    currentCategory,
    currentSort,
    currentPage,
  );

  return (
    <div className="min-h-screen bg-[#050508] text-white py-10">
      <section className="w-11/12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
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

        <div className="col-span-3">
          <h1 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-linear-to-b from-white to-gray-400">
            Curated Digital Collection ({meta.totalProducts})
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.length > 0 ? (
              products.map((product: any) => (
                <ProdcutCard key={product._id} product={product} />
              ))
            ) : (
              <p className="text-gray-500 text-sm col-span-3 py-10 text-center">
                No products found in this category.
              </p>
            )}
          </div>

          {meta.totalPages > 1 && (
            <div className="pt-10 flex justify-center">
              <Pagination
                currentPage={meta.currentPage}
                totalPages={meta.totalPages}
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
