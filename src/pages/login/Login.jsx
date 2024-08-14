import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

import Header from '../../components/Header';
import logo from '../../assets/images/logo.png';

const Login = () => {
  const navigate = useNavigate();

  const handleOnClick = useCallback(
    (path) => {
      return () => navigate(path);
    },
    [navigate]
  );

  return (
    <div className="max-w-[600px] min-h-screen mx-auto bg-white flex flex-col">
      <Header />
      <div className="flex items-center justify-center px-20 py-10 mt-5 font-GmarketLight text-[7.5px] sm:text-[13px]">
        <div className="flex flex-col items-center px-10 py-4 rounded-md shadow-[0_0_10px_#CED3FF]">
          <img src={logo} alt="로고" className="w-[40%] sm:w-[50%] mb-6" />
          <input
            type="text"
            placeholder="아이디"
            className="text-[#002e72] p-2 mb-4 border rounded-lg w-[90%] focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
          />
          <input
            type="password"
            placeholder="비밀번호"
            className="text-[#002e72] p-2 mb-4 border rounded-lg w-[90%] focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
          />
          <button className=" w-[90%] py-2 mb-4 text-white bg-[#CED3FF] border-none rounded shadow-[0_4px_6px_rgba(156,163,255,0.5)] hover:shadow-[0_6px_8px_rgba(156,163,255,0.7)] transition-shadow duration-300">
            로그인
          </button>
          <div className="flex justify-between w-[90%] mb-4">
            <label className="flex items-center text-[#002e72]">
              <input type="checkbox" className="mr-2 accent-[#CED3FF]" />
              로그인 유지
            </label>
            <button
              className="text-[#002e72] hover:text-[#CED3FF] transition duration-300"
              onClick={handleOnClick('/find')}
            >
              아이디/비밀번호 찾기
            </button>
          </div>
          <button
            className="text-[#002e72] hover:text-[#CED3FF] transition duration-300"
            onClick={handleOnClick('/sign-up')}
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
