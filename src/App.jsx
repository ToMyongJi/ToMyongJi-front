import { useEffect, useCallback } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import useUserStore from "./store/userStore";
import useAuthStore from "./store/authStore";
import { Analytics } from "@vercel/analytics/react";

import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import MyPage from "./pages/MyPage";
import Find from "./pages/login/Find";
import Login from "./pages/login/Login";
import SignUp from "./pages/login/SignUp";
import ReceiptsList from "./pages/receipt/ReceiptsList";
import CreateReceipt from "./pages/receipt/CreateReceipt";
import NotLogin from "./pages/NotLogin";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Admin from "./pages/admin/Admin";
import HomeAdmin from "./pages/admin/HomeAdmin";
import UploadCSVReceipt from "./pages/receipt/UploadCSVReceipt";
import UploadTossReceipt from "./pages/receipt/UploadTossReceipt";
import Maintenance from "./pages/Maintenance";

const App = () => {
  const { user, setUser, clearUser } = useUserStore();
  const { authData, clearAuthData } = useAuthStore();
  const navigate = useNavigate();

  const checkTokenExpiration = useCallback(() => {
    if (authData?.accessToken) {
      try {
        const decodedToken = JSON.parse(
          atob(authData.accessToken.split(".")[1])
        );
        const currentTime = Math.floor(Date.now() / 1000); // 현재 시간을 초 단위로 변환

        if (decodedToken.exp && decodedToken.exp < currentTime) {
          // 토큰이 만료되었을 경우
          clearUser();
          clearAuthData();
          navigate("/login");
          alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
        }
      } catch (error) {
        console.error("토큰 검증 실패:", error);
      }
    }
  }, [authData, clearUser, clearAuthData, navigate]);

  useEffect(() => {
    // 최초 토큰 체크
    checkTokenExpiration();

    // 1분마다 토큰 만료 체크
    const intervalId = setInterval(checkTokenExpiration, 60000);

    return () => clearInterval(intervalId);
  }, [checkTokenExpiration]);

  useEffect(() => {
    if (authData && !user) {
      const { accessToken } = authData;
      if (accessToken) {
        try {
          const decodedToken = JSON.parse(atob(accessToken.split(".")[1]));
          setUser({
            id: decodedToken.id,
            role: decodedToken.auth,
            userId: decodedToken.sub,
          });
        } catch (error) {
          console.error("토큰 디코딩 오류:", error);
        }
      }
    }
  }, [authData, user, setUser]);

  // 점검 기간 설정
  const maintenanceStart = new Date("2025-09-27T00:00:00");
  const maintenanceEnd = new Date("2025-09-27T04:00:00");
  const now = new Date();
  const isMaintenance = now >= maintenanceStart && now <= maintenanceEnd;

  return (
    <div className="w-[100vw] h-[auto] bg-gray-100">
      <Routes>
        {isMaintenance ? (
          <Route path="*" element={<Maintenance />} />
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/find" element={<Find />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/not-login" element={<NotLogin />} />

            <Route path="/receipts-list/:clubId" element={<ReceiptsList />} />
            <Route
              path="/create-receipt"
              element={
                <ProtectedRoute>
                  <CreateReceipt />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-page"
              element={
                <ProtectedRoute>
                  <MyPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/:clubId"
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/home-admin"
              element={
                <ProtectedRoute>
                  <HomeAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/receipt/upload-csv"
              element={
                <ProtectedRoute>
                  <UploadCSVReceipt />
                </ProtectedRoute>
              }
            />
            <Route
              path="/receipt/upload-toss"
              element={
                <ProtectedRoute>
                  <UploadTossReceipt />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </>
        )}
      </Routes>
      <Analytics />
    </div>
  );
};

export default App;
