import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import logo from '../../assets/images/logo.png';

const HomeAdmin = () => {
  return (
    <div className="max-w-[600px] min-h-screen mx-auto bg-white flex flex-col">
      <Header />
      <div className="flex flex-col items-center justify-center flex-grow p-10">
        <div className="w-full sm:w-[90%] flex items-center justify-between mb-[50px]">
          <img className="w-[45%] sm:w-[40%]" src={logo} alt="투명지 로고 이미지" />
          <div className="w-[50%] text-[#061E5B] text-[12px] sm:text-[14px] flex flex-col justify-between py-2 font-GmarketLight">
            <h1 className="text-[16px] sm:text-[22px] font-GmarketMedium mb-4">투명지 관리자용 페이지</h1>
            <p>각 대학의 학생회 회장 및 소속원들을 관리할 수 있습니다.</p>
          </div>
        </div>
        <div className="w-full sm:w-[90%] bg-[#F0F4FF] rounded-lg p-6 shadow-[0_0_10px_#CED3FF]">
          <p className="text-[#061E5B] text-[12px] sm:text-[15px] font-GmarketLight">
            이 페이지에서는 다음과 같은 관리 작업을 수행할 수 있습니다.
          </p>
          <ul className="list-disc list-inside mt-4 text-[#061E5B] text-[10px] sm:text-[13px] font-GmarketLight">
            <li>각 대학의 학생회 정보 조회 및 수정</li>
            <li>학생회 회장 정보 관리</li>
            <li>학생회 소속원 목록 관리</li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomeAdmin;
