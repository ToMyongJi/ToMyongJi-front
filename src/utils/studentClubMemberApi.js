import api, { API_BASE_URL } from './api';

// 소속 부원 조회 API 함수
export const fetchClubMembers = async (userId) => {
  // 로그인 한 유저의 id
  try {
    const response = await api.get(`${API_BASE_URL}/api/my/members/${userId}`);
    return response.data;
  } catch (error) {
    console.error('소속 부원 조회 중 오류 발생:', error);
    throw error;
  }
};

// 소속 부원 추가 API 함수
export const addClubMember = async (userId, memberData) => {
  // 로그인 한 유저의 id
  try {
    const response = await api.post(`${API_BASE_URL}/api/my/members/${userId}`, memberData);
    return response.data;
  } catch (error) {
    console.error('소속 부원 추가 중 오류 발생:', error);
    throw error;
  }
};

// 소속 부원 삭제 API 함수
export const deleteClubMember = async (memberId) => {
  // 삭제할 유저의 id
  try {
    const response = await api.delete(`${API_BASE_URL}/api/my/members/${memberId}`);
    return response.data;
  } catch (error) {
    console.error('소속 부원 삭제 중 오류 발생:', error);
    throw error;
  }
};
