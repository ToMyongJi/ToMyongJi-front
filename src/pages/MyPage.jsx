import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useStudentClubStore from "../store/studentClubStore";
import useCollegeStore from "../store/collegeStore";
import useAuthStore from "../store/authStore";
import useUserStore from "../store/userStore";
import { fetchMyInfo, deleteAccount } from "../utils/authApi";
import { fetchAllColleges, fetchAllClubs } from "../utils/receiptApi";
import {
  deleteClubMember,
  addClubMember,
  fetchClubMembers,
} from "../utils/studentClubMemberApi";

const MyPage = () => {
  const navigate = useNavigate();

  const { authData } = useAuthStore();
  const clearAuthData = useAuthStore((s) => s.clearAuthData);
  const clearUser = useUserStore((state) => state.clearUser);

  const [role, setRole] = useState("");
  const [loginUserId, setLoginUserId] = useState("");
  const { getClubNameById, currentClub, setCurrentClub, fetchClubs } =
    useStudentClubStore();
  const { colleges, setColleges } = useCollegeStore();
  const [userCollege, setUserCollege] = useState("");
  const [userInfo, setUserInfo] = useState({
    name: "",
    studentNum: "",
    college: "",
    studentClubId: "",
  });
  const [clubName, setClubName] = useState("");
  const [decodedToken, setDecodedToken] = useState({});
  const [newMember, setNewMember] = useState({
    presidentUserId: loginUserId,
    studentNum: "",
    name: "",
  });
  const [currentUserClub, setCurrentUserClub] = useState(null);
  const [clubMembers, setClubMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (authData && authData.accessToken) {
      try {
        const decoded = JSON.parse(atob(authData.accessToken.split(".")[1]));
        setDecodedToken(decoded);
        setLoginUserId(decoded.id);
      } catch (error) {
        console.error("토큰 디코딩 실패:", error);
      }
    }
  }, [authData]);

  useEffect(() => {
    const loadMembers = async () => {
      if (loginUserId) {
        try {
          setIsLoading(true);
          const responseData = await fetchClubMembers(loginUserId);
          if (responseData && Array.isArray(responseData)) {
            const newMembers = responseData.map((member) => ({
              memberId: member.memberId || "",
              name: member.name || "",
              studentNum: member.studentNum || "",
            }));
            setClubMembers(newMembers);
          } else {
            console.error("Invalid response structure:", responseData);
            setClubMembers([]);
          }
        } catch (error) {
          console.error("소속 부원 조회 실패:", error);
          setClubMembers([]);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadMembers();
  }, [loginUserId]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (authData && authData.accessToken) {
        try {
          const decoded = JSON.parse(atob(authData.accessToken.split(".")[1]));
          if (decoded && decoded.id) {
            setRole(decoded.auth || "");
            setLoginUserId(decoded.id);

            const info = await fetchMyInfo(decoded.id, authData.accessToken);
            if (info) {
              setUserCollege(info.data.college || "");
              const newUserInfo = {
                name: info.data.name || "",
                studentNum: info.data.studentNum || "",
                college: info.data.college || "",
                studentClubId: info.data.studentClubId || "",
              };
              setUserInfo(newUserInfo);

              if (info.data.studentClubId) {
                await fetchClubs();
                const name = getClubNameById(info.data.studentClubId);
                setClubName(name || "");
                setCurrentClub(info.data.studentClubId);

                try {
                  setIsLoading(true);
                  const membersResponse = await fetchClubMembers(decoded.id);
                  if (
                    membersResponse?.statusCode === 200 &&
                    Array.isArray(membersResponse.data)
                  ) {
                    const newClubMembers = membersResponse.data.map(
                      (member) => ({
                        memberId: member.memberId || "",
                        studentNum: member.studentNum || "",
                        name: member.name || "",
                      })
                    );
                    setClubMembers(newClubMembers);
                  }
                } catch (error) {
                  console.error("소속 부원 조회 실패:", error);
                  setClubMembers([]);
                } finally {
                  setIsLoading(false);
                }
              }
            }
          }
        } catch (error) {
          console.error("사용자 정보 조회 실패:", error);
          setIsLoading(false);
        }
      }
    };

    fetchUserInfo();
  }, [authData]);

  useEffect(() => {
    if (currentClub) {
      setClubName(currentClub.studentClubName || "");
    }
  }, [currentClub]);

  useEffect(() => {
    if (userInfo && userInfo.studentClubId) {
      const name = getClubNameById(userInfo.studentClubId) || "";
      setClubName(name);
    }
  }, [userInfo, getClubNameById]);

  useEffect(() => {
    const loadColleges = async () => {
      try {
        const collegeData = await fetchAllColleges();
        setColleges(collegeData);
      } catch (error) {
        console.error("대학 정보를 불러오는 데 실패했습니다:", error);
      }
    };
    if (colleges.length === 0) {
      loadColleges();
    }
  }, [colleges.length, setColleges]);

  useEffect(() => {
    const fetchClubData = async () => {
      if (userInfo && userInfo.studentClubId) {
        try {
          const clubData = await fetchAllClubs();
          const matchingClub = clubData.find(
            (club) => club.studentClubId === userInfo.studentClubId
          );
          if (matchingClub) {
            setCurrentUserClub(matchingClub);
          } else {
            console.error("일치하는 학생회를 찾을 수 없습니다.");
          }
        } catch (error) {
          console.error("학생회 정보 조회 실패:", error);
        }
      }
    };

    fetchClubData();
  }, [userInfo]);

  const getKoreanRole = (role) => {
    const roleMap = {
      STU: "소속원",
      PRESIDENT: "회장",
    };

    return roleMap[role] || role;
  };

  const handleAddMember = async (e) => {
    e.preventDefault();

    if (isAdding) return;

    if (!loginUserId || !newMember.studentNum || !newMember.name) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    setIsAdding(true);
    try {
      const requestData = {
        id: parseInt(loginUserId),
        studentNum: newMember.studentNum,
        name: newMember.name,
      };

      const response = await addClubMember(requestData);
      if (response.statusCode === 201) {
        setNewMember({ studentNum: "", name: "" });

        // 소속원 목록 새로고침
        const membersResponse = await fetchClubMembers(loginUserId);
        if (membersResponse && Array.isArray(membersResponse)) {
          const newMembers = membersResponse.map((member) => ({
            memberId: member.memberId || "",
            name: member.name || "",
            studentNum: member.studentNum || "",
          }));
          setClubMembers(newMembers);
        }

        alert("정상적으로 소속원이 추가되었습니다.");
      } else {
        throw new Error(
          response.statusMessage || "소속원 추가에 실패했습니다."
        );
      }
    } catch (error) {
      console.error("멤버 추가 중 오류 발생:", error);
      alert(
        error.response?.data?.message || "소속원 추가 중 오류가 발생했습니다."
      );
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteMember = async (studentNum) => {
    if (!window.confirm("정말로 삭제하시겠습니까?")) return;
    try {
      const memberToDelete = clubMembers.find(
        (member) => member.studentNum === studentNum
      );
      if (!memberToDelete) return;

      await deleteClubMember(memberToDelete.studentNum);

      const membersResponse = await fetchClubMembers(loginUserId);
      if (membersResponse && Array.isArray(membersResponse)) {
        const newMembers = membersResponse.map((member) => ({
          memberId: member.memberId || "",
          name: member.name || "",
          studentNum: member.studentNum || "",
        }));
        setClubMembers(newMembers);
      }

      alert("정상적으로 소속원이 삭제되었습니다.");
    } catch (error) {
      alert("소속원 삭제 중 오류가 발생했습니다.");
    }
  };

  const handleDeleteAccount = async () => {
    if (isDeleting) return;

    const ok = window.confirm(
      "작성하신 장부 내역은 보존되며, 모든 회원 정보가 삭제됩니다.\n정말 탈퇴하시겠어요?"
    );
    if (!ok) return;

    setIsDeleting(true);
    try {
      const res = await deleteAccount();

      // 성공 기준은 서버 응답 형태에 따라 조정 가능
      const success =
        res?.statusCode === 200 || res?.statusCode === 0 || res?.status === 200;

      if (!success) {
        throw new Error(res?.statusMessage || "회원탈퇴에 실패했습니다.");
      }

      // 1) 로컬 스토리지 정리 (persist 키들)
      try {
        localStorage.removeItem("auth-storage");
        localStorage.removeItem("user-storage");
      } catch (_) {}

      // 2) zustand 스토어 정리
      clearAuthData();
      clearUser();

      alert("회원탈퇴가 완료되었습니다.");

      // 3) 홈으로 이동
      navigate("/", { replace: true });
    } catch (e) {
      console.error("회원탈퇴 실패:", e);
      alert(
        e?.response?.data?.message ||
          e?.message ||
          "회원탈퇴 중 오류가 발생했습니다."
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-[600px] min-h-screen mx-auto bg-white flex flex-col">
      <Header />
      <div
        className="flex flex-col items-center justify-center px-4 sm:px-20 py-10 mt-3 font-GmarketLight text-[10px] sm:text-[12px]">
        {/* 내 정보 관리  */}
        <div className="w-full p-4 sm:p-6 rounded-md shadow-[0_0_10px_#CED3FF] mb-6">
          <h2 className="font-GmarketMedium text-[#002e72] text-[15px] sm:text-[18px] mb-4">
            내 정보
          </h2>
          <form className="space-y-5">
            <div className="flex flex-wrap items-center">
              <label className="w-full sm:w-[100px] text-[#002e72] mb-2 sm:mb-0">
                이름
              </label>
              <input
                role="text"
                value={userInfo.name ?? ""}
                readOnly
                className="w-full sm:w-[calc(100%-100px)] p-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
              />
            </div>
            <div className="flex flex-wrap items-center">
              <label className="w-full sm:w-[100px] text-[#002e72] mb-2 sm:mb-0">
                학번
              </label>
              <input
                role="text"
                value={userInfo.studentNum ?? ""}
                readOnly
                className="w-full sm:w-[calc(100%-100px)] p-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
              />
            </div>
            <div className="flex flex-wrap items-center">
              <label className="w-full sm:w-[100px] text-[#002e72] mb-2 sm:mb-0">
                대학
              </label>
              <input
                role="text"
                value={userCollege ?? ""}
                readOnly
                className="w-full sm:w-[calc(100%-100px)] p-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
              />
            </div>

            <div className="flex flex-wrap items-center">
              <label className="w-full sm:w-[100px] text-[#002e72] mb-2 sm:mb-0">
                소속 이름
              </label>
              <input
                role="text"
                value={clubName ?? ""}
                readOnly
                className="w-full sm:w-[calc(100%-100px)] p-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
              />
            </div>
            <div className="flex flex-wrap items-center">
              <label className="w-full sm:w-[100px] text-[#002e72] mb-2 sm:mb-0">
                자격
              </label>
              <input
                role="text"
                value={decodedToken ? getKoreanRole(role) : ""}
                readOnly
                className="w-full sm:w-[calc(100%-100px)] p-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
              />
            </div>
          </form>
        </div>

        {/* 소속 관리 박스(회장만 보임) */}
        {getKoreanRole(role) === "회장" && currentUserClub && (
          <div className="w-full p-4 sm:p-6 rounded-md shadow-[0_0_10px_#CED3FF] mt-5 mb-10">
            <h2 className="font-GmarketMedium text-[#002e72] text-[15px] sm:text-[18px] mb-4">
              소속 관리
            </h2>
            <div className="flex flex-wrap items-center mb-4">
              <label className="w-full sm:w-[100px] text-[#002e72] mb-2 sm:mb-0">
                소속 이름
              </label>
              <input
                role="text"
                value={currentUserClub?.studentClubName ?? ""}
                readOnly
                className="w-full sm:w-[calc(100%-100px)] p-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
              />
            </div>
            <form onSubmit={handleAddMember} className="mb-4">
              <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                <input
                  role="text"
                  placeholder="학번"
                  value={newMember.studentNum ?? ""}
                  onChange={(e) =>
                    setNewMember({...newMember, studentNum: e.target.value})
                  }
                  className="w-full sm:flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
                />
                <input
                  role="text"
                  placeholder="이름"
                  value={newMember.name ?? ""}
                  onChange={(e) =>
                    setNewMember({...newMember, name: e.target.value})
                  }
                  className="w-full sm:flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
                />
                <button
                  role="submit"
                  disabled={isAdding}
                  className="w-full sm:w-auto px-3 py-2 text-[#061E5B] rounded-md shadow-[0_0_10px_#CED3FF] hover:shadow-[0_0_15px_#A0A9FF] border-none cursor-pointer transition duration-300"
                >
                  <span className="inline sm:inline">
                    {isAdding ? "처리중..." : "추가"}
                  </span>
                </button>
              </div>
            </form>
            <div className="space-y-2">
              {isLoading ? (
                <p className="text-center">로딩 중...</p>
              ) : clubMembers.length > 0 ? (
                clubMembers.map((member) => (
                  <div
                    key={member.memberId}
                    className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2"
                  >
                    <input
                      role="text"
                      value={member.studentNum ?? ""}
                      readOnly
                      className="w-full p-2 bg-gray-100 border rounded-lg sm:flex-1"
                    />
                    <input
                      role="text"
                      value={member.name ?? ""}
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
                ))
              ) : (
                <p className="text-center text-gray-500">
                  소속 부원이 없습니다.
                </p>
              )}
            </div>
          </div>

        )}
        {getKoreanRole(role) === "회장" && (<button
          role="submit"
          onClick={() => navigate("/club-handover", {state: {clubName: currentUserClub?.studentClubName ?? "", clubId: userInfo.studentClubId ?? ""}})}
          className="w-full sm:w-auto px-3 py-2 text-[#061E5B] rounded-md shadow-[0_0_10px_#CED3FF] hover:shadow-[0_0_15px_#A0A9FF] border-none cursor-pointer transition duration-300"
        >
                  <span className="inline sm:inline">
                    학생회 이전
                  </span>
        </button>)}
        <button
          onClick={handleDeleteAccount}
          disabled={isDeleting}
          className="mt-6 px-6 py-2 font-GmarketMedium text-[#F44336] ${isDeleting ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}"
        >
          {isDeleting ? "처리중…" : "회원탈퇴"}
        </button>
      </div>
      <Footer/>
    </div>
  );
};

export default MyPage;
