import api, { API_BASE_URL } from './api';
import useAuthStore from '../store/authStore';

// 로그인
export const loginUser = async (userId, password) => {
  try {
    const response = await api.post(`${API_BASE_URL}/api/users/login`, { userId, password });
    const { grantType, accessToken, refreshToken } = response.data.data;

    useAuthStore.getState().setAuthData({ grantType, accessToken, refreshToken });

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
      alert('회원가입에 실패했습니다. 입력 를 확인해주세요.');
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
    console.error('아이디 중복 확인 실패:', error);
    throw error;
  }
};

// 이메일 인증코드 발송
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

// 아이디 찾기
export const findUserId = async (email) => {
  try {
    const response = await api.post(`${API_BASE_URL}/api/users/find-id`, { email });
    return response.data; // 서버에서 반환된 아이디 문자
  } catch (error) {
    console.error('아이디 찾기 요청 실패:', error);
    if (error.response) {
      switch (error.response.status) {
        case 401:
          throw new Error('인증이 필요합니다. 다시 로그인해주세요.');
        case 404:
          throw new Error('해당 이메일로 등록된 아이디가 없습니다.');
        default:
          throw new Error('아이디 찾기에 실패했습니다. 다시 시도해주세요.');
      }
    } else {
      throw new Error('네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.');
    }
  }
};

// 내정보 조회
export const fetchMyInfo = async (userId) => {
  try {
    const response = await api.get(`${API_BASE_URL}/api/my/${userId}`);
    return response.data;
  } catch (error) {
    console.error('내정보 조회 실패:', error);
    throw error;
  }
};

// 소속 인증
export const verifyClubMembership = async (clubId, studentNum) => {
  try {
    const response = await api.get(`${API_BASE_URL}/api/users/clubVerify/${clubId}/${studentNum}`);
    return response.data;
  } catch (error) {
    console.error('소속 인증 실패:', error);
  }
};
