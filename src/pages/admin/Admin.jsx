import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { fetchAllClubs } from '../../utils/receiptApi';
import {
  fetchPresident,
  savePresident,
  updatePresident,
  fetchMembers,
  addMember,
  deleteMember,
} from '../../utils/adminApi';
import useStudentClubStore from '../../store/studentClubStore';

const Admin = () => {
  const { clubId } = useParams();
  const [studentClubName, setStudentClubName] = useState('');
  const [president, setPresident] = useState({ clubId: clubId, studentNum: '', name: '' });
  const [newMember, setNewMember] = useState({ clubId: clubId, studentNum: '', name: '' });
  const [members, setMembers] = useState([]);
  const { setCurrentClub, currentClub } = useStudentClubStore();

  const fetchClubData = async () => {
    try {
      const clubData = await fetchAllClubs();
      const club = clubData.find((club) => club.studentClubId === parseInt(clubId));
      if (club) {
        setStudentClubName(club.studentClubName);
        const presidentData = await fetchPresident(clubId);
        setPresident(presidentData);
        const membersData = await fetchMembers(clubId);
        setMembers(membersData);
      } else {
        throw new Error('해당 클럽 정보를 찾을 수 없습니다.');
      }
    } catch (error) {
      console.error('데이터 로드 실패:', error);
      alert('데이터를 불러오는데 실패했습니다.');
    }
  };

  useEffect(() => {
    setCurrentClub(parseInt(clubId));
    fetchClubData();
  }, [clubId, setCurrentClub]);

  const handlePresidentSubmit = async (e) => {
    e.preventDefault();
    console.log('입력한 president', president);
    const updatedPresident = await updatePresident(president);
    console.log('업데이트된 president', updatedPresident);
    setPresident(updatedPresident);
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    const addedMember = await addMember(newMember);
    setMembers([...members, addedMember]);
    setNewMember({ clubId: clubId, studentNum: '', name: '' });
    alert('새 부원이 추가되었습니다.');
  };

  const handleDeleteMember = async (memberId) => {
    const deletedMember = await deleteMember(memberId);
    setMembers(members.filter((member) => member.memberId !== memberId));
    alert('부원이 삭제되었습니다.');
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
          <form onSubmit={handlePresidentSubmit} className="space-y-4">
            <div className="flex space-x-2">
              <input
                type="text"
                name="studentNum"
                placeholder="학번"
                value={president.studentNum}
                onChange={(e) => setPresident({ ...president, studentNum: e.target.value })}
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
              />
              <input
                type="text"
                name="name"
                placeholder="이름"
                value={president.name}
                onChange={(e) => setPresident({ ...president, name: e.target.value })}
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
              />
            </div>
            <button
              type="submit"
              className="w-full px-3 py-2 text-[#061E5B] rounded-md shadow-[0_0_10px_#CED3FF] hover:shadow-[0_0_15px_#A0A9FF] border-none cursor-pointer transition duration-300"
            >
              {president.studentNum ? '변경' : '저장'}
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
              <div key={member.memberId} className="flex items-center space-x-2">
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
                  onClick={() => handleDeleteMember(member.memberId)}
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
