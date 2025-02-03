import api from './api';

// 로그인
export const loginUser = async (userId, password) => {
  try {
    const response = await api.post('/api/users/login', { userId, password });
    return response.data;
  } catch (error) {
    console.error('로그인 요청 실패:', error);
    throw error;
  }
};

// 회원가입
export const signUpUser = async (userData) => {
  try {
    const response = await api.post('/api/users/signup', userData);
    return response.data;
  } catch (error) {
    if (error.response) {
      alert('회원가입에 실패했습니다. 입력을 확인해주세요.');
    } else {
      console.error('회원가입 요청 실패:', error);
    }
    throw error;
  }
};

// 아이디 중복 확인
export const checkUserIdDuplicate = async (userId) => {
  try {
    const response = await api.get(`/api/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('아이디 중복 확인 실패:', error);
    throw error;
  }
};

// 이메일 인증코드 발송
export const sendEmailVerification = async (email) => {
  try {
    const response = await api.post('/api/users/emailCheck', { email });
    return response.data;
  } catch (error) {
    console.error('이메일 인증코드 발송 실패:', error);
    throw error;
  }
};

// 인증코드 확인
export const verifyEmailCode = async (email, code) => {
  try {
    const response = await api.post('/api/users/verifyCode', { email, code });
    return response.data;
  } catch (error) {
    console.error('인증코드 확인 실패:', error);
    throw error;
  }
};

// 유저 정보
export const fetchUserInfo = async (userId) => {
  try {
    const response = await api.get(`/api/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('유저 정보 조회 실패:', error);
    throw error;
  }
};

// 아이디 찾기
export const findUserId = async (email) => {
  try {
    const response = await api.post('/api/users/find-id', { email });
    return response.data;
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
export const fetchMyInfo = async (userId, accessToken) => {
  try {
    if (!accessToken) {
      throw new Error('인증 토큰이 없습니다.');
    }

    const response = await api.get(`/api/my/${userId}`);

    if (response.data) {
      return response.data;
    }
    throw new Error('잘못된 응답 형식입니다.');
  } catch (error) {
    console.error('내정보 조회 실패:', error);
    throw error;
  }
};

// 소속 인증
export const verifyClubMembership = async (clubVerifyData) => {
  try {
    const response = await api.post('/api/users/clubVerify', clubVerifyData);
    return response.data;
  } catch (error) {
    console.error('소속 인증 실패:', error);
    throw error;
  }
};
