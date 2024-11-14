import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import useUserStore from '../store/userStore';
import useAuthStore from '../store/authStore';

const ProtectedRoute = ({ children }) => {
  const { user } = useUserStore();
  const { authData } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    // console.log('인증 데이터:', authData);
    if (!authData || !authData.accessToken) {
      // console.log('유효한 인증 데이터가 없습니다. /not-login으로 리다이렉트합니다.');
      navigate('/not-login');
    } else {
      // console.log('유효한 인증 데이터가 확인되었습니다. 액세스 토큰:', authData.accessToken);
    }
  }, [authData, navigate]);

  // console.log('사용자 정보:', user);

  if (!user) {
    // console.log('사용자 정보가 없습니다. /not-login으로 리다이렉트합니다.');
    return <Navigate to="/not-login" />;
  }

  // console.log('사용자가 인증되었습니다. 자식 컴포넌트를 렌더링합니다.');
  return children;
};

export default ProtectedRoute;
