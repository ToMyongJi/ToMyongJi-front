import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  const maxPageButtons = 5; // 한 번에 보여줄 페이지 버튼의 최대 개수

  let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

  if (endPage - startPage + 1 < maxPageButtons) {
    startPage = Math.max(1, endPage - maxPageButtons + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex items-center justify-center mt-4 mb-4 space-x-2">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded ${
          currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-[#002D72] hover:text-[#CED3FF]'
        }`}
      >
        {'<<'}
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded ${
          currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-[#002D72] hover:text-[#CED3FF]'
        }`}
      >
        {'<'}
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-3 py-1 rounded ${
            currentPage === number ? 'bg-[#CED3FF] text-[#002D72]' : 'text-[#002D72] hover:text-[#CED3FF]'
          }`}
        >
          {number}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded ${
          currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-[#002D72] hover:text-[#CED3FF]'
        }`}
      >
        {'>'}
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded ${
          currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-[#002D72] hover:text-[#CED3FF]'
        }`}
      >
        {'>>'}
      </button>
    </div>
  );
};

export default Pagination;
