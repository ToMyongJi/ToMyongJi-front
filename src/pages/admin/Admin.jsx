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
  const [president, setPresident] = useState({ studentNum: '', name: '' });
  const [newPresident, setNewPresident] = useState({ clubId: clubId, studentNum: '', name: '' });
  const [newMember, setNewMember] = useState({ clubId: clubId, studentNum: '', name: '' });
  const [members, setMembers] = useState([]);
  const { setCurrentClub } = useStudentClubStore();

  // clubId가 변경될 때마다 newPresident와 newMember의 clubId도 업데이트
  useEffect(() => {
    setNewPresident((prev) => ({ ...prev, clubId }));
    setNewMember((prev) => ({ ...prev, clubId }));
  }, [clubId]);

  // 클럽 정보 로드
  const fetchClubData = async () => {
    try {
      setStudentClubName(''); // 데이터 로딩 전 초기화
      setPresident({ studentNum: '', name: '' }); // 데이터 로딩 전 초기화
      setMembers([]); // 데이터 로딩 전 초기화

      const clubData = await fetchAllClubs();
      const club = clubData.find((club) => club.studentClubId === parseInt(clubId));

      if (club) {
        setStudentClubName(club.studentClubName);
        const [presidentData, membersData] = await Promise.all([fetchPresident(clubId), fetchMembers(clubId)]);
        setPresident(presidentData);
        setMembers(membersData);
      } else {
        throw new Error('해당 클럽 정보를 찾을 수 없습니다.');
      }
    } catch (error) {
      console.error('데이터 로드 실패:', error);
      // 에러 발생 시 상태 초기화
      setStudentClubName('');
      setPresident({ studentNum: '', name: '' });
      setMembers([]);
    }
  };

  useEffect(() => {
    if (clubId) {
      setCurrentClub(parseInt(clubId));
      fetchClubData();
    }
  }, [clubId, setCurrentClub]); // clubId 변경을 감지하도록 수정

  // 회장 정보 저장
  const handlePresidentSubmit = async (e) => {
    e.preventDefault();
    try {
      const presidentData = {
        clubId: parseInt(clubId),
        studentNum: newPresident.studentNum.trim(),
        name: newPresident.name.trim(),
      };

      let result;
      if (president.studentNum) {
        result = await updatePresident(presidentData);
      } else {
        result = await savePresident(presidentData);
      }

      setPresident({
        studentNum: result.data.studentNum,
        name: result.data.name,
      });
      newPresident.studentNum = '';
      newPresident.name = '';
      alert(president.studentNum ? '회장 정보가 성공적으로 수정되었습니다.' : '새 회장이 등록되었습니다.');
    } catch (error) {
      console.error('회장 정보 처리 실패:', error);
      alert('회장을 변경하기 위해서 먼저 등록된 회장 회원가입이 필요합니다.');
    }
  };

  // 소속 부원 추가
  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      const response = await addMember(newMember);

      if (response.statusCode === 201) {
        const membersData = await fetchMembers(clubId);
        setMembers(membersData);

        setNewMember({ clubId: clubId, studentNum: '', name: '' });
        alert('정상적으로 소속원이 추가 되었습니다.');
      } else {
        throw new Error(response.statusMessage || '부원 추가 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('부원 추가 중 오류가 발생:', error);
      alert(error.message || '부원 추가 중 오류가 발생했습니다.');
    }
  };

  // 소속 부원 삭제
  const handleDeleteMember = async (memberId) => {
    if (!window.confirm('정말로 삭제하시겠습니까?')) return;

    try {
      await deleteMember(memberId);
      const updatedMembers = await fetchMembers(clubId);
      setMembers(updatedMembers);
      alert('정상적으로 소속원이 삭제되었습니다.');
    } catch (error) {
      console.error('소속원 삭제 중 오류가 발생:', error);
      alert('소속원 삭제 중 오류가 발생했습니다.');
    }
  };

  // 페이지 렌더링
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

          {/* 현재 회장 정보 표시 */}
          {president.studentNum && (
            <div className="mb-4">
              <p className="text-[#002e72] mb-2 font-GmarketMedium">현재 회장</p>
              <div className="flex space-x-2" key="president-info">
                <input
                  type="text"
                  value={president.studentNum}
                  readOnly
                  className="flex-1 p-2 bg-gray-100 border rounded-lg"
                />
                <input
                  type="text"
                  value={president.name}
                  readOnly
                  className="flex-1 p-2 bg-gray-100 border rounded-lg"
                />
              </div>
            </div>
          )}

          {/* 회장 정보 변경 폼 */}
          <form onSubmit={handlePresidentSubmit} className="space-y-4">
            <p className="text-[#002e72] mb-2 font-GmarketMedium">새 회장</p>
            <div className="flex space-x-2">
              <input
                type="text"
                name="studentNum"
                placeholder="학번"
                value={newPresident.studentNum}
                onChange={(e) => {
                  setNewPresident({ ...newPresident, studentNum: e.target.value });
                }}
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
              />
              <input
                type="text"
                name="name"
                placeholder="이름"
                value={newPresident.name}
                onChange={(e) => {
                  setNewPresident({ ...newPresident, name: e.target.value });
                }}
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
