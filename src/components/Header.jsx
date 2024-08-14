import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

import logo from '../assets/images/logo.png';
import buttonBackground from '../assets/images/buttonBackground.png';

const Header = () => {
  const navigate = useNavigate();

  const handleOnClick = useCallback(
    (path) => {
      return () => navigate(path);
    },
    [navigate]
  );

  return (
    <div className="flex flex-col items-center justify-center p-[10px]">
      {/* 로고 */}
      <button className="w-60 sm:w-80" onClick={handleOnClick('/')}>
        <img src={logo} alt="투명지 로고 이미지" />
      </button>
      {/* 로그인 버튼 */}
      <div className="w-[100%] flex justify-end items-center p-[10px] mb-4">
        <button
          className="w-[104px] sm:w-[110px] h-[35px] sm:h-[40px] bg-no-repeat bg-cover flex items-center justify-center relative"
          style={{ backgroundImage: `url(${buttonBackground})` }}
          onClick={handleOnClick('/login')}
        >
          <span className="hover:text-[#CED3FF] transition duration-300 z-10 text-[#002e72] font-GmarketLight text-[11px] sm:text-xs">
            로그인
          </span>
        </button>
      </div>
      {/* 네비바 */}
      <div className="text-sm sm:text-[16px] text-[#002D72] flex items-center justify-evenly font-GmarketLight w-[100%] border-t border-[#4E67EC] border-b py-3">
        <button
          className="px-3 py-2 rounded-md hover:text-[#CED3FF] transition duration-300"
          onClick={handleOnClick('/receipts-list')}
        >
          조회
        </button>
        <button
          className="px-3 py-2 rounded-md hover:text-[#CED3FF] transition duration-300"
          onClick={handleOnClick('/create-receipt')}
        >
          작성
        </button>
        <button
          className="px-3 py-2 rounded-md hover:text-[#CED3FF] transition duration-300"
          onClick={handleOnClick('/my-page')}
        >
          마이
        </button>
      </div>
    </div>
  );
};

export default Header;
