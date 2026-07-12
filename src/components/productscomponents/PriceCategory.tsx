'use client';

import { useRouter, useSearchParams } from 'next/navigation';

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

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="relative w-full">
      <select
        value={selected}
        onChange={e => handleSortChange(e.target.value)}
        className="w-full px-4 py-3 bg-[#050508]/80 border border-gray-950 rounded-xl text-sm font-light text-gray-200 focus:outline-none focus:border-gray-800 transition-all duration-300 appearance-none cursor-pointer"
      >
        <option value="" className="bg-[#0d0e12] text-gray-500">
          Default Sorting
        </option>

        <option value="low-to-high" className="bg-[#0d0e12] text-gray-300">
          Price: Low to High
        </option>
        <option value="high-to-low" className="bg-[#0d0e12] text-gray-300">
          Price: High to Low
        </option>
      </select>
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

export default PriceCategory;
