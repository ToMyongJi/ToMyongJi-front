import React from "react";

const Maintenance = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F8FF] px-4">
      <div className="text-center">
        <h1 className="text-[#002D72] text-2xl sm:text-3xl font-GmarketBold mb-4">
          서버 점검 안내
        </h1>
        <div className="max-w-md p-6 bg-white rounded-lg shadow-lg sm:p-8">
          <div className="space-y-2 text-[#002D72] font-GmarketMedium">
            <p>점검 기간: 9월 27일 00:00 ~ 9월 27일 04:00</p>
            <p>점검 내용: 서버 점검</p>
          </div>
          <div className="space-y-2 mt-6 font-GmarketLight text-[#002D72]">
            <p className="text-sm">
              더 나은 서비스 제공을 위해 점검을 진행하고 있습니다.
              <br />
              불편을 끼쳐 죄송합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;
