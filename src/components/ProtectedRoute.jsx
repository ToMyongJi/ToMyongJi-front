import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import useUserStore from '../store/userStore';
import useAuthStore from '../store/authStore';

const ProtectedRoute = ({ children }) => {
  const { user, setUser } = useUserStore();
  const { accessToken } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      setUser(accessToken);
    } else {
      navigate('/not-login');
    }
  }, [accessToken, setUser, navigate]);

  if (!user) {
    return <Navigate to="/not-login" />;
  }

  return children;
};

export default ProtectedRoute;
