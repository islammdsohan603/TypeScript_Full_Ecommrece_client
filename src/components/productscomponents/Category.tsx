'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const categories = [
  'all',
  'Air Conditioner',
  'Air Fryer',
  'Air Purifier',
  'Blender',
  'Ceiling Fan',
  'Coffee Maker',
  'Electric Iron',
  'Electric Kettle',
  'Extension Board',
  'Freezer',
  'Generator',
  'IPS',
  'Lighting',
  'Microwave',
  'Mixer',
  'Power Strip',
  'Refrigerator',
  'Rice Cooker',
  'Security',
  'Smart Home',
  'Smart Lock',
  'Solar',
  'Television',
  'Toaster',
  'Vacuum Cleaner',
  'Washing Machine',
  'Water Purifier',
];

const Category = ({ selected }: { selected: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'all') {
      params.delete('category');
    } else {
      params.set('category', value);
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="relative w-full">
      <select
        value={selected}
        onChange={e => handleCategoryChange(e.target.value)}
        className="w-full px-4 py-3 bg-[#050508]/80 border border-gray-950 rounded-xl text-sm font-light text-gray-200 focus:outline-none focus:border-gray-800 transition-all duration-300 appearance-none cursor-pointer"
      >
        {categories.map(cat => (
          <option key={cat} value={cat} className="bg-[#0d0e12] text-gray-300">
            {cat === 'all' ? 'All Categories' : cat}
          </option>
        ))}
      </select>
      {/* কাস্টম ড্রপডাউন অ্যারো আইকন */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
};

export default Category;
