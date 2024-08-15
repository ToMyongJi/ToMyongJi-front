import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MyPage = () => {
  const [sampleUser, setSampleUser] = useState({
    userId: 'wnsrb0407',
    name: '이준규',
    studentNum: '60222126',
    college: 'ICT',
    major: 'software',
    council: 'ICT융합대학 학생회',
    role: '회장',
  });

  const getKoreanMajor = (major) => {
    const majorMap = {
      software: '융합소프트웨어학부',
    };
    return majorMap[major];
  };

  const getKoreanCollege = (college) => {
    const collegeMap = {
      ICT: 'ICT융합대학',
    };
    return collegeMap[college];
  };

  const [councilMembers, setCouncilMembers] = useState([
    { studentNum: '60222126', name: '이준규' },
    { studentNum: '60222117', name: '이서현' },
    { studentNum: '60211665', name: '박진형' },
  ]);

  const [newMember, setNewMember] = useState({ studentNum: '', name: '' });

  const handleUserUpdate = (e) => {
    e.preventDefault();
    // 실제 API 호출
    alert('사용자 정보가 업데이트되었습니다.');
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    if (newMember.studentNum && newMember.name) {
      setCouncilMembers([...councilMembers, newMember]);
      setNewMember({ studentNum: '', name: '' });
    }
  };

  const handleDeleteMember = (studentNum) => {
    setCouncilMembers(councilMembers.filter((member) => member.studentNum !== studentNum));
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
                role="text"
                value={sampleUser.name}
                onChange={(e) => setSampleUser({ ...sampleUser, name: e.target.value })}
                className="w-full sm:w-[calc(100%-100px)] p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
              />
            </div>
            <div className="flex flex-wrap items-center">
              <label className="w-full sm:w-[100px] text-[#002e72] mb-2 sm:mb-0">학번</label>
              <input
                role="text"
                value={sampleUser.studentNum}
                onChange={(e) => setSampleUser({ ...sampleUser, studentNum: e.target.value })}
                className="w-full sm:w-[calc(100%-100px)] p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
              />
            </div>
            <div className="flex flex-wrap items-center">
              <label className="w-full sm:w-[100px] text-[#002e72] mb-2 sm:mb-0">대학</label>
              <select
                value={sampleUser.college}
                onChange={(e) => setSampleUser({ ...sampleUser, major: e.target.value })}
                className="w-full sm:w-[calc(100%-100px)] p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
              >
                <option value="ICT">ICT융합대학</option>
                <option value="Tech">공과대학</option>
                <option value="Science">자연과학대학</option>
              </select>
            </div>
            <div className="flex flex-wrap items-center">
              <label className="w-full sm:w-[100px] text-[#002e72] mb-2 sm:mb-0">학부/학과</label>
              <select
                value={sampleUser.major}
                onChange={(e) => setSampleUser({ ...sampleUser, major: e.target.value })}
                className="w-full sm:w-[calc(100%-100px)] p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
              >
                <option value="software">융합소프트웨어학부</option>
                <option value="digitalDesign">디지털콘텐츠디자인학과</option>
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
                  <option value="ICT융합대학 학생회">ICT융합대학 학생회</option>
                  <option value="융합소프트웨어학부 학생회">융합소프트웨어학부 학생회</option>
                </select>
              </div>
            </div>
            <div className="flex flex-wrap items-center">
              <label className="w-full sm:w-[100px] text-[#002e72] mb-2 sm:mb-0">자격</label>
              <input
                role="text"
                value={sampleUser.role}
                readOnly
                className="w-full sm:w-[calc(100%-100px)] p-2 border rounded-lg bg-gray-100"
              />
            </div>
            <button
              role="submit"
              className="w-full px-3 py-2 text-[#061E5B] rounded-md shadow-[0_0_10px_#CED3FF] hover:shadow-[0_0_15px_#A0A9FF] border-none cursor-pointer transition duration-300"
            >
              수정하기
            </button>
          </form>
        </div>

        {/* 소속 관리 박스 (관리자 또는 회장만 볼 수 있음) */}
        {(sampleUser.role === '관리자' || sampleUser.role === '회장') && (
          <div className="w-full p-4 sm:p-6 rounded-md shadow-[0_0_10px_#CED3FF] mt-5">
            <h2 className="font-GmarketMedium text-[#002e72] text-[15px] sm:text-[18px] mb-4">소속 관리</h2>
            <div className="flex flex-wrap items-center mb-4">
              <label className="w-full sm:w-[100px] text-[#002e72] mb-2 sm:mb-0">소속 이름</label>
              <input
                role="text"
                value={sampleUser.council}
                readOnly
                className="w-full sm:w-[calc(100%-100px)] p-2 border rounded-lg bg-gray-100"
              />
            </div>
            <form onSubmit={handleAddMember} className="mb-4">
              <div className="flex space-x-2">
                <input
                  role="text"
                  placeholder="학번"
                  value={newMember.studentNum}
                  onChange={(e) => setNewMember({ ...newMember, studentNum: e.target.value })}
                  className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
                />
                <input
                  role="text"
                  placeholder="이름"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
                />
                <button
                  role="submit"
                  className="px-3 py-2 text-[#061E5B] rounded-md shadow-[0_0_10px_#CED3FF] hover:shadow-[0_0_15px_#A0A9FF] border-none cursor-pointer transition duration-300"
                >
                  <span className="hidden sm:inline">추가</span>
                  <span className="sm:hidden text-[12px]">+</span>
                </button>
              </div>
            </form>
            <div className="space-y-2">
              {councilMembers.map((member) => (
                <div key={member.studentNum} className="flex items-center space-x-2">
                  <input
                    role="text"
                    value={member.studentNum}
                    readOnly
                    className="flex-1 p-2 bg-gray-100 border rounded-lg"
                  />
                  <input
                    role="text"
                    value={member.name}
                    readOnly
                    className="flex-1 p-2 bg-gray-100 border rounded-lg"
                  />
                  <button
                    onClick={() => handleDeleteMember(member.studentNum)}
                    className="px-3 py-2 text-[#061E5B] rounded-md shadow-[0_0_10px_#FF7B9B] hover:shadow-[0_0_20px_#FF4D7D] hover:bg-[#FFF0F5] border-none cursor-pointer transition duration-300"
                  >
                    <span className="hidden sm:inline">삭제</span>
                    <span className="sm:hidden text-[12px]">-</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyPage;
