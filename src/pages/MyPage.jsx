import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useStudentClubStore from '../store/studentClubStore';
import useCollegeStore from '../store/collegeStore';
import useAuthStore from '../store/authStore';
import { fetchMyInfo } from '../utils/authApi';
import { fetchAllColleges, fetchClubById, fetchAllClubs } from '../utils/receiptApi';
import { deleteClubMember } from '../utils/studentClubMemberApi';

const MyPage = () => {
  const { authData } = useAuthStore();
  const [role, setRole] = useState('');
  const [loginUserId, setLoginUserId] = useState('');
  const { getClubNameById, currentClub, setCurrentClub, fetchClubMembers, addMember, deleteMember, fetchClubs } =
    useStudentClubStore();
  const { colleges, setColleges } = useCollegeStore();
  const [userCollege, setUserCollege] = useState('');
  const [userInfo, setUserInfo] = useState({});
  const [clubName, setClubName] = useState('');
  const [decodedToken, setDecodedToken] = useState({});
  const [newMember, setNewMember] = useState({ studentNum: '', name: '' });
  const [currentUserClub, setCurrentUserClub] = useState(null);

  useEffect(() => {
    if (authData && authData.accessToken) {
      try {
        const decoded = JSON.parse(atob(authData.accessToken.split('.')[1]));
        setDecodedToken(decoded);
      } catch (error) {
        console.error('토큰 디코딩 실패:', error);
      }
    }
  }, [authData]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      // console.log('디코딩된 토큰:', decodedToken);
      if (authData && authData.accessToken) {
        try {
          const decoded = JSON.parse(atob(authData.accessToken.split('.')[1]));
          // console.log('새로 디코딩된 토큰:', decoded);
          if (decoded && decoded.id) {
            setRole(decoded.auth || '');
            setLoginUserId(decoded.id);
            try {
              const info = await fetchMyInfo(decoded.id);
              setUserCollege(info.college);
              setUserInfo({
                name: info.name,
                studentNum: info.studentNum,
                college: info.collegeName,
                studentClubId: info.studentClubId,
              });
              if (info.studentClubId) {
                await fetchClubs();
                const name = getClubNameById(info.studentClubId) || '';
                setClubName(name);
                setCurrentClub(info.studentClubId);
                fetchClubMembers(decoded.id);
              }
            } catch (error) {
              console.error('사용자 정보 조회 실패:', error);
            }
          } else {
            console.error('디코딩된 토큰에 유효한 사용자 ID가 없습니다.');
          }
        } catch (error) {
          console.error('토큰 디코딩 실패:', error);
        }
      } else {
        console.error('유효한 액세스 토큰이 없습니다.');
      }
    };

    fetchUserInfo();
  }, [authData, getClubNameById, setCurrentClub, fetchClubMembers, fetchClubs]);

  useEffect(() => {
    if (currentClub) {
      setClubName(currentClub.studentClubName || '');
    }
  }, [currentClub]);

  useEffect(() => {
    if (userInfo && userInfo.studentClubId) {
      const name = getClubNameById(userInfo.studentClubId) || '';
      setClubName(name);
    }
  }, [userInfo, getClubNameById]);

  useEffect(() => {
    const loadColleges = async () => {
      try {
        const collegeData = await fetchAllColleges();
        setColleges(collegeData);
      } catch (error) {
        console.error('대학 정보를 불러오는 데 실패했습니다:', error);
      }
    };
    if (colleges.length === 0) {
      loadColleges();
    }
  }, [colleges.length, setColleges]);

  useEffect(() => {
    if (authData && authData.id && authData.studentClubId) {
      setCurrentClub(authData.studentClubId);
      fetchClubMembers(authData.id);
    }
  }, [authData, setCurrentClub, fetchClubMembers]);

  useEffect(() => {
    const fetchClubData = async () => {
      if (userInfo && userInfo.studentClubId) {
        try {
          const clubData = await fetchAllClubs();
          const matchingClub = clubData.find((club) => club.id === userInfo.studentClubId);
          if (matchingClub) {
            setCurrentUserClub(matchingClub);
          } else {
            console.error('일치하는 학생회를 찾을 수 없습니다.');
          }
        } catch (error) {
          console.error('학생회 정보 조회 실패:', error);
        }
      }
    };

    fetchClubData();
  }, [userInfo]);

  const getKoreanRole = (role) => {
    const roleMap = {
      STU: '소속원',
      PRESIDENT: '회장',
    };

    return roleMap[role] || role;
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    if (loginUserId && newMember.studentNum && newMember.name) {
      try {
        await addMember(loginUserId, newMember);
        setNewMember({ studentNum: '', name: '' });
        await fetchClubMembers(loginUserId);
        const updatedClubData = await fetchClubById(userInfo.studentClubId);
        setCurrentUserClub(updatedClubData[0]);
        alert('정상적으로 소속원이 추가되었습니다.');

        const allClubsData = await fetchAllClubs();
        const updatedCurrentClub = allClubsData.find((club) => club.id === userInfo.studentClubId);
        if (updatedCurrentClub) {
          setCurrentUserClub(updatedCurrentClub);
        }
      } catch (error) {
        console.error('멤버 추가 중 오류 발생:', error);
        alert('소속원 추가 중 오류가 발생했습니다.');
      }
    } else {
      console.error('사용자 정보 또는 새 멤버 정보가 없습니다.');
      alert('사용자 정보 또는 새 멤버 정보가 없습니다.');
    }
  };

  const handleDeleteMember = async (studentNum) => {
    if (currentUserClub && currentUserClub.memberInfos) {
      const memberToDelete = currentUserClub.memberInfos.find((member) => member.studentNum === studentNum);
      if (memberToDelete) {
        try {
          await deleteClubMember(memberToDelete.id);

          const allClubsData = await fetchAllClubs();
          const updatedCurrentClub = allClubsData.find((club) => club.id === userInfo.studentClubId);
          if (updatedCurrentClub) {
            setCurrentUserClub(updatedCurrentClub);
          }

          alert('정상적으로 소속원이 삭제되��습니다.');
        } catch (error) {
          console.error('멤버 삭제 중 오류 발생:', error);
          alert('회원가입된 소속원은 삭제할 수 없습니다.');
        }
      } else {
        console.error('삭제할 멤버를 찾을 수 없습니다.');
        alert('삭제할 멤버를 찾을 수 없습니다.');
      }
    }
  };

  return (
    <div className="max-w-[600px] min-h-screen mx-auto bg-white flex flex-col">
      <Header />
      <div className="flex flex-col items-center justify-center px-4 sm:px-20 py-10 mt-3 font-GmarketLight text-[10px] sm:text-[12px]">
        {/* 내 정보 관리  */}
        <div className="w-full p-4 sm:p-6 rounded-md shadow-[0_0_10px_#CED3FF] mb-6">
          <h2 className="font-GmarketMedium text-[#002e72] text-[15px] sm:text-[18px] mb-4">내 정보</h2>
          <form className="space-y-5">
            <div className="flex flex-wrap items-center">
              <label className="w-full sm:w-[100px] text-[#002e72] mb-2 sm:mb-0">이름</label>
              <input
                role="text"
                value={userInfo.name || ''}
                readOnly
                className="w-full sm:w-[calc(100%-100px)] p-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
              />
            </div>
            <div className="flex flex-wrap items-center">
              <label className="w-full sm:w-[100px] text-[#002e72] mb-2 sm:mb-0">학번</label>
              <input
                role="text"
                value={userInfo.studentNum || ''}
                readOnly
                className="w-full sm:w-[calc(100%-100px)] p-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
              />
            </div>
            <div className="flex flex-wrap items-center">
              <label className="w-full sm:w-[100px] text-[#002e72] mb-2 sm:mb-0">대학</label>
              <input
                role="text"
                value={userCollege}
                readOnly
                className="w-full sm:w-[calc(100%-100px)] p-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
              />
            </div>

            <div className="flex flex-wrap items-center">
              <label className="w-full sm:w-[100px] text-[#002e72] mb-2 sm:mb-0">소속 이름</label>
              <input
                role="text"
                value={clubName || ''}
                readOnly
                className="w-full sm:w-[calc(100%-100px)] p-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
              />
            </div>
            <div className="flex flex-wrap items-center">
              <label className="w-full sm:w-[100px] text-[#002e72] mb-2 sm:mb-0">자격</label>
              <input
                role="text"
                value={decodedToken ? getKoreanRole(role) : ''}
                readOnly
                className="w-full sm:w-[calc(100%-100px)] p-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
              />
            </div>
          </form>
        </div>

        {/* 소속 관리 박스(회장만 보임) */}
        {getKoreanRole(role) === '회장' && currentUserClub && (
          <div className="w-full p-4 sm:p-6 rounded-md shadow-[0_0_10px_#CED3FF] mt-5 mb-10">
            <h2 className="font-GmarketMedium text-[#002e72] text-[15px] sm:text-[18px] mb-4">소속 관리</h2>
            <div className="flex flex-wrap items-center mb-4">
              <label className="w-full sm:w-[100px] text-[#002e72] mb-2 sm:mb-0">소속 이름</label>
              <input
                role="text"
                value={currentUserClub.studentClubName || ''}
                readOnly
                className="w-full sm:w-[calc(100%-100px)] p-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
              />
            </div>
            <form onSubmit={handleAddMember} className="mb-4">
              <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                <input
                  role="text"
                  placeholder="학번"
                  value={newMember.studentNum}
                  onChange={(e) => setNewMember({ ...newMember, studentNum: e.target.value })}
                  className="w-full sm:flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
                />
                <input
                  role="text"
                  placeholder="이름"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  className="w-full sm:flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
                />
                <button
                  role="submit"
                  className="w-full sm:w-auto px-3 py-2 text-[#061E5B] rounded-md shadow-[0_0_10px_#CED3FF] hover:shadow-[0_0_15px_#A0A9FF] border-none cursor-pointer transition duration-300"
                >
                  <span className="inline sm:inline">추가</span>
                </button>
              </div>
            </form>
            <div className="space-y-2">
              {currentUserClub.memberInfos &&
                currentUserClub.memberInfos.map((member) => (
                  <div key={member.id} className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                    <input
                      role="text"
                      value={member.studentNum}
                      readOnly
                      className="w-full p-2 bg-gray-100 border rounded-lg sm:flex-1"
                    />
                    <input
                      role="text"
                      value={member.name}
                      readOnly
                      className="w-full p-2 bg-gray-100 border rounded-lg sm:flex-1"
                    />
                    <button
                      onClick={() => handleDeleteMember(member.studentNum)}
                      className="w-full sm:w-auto px-3 py-2 text-[#061E5B] rounded-md shadow-[0_0_10px_#FF7B9B] hover:shadow-[0_0_20px_#FF4D7D] hover:bg-[#FFF0F5] border-none cursor-pointer transition duration-300"
                    >
                      <span className="inline sm:inline">삭제</span>
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
