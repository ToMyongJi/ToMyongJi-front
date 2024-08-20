import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CategorySideBar from './CategorySideBar';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { accessToken, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <div className="relative max-w-[600px] mx-auto">
      <div className="w-full h-[30px] flex items-center py-6 px-5">
        <div className="flex items-center justify-between w-full">
          <button className="cursor-pointer hover:text-[#2EC4B6] active:text-black" onClick={toggleSidebar}>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-current">
              <path
                clipRule="evenodd"
                d="M3 7C3 7.41421 3.33579 7.75 3.75 7.75H20.25C20.6642 7.75 21 7.41421 21 7C21 6.58579 20.6642 6.25 20.25 6.25H3.75C3.33579 6.25 3 6.58579 3 7ZM3 12C3 12.4142 3.33579 12.75 3.75 12.75H20.25C20.6642 12.75 21 12.4142 21 12C21 11.5858 20.6642 11.25 20.25 11.25H3.75C3.33579 11.25 3 11.5858 3 12ZM3 17C3 17.4142 3.33579 17.75 3.75 17.75H20.25C20.6642 17.75 21 17.4142 21 17C21 16.5858 20.6642 16.25 20.25 16.25H3.75C3.33579 16.25 3 16.5858 3 17Z"
              />
            </svg>
          </button>
          {accessToken ? (
            <div className="flex items-center justify-end w-[110px]">
              <Link to="/my-page">
                <button className="w-[25px] h-[25px] flex items-center justify-center hover:text-[#2EC4B6] active:text-black mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#000000"
                    width="800px"
                    height="800px"
                    viewBox="0 0 56 56"
                    className="w-6 h-6 fill-current"
                  >
                    <path d="M 27.9999 51.9063 C 41.0546 51.9063 51.9063 41.0781 51.9063 28 C 51.9063 14.9453 41.0312 4.0937 27.9765 4.0937 C 14.8983 4.0937 4.0937 14.9453 4.0937 28 C 4.0937 41.0781 14.9218 51.9063 27.9999 51.9063 Z M 27.9999 35.9922 C 20.9452 35.9922 15.5077 38.5 13.1405 41.3125 C 9.9999 37.7968 8.1014 33.1328 8.1014 28 C 8.1014 16.9609 16.9140 8.0781 27.9765 8.0781 C 39.0155 8.0781 47.8983 16.9609 47.9219 28 C 47.9219 33.1563 46.0234 37.8203 42.8593 41.3359 C 40.4921 38.5234 35.0546 35.9922 27.9999 35.9922 Z M 27.9999 32.0078 C 32.4999 32.0547 36.0390 28.2109 36.0390 23.1719 C 36.0390 18.4375 32.4765 14.5 27.9999 14.5 C 23.4999 14.5 19.9140 18.4375 19.9609 23.1719 C 19.9843 28.2109 23.4765 31.9609 27.9999 32.0078 Z" />
                  </svg>
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="w-[50px] h-[25px] rounded-[5px] flex items-center justify-center border-solid border-[1.5px] border-black text-[11px] font-GmarketMedium hover:border-[#2EC4B6] hover:text-[#2EC4B6] active:border-black active:text-black"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <Link to={'/login'}>
              <button className="w-[50px] h-[25px] rounded-[5px] flex items-center justify-center border-solid border-[1.5px] border-black text-[11px] font-GmarketMedium hover:border-[#2EC4B6] hover:text-[#2EC4B6] active:border-black active:text-black">
                로그인
              </button>
            </Link>
          )}
        </div>
      </div>
      <CategorySideBar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </div>
  );
};

export default Header;
