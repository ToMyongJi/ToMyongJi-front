import { useNavigate } from 'react-router-dom';
import KakaoLogin from '../components/Login/KakaoLogin';
import AdvertiseButton from '../components/AdvertiseButton';

const Login = () => {
  const navigate = useNavigate();
  const onClickBtn = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-[600px] h-[100vh] ml-auto mr-auto bg-white font-bold text-3xl">
      {/* 헤더 */}
      <div className="flex items-center h-[6%] p-[10px] border-solid border-b-[2.5px] border-[#dddddd]">
        <button className="w-[5%] cursor-pointer" onClick={onClickBtn}>
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.5975 3.33783C15.3046 3.04494 14.8297 3.04494 14.5368 3.33783L6.40532 11.4693C6.40525 11.4694 6.4054 11.4693 6.40532 11.4693C6.11243 11.7622 6.11222 12.2373 6.40511 12.5302L14.5368 20.6619C14.8297 20.9548 15.3046 20.9548 15.5975 20.6619C15.8904 20.3691 15.8904 19.8942 15.5975 19.6013L7.9961 11.9999L15.5975 4.39849C15.8904 4.1056 15.8904 3.63073 15.5975 3.33783Z"></path>
          </svg>
        </button>
        <span className="flex justify-center items-center w-[90%] text-xl font-GmarketMedium">로그인</span>
        <div className="w-[5%]"></div>
      </div>
      {/* 바디 */}
      <div className="w-[100%] h-[94%] p-10 flex flex-col justify-between">
        <div className="w-[100%] h-[75%] flex flex-col justify-center">
          <div className="flex items-center justify-center p-3 bg-white mb-[5px]">
            <h1 className="text-[25px] font-GmarketBold text-[#2EC4B6]">Per-form</h1>
          </div>
          <div className="flex justify-center items-center w-[100%] p-3">
            <KakaoLogin />
          </div>
        </div>
        <div className="flex justify-center items-center w-[100%]">
          <AdvertiseButton />
        </div>
      </div>
    </div>
  );
};

export default Login;
