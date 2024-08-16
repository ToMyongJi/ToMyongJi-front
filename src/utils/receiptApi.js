import api, { API_BASE_URL } from './api';

// 특정 학생회 영수증 조회
export const fetchClubReceipts = async (clubId) => {
  try {
    const response = await api.get(`${API_BASE_URL}/api/receipt/club/${clubId}`);
    return response.data;
  } catch (error) {
    console.error('학생회 영수증 정보를 가져오는 데 실패했습니다:', error);
    throw error;
  }
};

// 특정 학생회 영수증 생성
export const createClubReceipt = async (clubId, receiptData) => {
  try {
    const response = await api.post(`${API_BASE_URL}/api/receipt/${clubId}`, receiptData);
    return response.data;
  } catch (error) {
    console.error('학생회 영수증 생성에 실패했습니다:', error);
    throw error;
  }
};

// 특정 영수증 삭제
export const deleteReceipt = async (receiptId) => {
  try {
    const response = await api.delete(`${API_BASE_URL}/api/receipt/${receiptId}`);
    return response.data;
  } catch (error) {
    console.error('영수증 삭제에 실패했습니다:', error);
    throw error;
  }
};

// 모든 대학 조회
export const fetchAllColleges = async () => {
  try {
    const response = await api.get(`${API_BASE_URL}/api/college`);
    return response.data;
  } catch (error) {
    console.error('모든 대학 정보를 가져오는 데 실패했습니다:', error);
    throw error;
  }
};
