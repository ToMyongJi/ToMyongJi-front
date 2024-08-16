import api, { API_BASE_URL } from './api';
import useAuthStore from '../store/authStore';

// 로그인
export const loginUser = async (userId, password) => {
  try {
    const response = await api.post(`${API_BASE_URL}/api/users/login`, { userId, password });
    console.log(response.data);

    const { grantType, accessToken, refreshToken } = response.data;
    useAuthStore.getState().setAuthData(grantType, accessToken, refreshToken);

    return response.data;
  } catch (error) {
    if (
      error.response &&
      error.response.status === 400 &&
      error.response.data.message === '자격 증명에 실패하였습니다.'
    ) {
      alert('아이디 또는 비밀번호를 확인해주세요.');
    } else {
      console.error('로그인 요청 실패:', error);
    }
    throw error;
  }
};

// 회원가입
export const signUpUser = async (userData) => {
  try {
    const response = await api.post(`${API_BASE_URL}/api/users/signup`, userData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      alert('회원가입에 실패했습니다. 입력 정보를 확인해주세요.');
    } else {
      console.error('회원가입 요청 실패:', error);
    }
    throw error;
  }
};

// 아이디 중복 확인
export const checkUserIdDuplicate = async (userId) => {
  try {
    const response = await api.get(`${API_BASE_URL}/api/users/${userId}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return { isDuplicate: false };
    } else {
      console.error('아이디 중복 확인 요청 실패:', error);
      throw error;
    }
  }
};

// 이메일 인증코드 ���송
export const sendEmailVerification = async (email) => {
  try {
    const response = await api.post(`${API_BASE_URL}/api/users/emailCheck`, { email });
    return response.data;
  } catch (error) {
    console.error('이메일 인증코드 발송 실패:', error);
    throw error;
  }
};

// 인증코드 확인
export const verifyEmailCode = async (email, code) => {
  try {
    const response = await api.post(`${API_BASE_URL}/api/users/verifyCode`, { email, code });
    return response.data;
  } catch (error) {
    console.error('인증코드 확인 실패:', error);
    throw error;
  }
};

// 유저 정보
export const fetchUserInfo = async (userId) => {
  const response = await api.get(`api/users/${userId}`);
  return response.data;
};
