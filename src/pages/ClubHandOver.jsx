import React, {useState} from 'react';
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import useUserStore from "../store/userStore.js";
import useAuthStore from "../store/authStore.js";
import receiptsExample from "../assets/images/receipts-example.png"
import {useLocation, useNavigate} from "react-router-dom";
import {handOverClubs} from "../utils/receiptApi.js";

const ClubHandOver = () => {
  const navigate = useNavigate();
  const {state} = useLocation();
  const [userInfo, setUserInfo] = useState({
    name: "",
    studentNum: "",
  })

  const [isLoading, setIsLoading] = useState(false);
  const clearUser = useUserStore((state) => state.clearUser);
  const clearAuthData = useAuthStore((state) => state.clearAuthData);

  const handleHandOver = async () => {
    try{
      setIsLoading(true);
      const response = await handOverClubs(state.clubId = 326, userInfo.studentNum.toString(), userInfo.name);
      if(response.statusCode === 200) {
        alert("학생회 이전이 성공적으로 진행되었습니다.");
        clearUser();
        clearAuthData();
        navigate("/");
      } else{
        alert("학생회 이전에 실패했습니다.");
      }
    } catch (error) {
      console.error('학생회 이전 실패:', error);
      alert('학생회 이전에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  }
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

        <div className="w-full p-2 sm:p-6 rounded-md shadow-[0_0_10px_#CED3FF] mb-4">
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

        <div className="w-full p-6 sm:p-6 rounded-md shadow-[0_0_10px_#CED3FF] mt-5 mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center mb-6">
            <label className="w-full sm:w-[100px] text-[#002e72] mb-2 sm:mb-0">
              소속 이름
            </label>

            <input
              readOnly
              value={state.clubName}
              className="w-full sm:w-[calc(100%-100px)] p-2 border rounded-lg bg-gray-100
               focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center">
            <label className="w-full sm:w-[100px] text-[#002e72] mb-2 sm:mb-0">
              차기 회장 정보
            </label>

            <div className="w-full sm:w-[calc(100%-100px)] flex flex-col sm:flex-row gap-2">
              <input
                placeholder="학번"
                value={userInfo.studentNum ?? ""}
                onChange={(e) => {
                  setUserInfo({...userInfo, studentNum: e.target.value});
                }}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#CED3FF]"
              />
              <input
                placeholder="이름"
                value={userInfo.name ?? ""}
                onChange={(e) => {
                  setUserInfo({...userInfo, name: e.target.value});
                }}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#CED3FF]"
              />
            </div>
          </div>

        </div>

        <div className="flex justify-center w-full mt-1 mb-10 space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="w-1/4 px-3 py-2 text-[#061E5B] rounded-md shadow-[0_0_10px_#CED3FF] hover:shadow-[0_0_15px_#A0A9FF] border border-[#CED3FF] transition duration-300"
          >
            취소
          </button>
          <button
            disabled={isLoading}
            onClick={handleHandOver}
            className={`w-1/4 px-3 py-2 rounded-md shadow-[0_0_10px_#CED3FF] hover:shadow-[0_0_15px_#A0A9FF] border-none transition duration-300 ${
              isLoading
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-[#061E5B] text-white hover:bg-[#0A307D]"
            }`}
           >
            {isLoading ? "이전 중" : "이전하기"}
          </button>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default ClubHandOver;