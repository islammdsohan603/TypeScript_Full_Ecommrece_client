// src/components/productscomponents/Category.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Select, SelectItem } from '@heroui/react';

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
    <Select
      className="w-full text-black"
      placeholder="Select Category"
      selectedKeys={[selected]}
      onChange={e => handleCategoryChange(e.target.value)}
    >
      {categories.map(cat => (
        <SelectItem key={cat} value={cat}>
          {cat === 'all' ? 'All Categories' : cat}
        </SelectItem>
      ))}
    </Select>
  );
};

export default Category;
