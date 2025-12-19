import React from 'react';
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import receiptsExample from "../assets/images/receipts-example.png"
import {useLocation} from "react-router-dom";

const ClubHandOver = () => {
  const {state} = useLocation();
  console.log("clubhandover", state);
  return (
    <div className="max-w-[600px] min-h-screen mx-auto bg-white flex flex-col">
      <Header/>
      <div
        className="flex-grow flex flex-col items-start justify-start px-4 sm:px-20 py-3 mt-3 font-GmarketLight text-[10px] sm:text-[12px]">
        <div className="flex items-center justify-between w-full mb-4">
          <h2 className="font-GmarketMedium text-[#061E5B] text-[15px] sm:text-[18px]">
            학생회 이전
          </h2>
        </div>

        <div className="w-full p-4 sm:p-6 rounded-md shadow-[0_0_10px_#CED3FF] mb-4">
          <div className="space-y-3 text-[10px] sm:text-[12px] text-[#061E5B]">
            <div>
              <p className="mb-2 font-GmarketMedium">
                학생회 이전 시 주의사항
              </p>
              <ol className="space-y-1 list-inside">
                <li>차기 회장이 확정되지 않은 경우에는 학번과 이름을 비워 두셔도 됩니다.</li>
                <li>상단 메뉴에서 [파일] → [다른 이름으로 저장]을 선택합니다.</li>
                <li>학생회를 이전하면 회장 포함 기존 부원들의 회원 정보는 모두 초기화되며,</li>
                <li>기존에 업로드된 학생회비 영수증 내역은 이월되어 하나의 통합 영수증으로</li>
                <li>압축 표시됩니다.</li>
              </ol>
              <p className="text-[#979797] text-xs my-3">* 예시 이미지</p>
              <img src={receiptsExample} alt="receipts" className="w-4/5"/>
            </div>
          </div>
        </div>

        <div className="w-full p-4 sm:p-6 rounded-md shadow-[0_0_10px_#CED3FF] mt-5 mb-10">
          <div className="flex flex-wrap items-center mb-4">
            <label className="w-full sm:w-[100px] text-[#002e72] mb-2 sm:mb-0">
              소속 이름
            </label>
            <input
              role="text"
              readOnly
              value={state}
              className="w-full sm:w-[calc(100%-100px)] p-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
            />
            <div className="flex items-center flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
              <label className="w-full sm:w-[100px] text-[#002e72] mb-2 sm:mb-0">
                차기 회장 정보
              </label>
              <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                <input
                  role="text"
                  placeholder="학번"
                  className="w-full sm:flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
                />
                <input
                  role="text"
                  placeholder="이름"
                  className="w-full sm:flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
                />
              </div>
            </div>

          </div>
        </div>

        <div className="flex justify-center w-full mt-8 mb-10 space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="w-1/4 px-3 py-2 text-[#061E5B] rounded-md shadow-[0_0_10px_#CED3FF] hover:shadow-[0_0_15px_#A0A9FF] border border-[#CED3FF] transition duration-300"
          >
            취소
          </button>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default ClubHandOver;