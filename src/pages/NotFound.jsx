import React from "react";
import notFoundImage from "../assets/images/notFound.png";
import Header from "../components/Header";

const NotFound = () => {
  return (
    <div className="max-w-[600px] min-h-screen ml-auto mr-auto bg-white">
      <Header />
      {/* 바디 */}
      <div className="w-[100%] flex justify-center mt-20">
        <div className="text-[#061E5B] flex flex-col items-center justify-center p-5 shadow-[0_0_10px_#CED3FF] border-none sm:w-[450px] w-[300px] rounded-xl">
          <img
            src={notFoundImage}
            alt="접근 권한 없음 이미지"
            className="sm:w-[200px] w-[150px]"
          />
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center mb-3 text-xs text-center font-GmarketLight sm:text-sm">
              <span>현재 페이지는</span>
              <span>잘못된 페이지입니다.</span>
            </div>
            <span className="text-xs sm:text-sm font-GmarketMedium">
              뒤로 돌아가주세요.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
