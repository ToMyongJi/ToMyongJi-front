import React from 'react';
import { useNavigate } from 'react-router-dom';

const Notfound = () => {
  const navigate = useNavigate();
  const onClickBtn = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col max-w-[600px] ml-auto mr-auto h-[100vh] bg-white">
      <div className="flex flex-col justify-center w-[100%] p-1">
        <button className="w-[5%] cursor-pointer" onClick={onClickBtn}>
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.5975 3.33783C15.3046 3.04494 14.8297 3.04494 14.5368 3.33783L6.40532 11.4693C6.40525 11.4694 6.4054 11.4693 6.40532 11.4693C6.11243 11.7622 6.11222 12.2373 6.40511 12.5302L14.5368 20.6619C14.8297 20.9548 15.3046 20.9548 15.5975 20.6619C15.8904 20.3691 15.8904 19.8942 15.5975 19.6013L7.9961 11.9999L15.5975 4.39849C15.8904 4.1056 15.8904 3.63073 15.5975 3.33783Z"></path>
          </svg>
        </button>
      </div>
      <div className="w-[100%] h-[40%] flex flex-col justify-center items-center">
        <span className="mb-10 text-4xl text-[#FF6B6B] font-GmarketBold">잘못된 페이지입니다!</span>
        <span className="text-xl font-GmarketLight">페이지를 이동해주세요.</span>
      </div>
    </div>
  );
};

export default Notfound;
