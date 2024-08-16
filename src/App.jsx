import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import useUserStore from './store/userStore';
import useAuthStore from './store/authStore';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import MyPage from './pages/MyPage';
import Find from './pages/login/Find';
import Login from './pages/login/Login';
import SignUp from './pages/login/SignUp';
import ReceiptsList from './pages/receipt/ReceiptsList';
import CreateReceipt from './pages/receipt/CreateReceipt';
import NotLogin from './pages/NotLogin';

const App = () => {
  const { user, setUser } = useUserStore();
  const { authData } = useAuthStore();

  useEffect(() => {
    if (authData && !user) {
      // authData를 사용해서 사용자 정보 설정
      const { accessToken } = authData;
      if (accessToken) {
        try {
          const decodedToken = JSON.parse(atob(accessToken.split('.')[1]));
          setUser({
            id: decodedToken.id,
            role: decodedToken.auth,
            userId: decodedToken.sub,
          });
        } catch (error) {
          console.error('토큰 디코딩 오류:', error);
        }
      }
    }
  }, [authData, user, setUser]);

  return (
    <div className="w-[100vw] h-[auto] bg-gray-100">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/find" element={<Find />} />
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
        <Route path="/not-login" element={<NotLogin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
