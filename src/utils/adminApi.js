import api from './api';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 학생회장 조회
export const fetchPresident = async (clubId) => {
  try {
    const response = await api.get(`${API_BASE_URL}/api/admin/president/${clubId}`);
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('학생회장 정보를 가져오는 데 실패했습니다:', error);
    throw error;
  }
};

// 학생회장 저장
export const savePresident = async (data) => {
  try {
    const response = await api.post(`${API_BASE_URL}/api/admin/president`, data);
    return response.data;
  } catch (error) {
    console.error('학생회장 저장 실패:', error);
    throw error;
  }
};

// 학생회장 수정
export const updatePresident = async (data) => {
  try {
    const response = await api.patch(`${API_BASE_URL}/api/admin/president`, data);
    return response.data;
  } catch (error) {
    console.error('학생회장 수정 실패:', error);
    throw error;
  }
};

// 소속 부원 조회
export const fetchMembers = async (clubId) => {
  try {
    const response = await api.get(`${API_BASE_URL}/api/admin/member/${clubId}`);
    return response.data.data;
  } catch (error) {
    console.error('소속 부원 정보를 가져오는 데 실패했습니다:', error);
    throw error;
  }
};

// 소속 부원 추가
export const addMember = async (data) => {
  try {
    const response = await api.post(`${API_BASE_URL}/api/admin/member`, data);
    return response.data;
  } catch (error) {
    console.error('소속 부원 추가 실패:', error);
    throw error;
  }
};

// 소속 부원 삭제
export const deleteMember = async (memberId) => {
  try {
    const response = await api.delete(`${API_BASE_URL}/api/admin/member/${memberId}`);
    return response.data;
  } catch (error) {
    console.error('소속 부원 삭제 실패:', error);
    throw error;
  }
};
