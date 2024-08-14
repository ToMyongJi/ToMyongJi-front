import React, { useState } from 'react';
import Header from '../components/Header';

const MyPage = () => {
  const [sampleUser, setSampleUser] = useState({
    name: '이준규',
    studentId: '60222126',
    major: '융합소프트웨어학부',
    council: 'ICT 학생회',
    type: '회장',
  });

  const sampleCouncilMember = [
    { studentId: '60222126', name: '이준규' },
    { studentId: '60222117', name: '이서현' },
    { studentId: '60211665', name: '박진형' },
  ];

  const handleUserUpdate = (e) => {
    e.preventDefault();
    // 여기에 사용자 정보 업데이트 로직 추가
    alert('사용자 정보가 업데이트되었습니다.');
  };

  return (
    <div className="max-w-[600px] min-h-screen mx-auto bg-white flex flex-col">
      <Header />
      <div className="flex flex-col items-center justify-center px-4 sm:px-20 py-10 mt-3 font-GmarketLight text-[10px] sm:text-[12px]">
        {/* 내 정보 관리 박스 */}
        <div className="w-full p-4 sm:p-6 rounded-md shadow-[0_0_10px_#CED3FF] mb-6">
          <h2 className="font-GmarketMedium text-[#002e72] text-[15px] sm:text-[18px] mb-4">내 정보 관리</h2>
          <form onSubmit={handleUserUpdate} className="space-y-4">
            <div className="flex flex-wrap items-center">
              <label className="w-full sm:w-[100px] text-[#002e72] mb-2 sm:mb-0">이름</label>
              <input
                type="text"
                value={sampleUser.name}
                onChange={(e) => setSampleUser({ ...sampleUser, name: e.target.value })}
                className="w-full sm:w-[calc(100%-100px)] p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
              />
            </div>
            <div className="flex flex-wrap items-center">
              <label className="w-full sm:w-[100px] text-[#002e72] mb-2 sm:mb-0">학번</label>
              <input
                type="text"
                value={sampleUser.studentId}
                onChange={(e) => setSampleUser({ ...sampleUser, studentId: e.target.value })}
                className="w-full sm:w-[calc(100%-100px)] p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
              />
            </div>
            <div className="flex flex-wrap items-center">
              <label className="w-full sm:w-[100px] text-[#002e72] mb-2 sm:mb-0">학부/학과</label>
              <select
                value={sampleUser.major}
                onChange={(e) => setSampleUser({ ...sampleUser, major: e.target.value })}
                className="w-full sm:w-[calc(100%-100px)] p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
              >
                <option value="융합소프트웨어학부">융합소프트웨어학부</option>
                <option value="디지털콘텐츠디자인학과">디지털콘텐츠디자인학과</option>
              </select>
            </div>
            <div className="flex flex-wrap items-center">
              <label className="w-full sm:w-[100px] text-[#002e72] mb-2 sm:mb-0">소속 이름</label>
              <div className="w-full sm:w-[calc(100%-100px)]">
                <select
                  value={sampleUser.council}
                  onChange={(e) => setSampleUser({ ...sampleUser, council: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
                >
                  <option value="">소속을 선택해주세요.</option>
                  <option value="ICT 학생회">ICT 학생회</option>
                  <option value="융합소프트웨어학부 학생회">융합소프트웨어학부 학생회</option>
                </select>
              </div>
            </div>
            <div className="flex flex-wrap items-center">
              <label className="w-full sm:w-[100px] text-[#002e72] mb-2 sm:mb-0">자격</label>
              <input
                type="text"
                value={sampleUser.type}
                readOnly
                className="w-full sm:w-[calc(100%-100px)] p-2 border rounded-lg bg-gray-100"
              />
            </div>
            <button
              type="submit"
              className="w-full px-3 py-2 text-[#061E5B] rounded-md shadow-[0_0_10px_#CED3FF] hover:shadow-[0_0_15px_#A0A9FF] border-none cursor-pointer transition duration-300"
            >
              수정하기
            </button>
          </form>
        </div>

        {/* 소속 관리 박스 (관리자 또는 회장만 볼 수 있음) */}
        {(sampleUser.type === '관리자' || sampleUser.type === '회장') && (
          <div className="w-full p-4 sm:p-6 rounded-md shadow-[0_0_10px_#CED3FF]">
            <h2 className="font-GmarketMedium text-[#002e72] text-[15px] sm:text-[18px] mb-4">소속 관리</h2>
            <div className="flex flex-wrap items-center mb-4">
              <label className="w-full sm:w-[100px] text-[#002e72] mb-2 sm:mb-0">소속 이름</label>
              <input
                type="text"
                value={sampleUser.council}
                readOnly
                className="w-full sm:w-[calc(100%-100px)] p-2 border rounded-lg bg-gray-100"
              />
            </div>
            <button className="w-full px-3 py-2 text-[#061E5B] rounded-md shadow-[0_0_10px_#CED3FF] hover:shadow-[0_0_15px_#A0A9FF] border-none cursor-pointer transition duration-300 mb-4">
              소속부원 추가
            </button>
            <div className="space-y-2">
              {sampleCouncilMember.map((member) => (
                <div key={member.studentId} className="flex items-center justify-between">
                  <span>
                    {member.studentId} - {member.name}
                  </span>
                  <button className="px-3 py-2 text-[#061E5B] rounded-md shadow-[0_0_10px_#FF7B9B] hover:shadow-[0_0_20px_#FF4D7D] hover:bg-[#FFF0F5] border-none cursor-pointer transition duration-300">
                    삭제
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPage;
