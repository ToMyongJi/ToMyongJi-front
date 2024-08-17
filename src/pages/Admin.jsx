import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Admin = () => {
  const [studentClubName, setStudentClubName] = useState('ICT융합대학 학생회');
  const [president, setPresident] = useState({ studentNum: '60222126', name: '이준규' });
  const [newPresident, setNewPresident] = useState({ studentNum: '', name: '' });
  const [newMember, setNewMember] = useState({ studentNum: '', name: '' });
  const [members, setMembers] = useState([
    { studentNum: '60222117', name: '이서현' },
    { studentNum: '60211665', name: '박진형' },
  ]);

  const handleNewPresidentChange = (e) => {
    setNewPresident({ ...newPresident, [e.target.name]: e.target.value });
  };

  const handleSavePresident = (e) => {
    e.preventDefault();
    if (newPresident.studentNum && newPresident.name) {
      setPresident(newPresident);
      setNewPresident({ studentNum: '', name: '' });
      console.log('회장 정보 저장:', newPresident);
      alert('회장 정보가 저장되었습니다.');
    } else {
      alert('학번과 이름을 모두 입��해주세요.');
    }
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    if (newMember.studentNum && newMember.name) {
      setMembers([...members, newMember]);
      setNewMember({ studentNum: '', name: '' });
    }
  };

  const handleDeleteMember = (studentNum) => {
    setMembers(members.filter((member) => member.studentNum !== studentNum));
  };

  return (
    <div className="max-w-[600px] min-h-screen mx-auto bg-white flex flex-col">
      <Header />
      <div className="flex flex-col items-center justify-center px-4 sm:px-20 py-10 mt-3 font-GmarketLight text-[10px] sm:text-[12px]">
        <h2 className="font-GmarketLight text-[#000000] text-[15px] sm:text-[18px] mb-4 self-start">
          {studentClubName}
        </h2>

        {/* 회장 관리 박스 */}
        <div className="w-full p-4 sm:p-6 rounded-md shadow-[0_0_10px_#CED3FF] mb-6">
          <h2 className="font-GmarketMedium text-[#002e72] text-[15px] sm:text-[18px] mb-4">회장 관리</h2>
          <div className="mb-4">
            <div className="flex items-center mb-2 space-x-2">
              <input
                type="text"
                value={president.studentNum}
                readOnly
                className="flex-1 p-2 bg-gray-100 border rounded-lg"
              />
              <input type="text" value={president.name} readOnly className="flex-1 p-2 bg-gray-100 border rounded-lg" />
            </div>
          </div>
          <form onSubmit={handleSavePresident} className="space-y-4">
            <div className="flex space-x-2">
              <input
                type="text"
                name="studentNum"
                placeholder="학번"
                value={newPresident.studentNum}
                onChange={handleNewPresidentChange}
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
              />
              <input
                type="text"
                name="name"
                placeholder="이름"
                value={newPresident.name}
                onChange={handleNewPresidentChange}
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
              />
            </div>
            <button
              type="submit"
              className="w-full px-3 py-2 text-[#061E5B] rounded-md shadow-[0_0_10px_#CED3FF] hover:shadow-[0_0_15px_#A0A9FF] border-none cursor-pointer transition duration-300"
            >
              변경
            </button>
          </form>
        </div>

        {/* 소속부원 관리 박스 */}
        <div className="w-full p-4 sm:p-6 rounded-md shadow-[0_0_10px_#CED3FF] mt-5 mb-10">
          <h2 className="font-GmarketMedium text-[#002e72] text-[15px] sm:text-[18px] mb-4">소속부원 관리</h2>
          <form onSubmit={handleAddMember} className="mb-4">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="학번"
                value={newMember.studentNum}
                onChange={(e) => setNewMember({ ...newMember, studentNum: e.target.value })}
                className="flex-1 p-1 sm:p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
              />
              <input
                type="text"
                placeholder="이름"
                value={newMember.name}
                onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                className="flex-1 p-1 sm:p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
              />
              <button
                type="submit"
                className="px-3 py-2 text-[#061E5B] rounded-md shadow-[0_0_10px_#CED3FF] hover:shadow-[0_0_15px_#A0A9FF] border-none cursor-pointer transition duration-300"
              >
                <span className="hidden sm:inline">추가</span>
                <span className="sm:hidden text-[12px]">+</span>
              </button>
            </div>
          </form>
          <div className="space-y-2">
            {members.map((member) => (
              <div key={member.studentNum} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={member.studentNum}
                  readOnly
                  className="flex-1 p-1 bg-gray-100 border rounded-lg sm:p-2"
                />
                <input
                  type="text"
                  value={member.name}
                  readOnly
                  className="flex-1 p-1 bg-gray-100 border rounded-lg sm:p-2"
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
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
