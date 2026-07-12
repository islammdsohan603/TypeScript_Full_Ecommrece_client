'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set('page', pageNumber.toString());

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  return (
    <div className="join bg-[#0d0e12] border border-gray-900 rounded-xl overflow-hidden shadow-lg">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="join-item btn bg-[#0d0e12] text-gray-400 border-none hover:bg-gray-800/50 disabled:bg-gray-950 disabled:text-gray-700 px-4 transition-colors cursor-pointer"
      >
        « Previous
      </button>

      {pageNumbers.map(page => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`join-item btn border-none px-4 transition-all cursor-pointer ${
            currentPage === page
              ? 'bg-white text-black font-semibold hover:bg-gray-200'
              : 'bg-[#0d0e12] text-gray-300 hover:bg-gray-800/50'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="join-item btn bg-[#0d0e12] text-gray-400 border-none hover:bg-gray-800/50 disabled:bg-gray-950 disabled:text-gray-700 px-4 transition-colors cursor-pointer"
      >
        Next »
      </button>
    </div>
  );
};

export default Pagination;
