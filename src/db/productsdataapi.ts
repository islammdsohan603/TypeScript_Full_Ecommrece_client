const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const getFeaturedProducts = async (): Promise<any[]> => {
  try {
    const res = await fetch(`${SERVER_URL}/api/featured-products`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error('Failed to fetch featured products');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching featured products:', error);
    throw new Error('Failed to fetch featured products');
  }
};
