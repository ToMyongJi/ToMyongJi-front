import { useNavigate } from "react-router-dom";
import { useCallback, useState, useEffect } from "react";

import useAuthStore from "../../store/authStore";
import useUserStore from "../../store/userStore";
import { loginUser, fetchMyInfo } from "../../utils/authApi";

import Header from "../../components/Header";

import logo from "../../assets/images/logo.png";

const Login = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const setAuthData = useAuthStore((state) => state.setAuthData);
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);
  const authData = useAuthStore((state) => state.authData);

  useEffect(() => {
    const savedUserId = localStorage.getItem("rememberedUserId");
    if (savedUserId) {
      setUserId(savedUserId);
      setRememberMe(true);
    }

    // 토큰 정보 출력
    if (authData && authData.accessToken) {
      try {
        const decodedAccessToken = JSON.parse(
          atob(authData.accessToken.split(".")[1])
        );
        // console.log('authData', authData);
        // console.log('decodedAccessToken', decodedAccessToken);
        if (authData.refreshToken) {
          const decodedRefreshToken = JSON.parse(
            atob(authData.refreshToken.split(".")[1])
          );
          // console.log('decodedRefreshToken', decodedRefreshToken);
        }
      } catch (error) {
        console.error("토큰 디코딩 실패:", error);
      }
    }
  }, [authData]);

  const handleOnClick = useCallback(
    (path) => {
      return () => navigate(path);
    },
    [navigate]
  );

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      clearUser();

      const response = await loginUser(userId, password);
      const { grantType, accessToken, refreshToken } = response.data;

      // 토큰 설정
      setAuthData(grantType, accessToken, refreshToken);

      // 토큰이 저장될 때까지 잠시 대기
      await new Promise((resolve) => setTimeout(resolve, 100));

      const decodedToken = JSON.parse(atob(accessToken.split(".")[1]));
      const { id, auth: role, sub: userIdFromToken } = decodedToken;

      // 토큰을 직접 전달하여 API 호출
      const userInfoResponse = await fetchMyInfo(id, accessToken);

      if (!userInfoResponse.data) {
        throw new Error("사용자 정보를 가져오는데 실패했습니다.");
      }

      const userData = {
        id,
        role,
        userId: userIdFromToken,
        name: userInfoResponse.data.name,
        studentNum: userInfoResponse.data.studentNum,
        college: userInfoResponse.data.college,
        studentClubId: userInfoResponse.data.studentClubId,
      };

      setUser(userData);

      if (rememberMe) {
        localStorage.setItem("rememberedUserId", userId);
      } else {
        localStorage.removeItem("rememberedUserId");
      }

      if (role === "ADMIN") {
        navigate("/home-admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="max-w-[600px] min-h-screen mx-auto bg-white flex flex-col">
      <Header />
      <div className="flex items-center justify-center px-4 sm:px-20 py-10 mt-5 font-GmarketLight text-[12px] sm:text-[13px]">
        <form
          onSubmit={handleLogin}
          className="w-full sm:w-auto flex flex-col items-center px-[15px] py-4 rounded-md shadow-[0_0_10px_#CED3FF]"
        >
          <img src={logo} alt="로고" className="hidden sm:block w-[50%] mb-6" />
          <input
            type="text"
            placeholder="아이디"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="text-[#002e72] p-3 mb-4 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-[#002e72] p-3 mb-4 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
          />
          <button
            type="submit"
            className="w-full py-3 mb-4 text-[#002e72] bg-[#CED3FF] border-none rounded shadow-[0_4px_6px_rgba(156,163,255,0.5)] hover:shadow-[0_6px_8px_rgba(156,163,255,0.7)] transition-shadow duration-300"
          >
            로그인
          </button>
          <div className="flex justify-between w-full mb-4">
            <label className="flex items-center text-[#002e72]">
              <input
                type="checkbox"
                className="mr-1 accent-[#CED3FF]"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              아이디 저장
            </label>
            <button
              type="button"
              className="text-[#002e72] hover:text-[#CED3FF] transition duration-300"
              onClick={handleOnClick("/find")}
            >
              아이디 찾기
            </button>
          </div>
          <button
            type="button"
            className="text-[#002e72] hover:text-[#CED3FF] transition duration-300"
            onClick={handleOnClick("/sign-up")}
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
