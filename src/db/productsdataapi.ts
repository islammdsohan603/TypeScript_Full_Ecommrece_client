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

export const getAllproudctsApi = async (): Promise<Product[]> => {
  try {
    const res = await fetch(`${SERVER_URL}/api/all-products`, {
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
