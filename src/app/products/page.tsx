import { getAllproudctsApi } from '@/db/productsdataapi';
import React from 'react';

const ProductsPage = async () => {
  const products = await getAllproudctsApi();
  console.log(products);

  return (
    <div className="min-h-screen bg-[#050508]">
      <h1>Products in my list</h1>
    </div>
  );
};

export default ProductsPage;
