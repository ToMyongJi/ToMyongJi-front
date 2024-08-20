import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const Callback = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const code = new URL(window.location.href).searchParams.get('code');
  const { login } = useAuth();

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const kakaoLogin = async () => {
      try {
        const response = await axios({
          method: 'GET',
          url: `${API_BASE_URL}/auth/kakao/callback`,
          params: {
            code: code,
            redirect_uri: 'https://perfect-form-chi.vercel.app/',
          },
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
        });

        if (response.data.accessToken) {
          login(response.data.accessToken);
          setIsLoading(false);
          navigate('/');
        } else {
          throw new Error('액세스 토큰을 받지 못했습니다.');
        }
      } catch (error) {
        console.error('로그인 중 오류 발생:', error);
        setError('로그인 처리 중 오류가 발생했습니다.');
        setIsLoading(false);
      }
    };

    if (code) {
      kakaoLogin();
    } else {
      setError('인증 코드를 찾을 수 없습니다.');
      setIsLoading(false);
    }
  }, [code, navigate, login]);

  if (error) {
    return (
      <div className="LoginHandler">
        <div className="notice">
          <p>오류: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="LoginHandler">
      <div className="notice">
        <p>로그인 중입니다.</p>
        <p>잠시만 기다려주세요.</p>
        {isLoading && <div className="spinner"></div>}
      </div>
    </div>
  );
};

export default Callback;
