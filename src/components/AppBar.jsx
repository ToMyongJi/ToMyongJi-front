import React from 'react';
import { Link } from 'react-router-dom';

const AppBar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 flex justify-center w-full">
      <div className="max-w-[600px] w-full mx-auto bg-white shadow-md border-t-2 border-[#2EC4B6]">
        <div className="flex items-center justify-center px-4 py-2">
          <Link
            to="/"
            className="text-[#2EC4B6] hover:text-[#20a090] active:text-[#1c8a7c] transition-all duration-200 ease-in-out"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 transition-all duration-200 ease-in-out hover:w-7 hover:h-7 active:w-6 active:h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AppBar;
