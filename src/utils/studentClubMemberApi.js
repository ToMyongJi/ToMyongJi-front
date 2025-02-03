import api from './api';

// 소속 부원 조회
export const fetchClubMembers = async (userId) => {
  try {
    const response = await api.get(`/api/my/members/${userId}`);
    return response.data.data;
  } catch (error) {
    console.error('소속 부원 조회 중 오류 발생:', error);
    throw error;
  }
};

// 소속 부원 추가
export const addClubMember = async (memberData) => {
  try {
    const response = await api.post('/api/my/members', memberData);
    return response.data;
  } catch (error) {
    console.error('소속 부원 추가 중 오류 발생:', error);
    if (error.response?.status === 400) {
      throw new Error('이미 등록된 학번이거나 잘못된 정보입니다.');
    }
    throw error;
  }
};

// 소속 부원 삭제
export const deleteClubMember = async (deletedStudentNum) => {
  try {
    const response = await api.delete(`/api/my/members/${deletedStudentNum}`);
    return response.data;
  } catch (error) {
    console.error('소속 부원 삭제 중 오류 발생:', error);
    throw error;
  }
};
