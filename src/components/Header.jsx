import { useNavigate } from "react-router-dom";
import { useCallback, useState, useEffect, useRef } from "react";
import useUserStore from "../store/userStore";
import useAuthStore from "../store/authStore";
import useCollegeStore from "../store/collegeStore";
import { fetchAllColleges } from "../utils/receiptApi";
import logo from "../assets/images/logo.png";
import buttonBackground from "../assets/images/buttonBackground.png";

const Header = () => {
  const navigate = useNavigate();
  const [showQueryDropdown, setShowQueryDropdown] = useState(false);
  const [showAdminDropdown, setShowAdminDropdown] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState(null);

  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);
  const clearAuthData = useAuthStore((state) => state.clearAuthData);
  const { colleges, setColleges } = useCollegeStore();

  useEffect(() => {
    const loadColleges = async () => {
      try {
        const collegesData = await fetchAllColleges();
        setColleges(collegesData);
      } catch (error) {
        console.error("대학 정보를 불러오는데 실패했습니다:", error);
      }
    };
    loadColleges();
  }, [setColleges]);

  const handleOnClick = useCallback(
    (path) => {
      return () => {
        if (user && user.role === "ADMIN" && path === "/") {
          navigate("/home-admin");
        } else {
          navigate(path);
        }
      };
    },
    [navigate, user]
  );

  const handleLogout = () => {
    clearUser();
    clearAuthData();
    navigate("/login");
    alert("로그아웃 되었습니다");
  };

  const handleCreateReceipt = () => {
    if (user) {
      navigate("/create-receipt");
    } else {
      navigate("/not-login");
    }
  };

  const handleMyPage = () => {
    if (user) {
      navigate("/my-page");
    } else {
      navigate("/not-login");
    }
  };

  const handleAdminQuery = () => {
    setShowAdminDropdown(!showAdminDropdown);
    setShowQueryDropdown(false);
  };

  const handleQueryClick = () => {
    setShowQueryDropdown(!showQueryDropdown);
    setShowAdminDropdown(false);
  };

  const dropdownRef = useRef(null);

  // ✅ 바깥 클릭 시 닫기 (조회/관리자 둘 다 대응)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(e.target)) {
        setShowQueryDropdown(false);
        setShowAdminDropdown(false);
        setShowSubMenu(false);
        setSelectedCollege(null);
      }
    };

    const isAnyDropdownOpen = showQueryDropdown || showAdminDropdown;
    if (isAnyDropdownOpen) {
      // 보통 mousedown/pointerdown이 click보다 “즉시” 닫혀서 UX가 좋아요
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showQueryDropdown, showAdminDropdown]);

  return (
    <div className="flex flex-col items-center justify-center p-[10px]">
      {/* 로고 */}
      <button className="w-60 sm:w-80" onClick={handleOnClick("/")}>
        <img src={logo} alt="투명지 로고 이미지" />
      </button>
      {/* 로그인/로그아웃 버튼 */}
      <div className="w-[100%] flex justify-end items-center py-[10px] mb-4">
        <button
          className="w-[104px] sm:w-[110px] h-[35px] sm:h-[40px] bg-no-repeat bg-cover flex items-center justify-center relative"
          style={{ backgroundImage: `url(${buttonBackground})` }}
          onClick={user ? handleLogout : handleOnClick("/login")}
        >
          <span className="hover:text-[#CED3FF] transition duration-300 z-10 text-[#002e72] font-GmarketLight text-[11px] sm:text-xs">
            {user ? "로그아웃" : "로그인"}
          </span>
        </button>
      </div>
      {/* 네비바 */}
      <div className="text-sm sm:text-[16px] text-[#002D72] flex items-center justify-evenly font-GmarketLight w-[100%] border-t border-[#4E67EC] border-b py-1 sm:py-3">
        <div className="relative" ref={dropdownRef}>
          <button
            className="px-2 py-3 hover:font-GmarketMedium transition duration-300 border-b-2 border-transparent hover:border-[#002D72]"
            onClick={handleQueryClick}
          >
            조회
          </button>
          {showQueryDropdown && (
            <div className="px-3 py-2 text-[7.5px] sm:text-[13px] absolute sm:left-[-63px] left-[-30px] mt-2 sm:w-[500px] w-[320px] bg-[#F5F8FF] rounded-md shadow-lg z-50 flex">
              <ul className="w-1/2">
                {colleges?.map((college) => (
                  <li
                    key={college.collegeId}
                    className={`px-4 py-2 cursor-pointer text-[#002D72] font-GmarketLight transition duration-300 ${
                      selectedCollege === college.collegeId
                        ? "bg-[#CED3FF] font-GmarketMedium"
                        : "hover:bg-[#CED3FF] hover:font-GmarketMedium"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCollege(college.collegeId);
                      setShowSubMenu(true);
                    }}
                  >
                    {college.collegeName}
                  </li>
                ))}
              </ul>
              <div className="w-px bg-[#A0B0FF] my-2"></div>
              {showSubMenu && selectedCollege && (
                <ul className="w-1/2">
                  {colleges
                    .find((c) => c.collegeId === selectedCollege)
                    .clubs.map((club) => (
                      <li
                        key={club.studentClubId}
                        className={`px-4 py-2 cursor-pointer text-[#002D72] font-GmarketLight transition duration-300 hover:bg-[#CED3FF] hover:font-GmarketMedium`}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/receipts-list/${club.studentClubId}`, {
                            state: { clubName: club.studentClubName },
                          });
                          setShowQueryDropdown(false);
                          setShowSubMenu(false);
                        }}
                      >
                        {club.studentClubName}
                      </li>
                    ))}
                </ul>
              )}
            </div>
          )}
        </div>
        {user && user.role === "ADMIN" && (
          <div className="relative">
            <button
              className="px-2 py-3 hover:font-GmarketMedium transition duration-300 border-b-2 border-transparent hover:border-[#002D72]"
              onClick={handleAdminQuery}
            >
              학생회 정보 관리
            </button>
            {showAdminDropdown && (
              <div className="px-3 py-2 text-[7.5px] sm:text-[13px] absolute sm:left-[-63px] left-[-30px] mt-2 sm:w-[500px] w-[320px] bg-[#F5F8FF] rounded-md shadow-lg z-50 flex">
                <ul className="w-1/2">
                  {colleges?.map((college) => (
                    <li
                      key={college.collegeId}
                      className={`px-4 py-2 cursor-pointer text-[#002D72] font-GmarketLight transition duration-300 ${
                        selectedCollege === college.collegeId
                          ? "bg-[#CED3FF] font-GmarketMedium"
                          : "hover:bg-[#CED3FF] hover:font-GmarketMedium"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCollege(college.collegeId);
                        setShowSubMenu(true);
                      }}
                    >
                      {college.collegeName}
                    </li>
                  ))}
                </ul>
                <div className="w-px bg-[#A0B0FF] my-2"></div>
                {showSubMenu && selectedCollege && (
                  <ul className="w-1/2">
                    {colleges
                      .find((c) => c.collegeId === selectedCollege)
                      .clubs.map((club) => (
                        <li
                          key={club.studentClubId}
                          className={`px-4 py-2 cursor-pointer text-[#002D72] font-GmarketLight transition duration-300 hover:bg-[#CED3FF] hover:font-GmarketMedium`}
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/admin/${club.studentClubId}`);
                            setShowAdminDropdown(false);
                            setShowSubMenu(false);
                          }}
                        >
                          {club.studentClubName}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        )}
        {user?.role !== "ADMIN" && (
          <>
            <button
              className="px-2 py-3 hover:font-GmarketMedium transition duration-300 border-b-2 border-transparent hover:border-[#002D72]"
              onClick={handleCreateReceipt}
            >
              작성
            </button>
            <button
              className="px-2 py-3 hover:font-GmarketMedium transition duration-300 border-b-2 border-transparent hover:border-[#002D72]"
              onClick={handleMyPage}
            >
              마이
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
