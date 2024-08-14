import React from 'react';
import Header from '../../components/Header';

const SignUp2 = () => {
  return (
    <div className="max-w-[600px] min-h-screen mx-auto bg-white flex flex-col">
      <Header />
      <div className="flex flex-col items-center justify-center px-4 sm:px-20 py-10 mt-3 font-GmarketLight text-[10px] sm:text-[12px]">
        <div className="w-full p-4 sm:p-6 rounded-md shadow-[0_0_10px_#CED3FF]">
          <h2 className="font-GmarketMedium text-[#002e72] text-[15px] sm:text-[18px] mb-4">회원가입</h2>
          <div className="flex flex-col p-2 space-y-6">
            {/* 아이디/비밀번호 파트 */}
            <div className="py-3 space-y-7">
              {/* 아이디 */}
              <div className="flex flex-wrap items-center">
                <label className="w-full sm:w-[65px] text-[#002e72] mb-2 sm:mb-0">아이디</label>
                <div className="w-full sm:w-[calc(100%-65px)] flex flex-col sm:flex-row">
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CED3FF] mb-2 sm:mb-0 sm:mr-2"
                  />
                  <button className="w-full sm:w-auto px-4 py-2 text-white bg-[#CED3FF] rounded shadow-[0_4px_6px_rgba(156,163,255,0.5)] hover:shadow-[0_6px_8px_rgba(156,163,255,0.7)] transition-shadow duration-300 whitespace-nowrap">
                    중복확인
                  </button>
                </div>
              </div>
              {/* 비밀번호 */}
              <div className="flex flex-wrap items-center">
                <label className="w-full sm:w-[65px] text-[#002e72] mb-2 sm:mb-0">비밀번호</label>
                <input
                  type="password"
                  className="w-full sm:w-[calc(100%-65px)] p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
                />
              </div>
            </div>

            <hr className="border-t border-[#eeeffe]" />

            {/* 이름/이메일/인증코드 파트 */}
            <div className="py-3 space-y-7">
              {/* 이름 */}
              <div className="flex flex-wrap items-center">
                <label className="w-full sm:w-[65px] text-[#002e72] mb-2 sm:mb-0">이름</label>
                <input
                  type="text"
                  className="w-full sm:w-[calc(100%-65px)] p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
                />
              </div>
              {/* 이메일 */}
              <div className="flex flex-wrap items-center">
                <label className="w-full sm:w-[65px] text-[#002e72] mb-2 sm:mb-0">이메일</label>
                <div className="w-full sm:w-[calc(100%-65px)] flex flex-col sm:flex-row">
                  <input
                    type="email"
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CED3FF] mb-2 sm:mb-0 sm:mr-2"
                  />
                  <button className="w-full sm:w-auto px-4 py-2 text-white bg-[#CED3FF] rounded shadow-[0_4px_6px_rgba(156,163,255,0.5)] hover:shadow-[0_6px_8px_rgba(156,163,255,0.7)] transition-shadow duration-300 whitespace-nowrap">
                    인증코드 발송
                  </button>
                </div>
              </div>
              {/* 인증코드 */}
              <div className="flex flex-wrap items-center">
                <label className="w-full sm:w-[65px] text-[#002e72] mb-2 sm:mb-0">인증코드</label>
                <div className="w-full sm:w-[calc(100%-65px)] flex flex-col sm:flex-row">
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CED3FF] mb-2 sm:mb-0 sm:mr-2"
                  />
                  <button className="w-full sm:w-auto px-4 py-2 text-white bg-[#CED3FF] rounded shadow-[0_4px_6px_rgba(156,163,255,0.5)] hover:shadow-[0_6px_8px_rgba(156,163,255,0.7)] transition-shadow duration-300 whitespace-nowrap">
                    인증하기
                  </button>
                </div>
              </div>
            </div>

            <hr className="border-t border-[#eeeffe]" />

            {/* 학번/학부학과/소속이름/자격 파트 */}
            <div className="py-3 space-y-7">
              {/* 학번 */}
              <div className="flex flex-wrap items-center">
                <label className="w-full sm:w-[65px] text-[#002e72] mb-2 sm:mb-0">학번</label>
                <input
                  type="text"
                  className="w-full sm:w-[calc(100%-65px)] p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
                />
              </div>
              {/* 학부/학과 */}
              <div className="flex flex-wrap items-center">
                <label className="w-full sm:w-[65px] text-[#002e72] mb-2 sm:mb-0">학부/학과</label>
                <select className="w-full sm:w-[calc(100%-65px)] p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CED3FF]">
                  <option value="">학부/학과를 선택해주세요.</option>
                  <option value="융합소프트웨어학부">융합소프트웨어학부</option>
                  <option value="디지털콘텐츠디자인학과">디지털콘텐츠디자인학과</option>
                </select>
              </div>
              {/* 소속 이름 */}
              <div className="flex flex-wrap items-center">
                <label className="w-full sm:w-[65px] text-[#002e72] mb-2 sm:mb-0">소속 이름</label>
                <div className="w-full sm:w-[calc(100%-65px)] flex flex-col sm:flex-row">
                  <select className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CED3FF] mb-2 sm:mb-0 sm:mr-2">
                    <option value="">소속을 선택해주세요.</option>
                    <option value="ICT학생회">ICT학생회</option>
                    <option value="융합소프트웨어학부 학생회">융합소프트웨어학부 학생회</option>
                  </select>
                  <button className="w-full sm:w-auto px-4 py-2 text-white bg-[#CED3FF] rounded shadow-[0_4px_6px_rgba(156,163,255,0.5)] hover:shadow-[0_6px_8px_rgba(156,163,255,0.7)] transition-shadow duration-300 whitespace-nowrap">
                    소속 인증하기
                  </button>
                </div>
              </div>
              {/* 자격 */}
              <div className="flex flex-wrap items-center">
                <label className="w-full sm:w-[65px] text-[#002e72] mb-2 sm:mb-0">자격</label>
                <select className="w-full sm:w-[calc(100%-65px)] p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CED3FF]">
                  <option value="">자격을 선택해주세요.</option>
                  <option value="학생회 소속원">학생회 소속원</option>
                  <option value="학생회 회장">학생회 회장</option>
                  <option value="관리자">관리자</option>
                </select>
              </div>
            </div>

            {/* 가입하기 버튼 */}
            <button className="w-full py-2 text-white bg-[#CED3FF] rounded shadow-[0_4px_6px_rgba(156,163,255,0.5)] hover:shadow-[0_6px_8px_rgba(156,163,255,0.7)] transition-shadow duration-300">
              가입하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp2;
