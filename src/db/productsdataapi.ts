const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export interface Product {
  _id: string;
  title: string;
  brand: string;
  category: string;
  price: number;
  discountPrice?: number;
  rating: number;
  reviews: number;
  stock: number;
  sku: string;
  warranty: string;
  featured: boolean;
  bestSeller: boolean;
  newArrival: boolean;
  description: string;
  features: string[];
  images: string;
}

export const getFeaturedProducts = async (): Promise<Product[]> => {
  try {
    const res = await fetch(`${SERVER_URL}/api/featured-products`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error(`HTTP Error! Status: ${res.status}`);
    }
    const data: Product[] = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching featured products:', error);
    throw new Error('Failed to fetch featured products');
  }
};

export const getAllProductsApi = async (
  category?: string,
  sort?: string,
  page: number = 1,
): Promise<{
  products: any[];
  meta: { totalPages: number; totalProducts: number; currentPage: number };
}> => {
  try {
    const url = new URL(`${SERVER_URL}/api/all-products`);

    if (category && category !== 'all')
      url.searchParams.append('category', category);
    if (sort) url.searchParams.append('sort', sort);
    url.searchParams.append('page', page.toString());

    const res = await fetch(url.toString(), { cache: 'no-store' });

    if (!res.ok) throw new Error('Failed to fetch products');

    return await res.json();
  } catch (error) {
    console.error('Error fetching all products:', error);
    return {
      products: [],
      meta: { totalPages: 1, totalProducts: 0, currentPage: 1 },
    };
  }
};

// details api get

export const getDetailsproductsApi = async (
  id: string,
): Promise<Product | null> => {
  try {
    const res = await fetch(`${SERVER_URL}/api/details/${id}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('API request failed');
    }

    return await res.json();
  } catch (error) {
    console.error('Details API error:', error);
    return null;
  }
};
