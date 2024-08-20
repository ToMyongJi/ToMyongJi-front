import api, { API_BASE_URL } from './api';

// 학생회장 조회 API
export const getPresident = async (clubId) => {
  try {
    const response = await api.get(`${API_BASE_URL}/api/admin/president/${clubId}`);
    return response.data;
  } catch (error) {
    console.error('학생회장 조회 실패:', error);
    throw error;
  }
};

// 학생회장 생성 API
export const createPresident = async (clubId, data) => {
  try {
    const response = await api.post(`${API_BASE_URL}/api/admin/president/${clubId}`, data);
    return response.data;
  } catch (error) {
    console.error('학생회장 생성 실패:', error);
    throw error;
  }
};

// 학생회장 수정 API
export const updatePresident = async (clubId, data) => {
  try {
    const response = await api.patch(`${API_BASE_URL}/api/admin/president/${clubId}`, data);
    return response.data;
  } catch (error) {
    console.error('학생회장 수정 실패:', error);
    throw error;
  }
};

// 소속 부원 조회 API
export const getMembers = async (clubId) => {
  try {
    const response = await api.get(`${API_BASE_URL}/api/admin/member/${clubId}`);
    return response.data;
  } catch (error) {
    console.error('소속 부원 조회 실패:', error);
    throw error;
  }
};

// 소속 부원 저장 API
export const createMember = async (clubId, data) => {
  try {
    const response = await api.post(`${API_BASE_URL}/api/admin/member/${clubId}`, data);
    return response.data;
  } catch (error) {
    console.error('소속 부원 저장 실패:', error);
    throw error;
  }
};

// 소속 부원 삭제 API
export const deleteMember = async (memberId) => {
  try {
    const response = await api.delete(`${API_BASE_URL}/api/admin/member/${memberId}`);
    return response.data;
  } catch (error) {
    console.error('소속 부원 삭제 실패:', error);
    throw error;
  }
};
