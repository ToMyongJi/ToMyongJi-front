import React from 'react';
import defaultImage from '../assets/images/default.png';

const SearchResults = ({ results, navigate, getCategoryPath }) => {
  return (
    <div className="px-5 py-3 mt-10">
      <h2 className="text-sm sm:text-xl font-GmarketBold text-[#2EC4B6] mb-4">검색 결과</h2>
      {results.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {results.map((post) => (
            <div
              key={post.id}
              className="overflow-hidden border rounded-lg shadow-sm cursor-pointer transition-all duration-200 ease-in-out hover:shadow-md hover:border-[#2EC4B6] active:bg-gray-100"
              onClick={() => {
                const basePath =
                  post.category === '루틴' || post.category === '영양' ? '/routine-nutrition' : '/feedback';
                navigate(`${basePath}/${getCategoryPath(post.category)}/${post.id}`);
              }}
            >
              <div className="flex items-center px-1 sm:p-2">
                <img
                  src={post.image || defaultImage}
                  alt={post.title}
                  className="object-cover mr-2 rounded-lg w-14 h-14 sm:w-20 sm:h-20"
                />
                <div className="flex flex-col justify-between">
                  <div>
                    <span className="text-xs sm:text-xs font-GmarketMedium text-[#2EC4B6]">{post.category}</span>
                    <h3 className="text-xs truncate sm:text-sm font-GmarketMedium">{post.title}</h3>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-GmarketLight">{post.author}</p>
                    <p className="text-xs text-gray-400 font-GmarketLight">{post.date}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-center text-[#FF6B6B] font-GmarketMedium">검색 결과가 없습니다.</p>
      )}
    </div>
  );
};

export default SearchResults;
