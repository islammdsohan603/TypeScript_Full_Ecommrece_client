// src/components/productscomponents/PriceCategory.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Select, SelectItem } from '@heroui/react';

const PriceCategory = ({ selected }: { selected: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!value) {
      params.delete('sort');
    } else {
      params.set('sort', value);
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <Select
      className="w-full text-black"
      placeholder="Default Sorting"
      selectedKeys={[selected]}
      onChange={e => handleSortChange(e.target.value)}
    >
      <SelectItem key="low-to-high" value="low-to-high">
        Price: Low to High
      </SelectItem>
      <SelectItem key="high-to-low" value="high-to-low">
        Price: High to Low
      </SelectItem>
    </Select>
  );
};

export default PriceCategory;
