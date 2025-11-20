import api from "./api";

// 특정 학생회 영수증 조회 (학생용)
export const fetchClubReceipts = async (clubId) => {
  try {
    const response = await api.get(`/api/receipt/club/${clubId}/student`);
    return response.data || { data: [] };
  } catch (error) {
    console.error("학생회 영수증 정보를 가져오는 데 실패했습니다:", error);
    throw error;
  }
};

// 특정 학생회 영수증 조회 (학생회 전용)
export const fetchClubReceiptsAdmin = async (userId) => {
  try {
    const response = await api.get(`/api/receipt/club/${userId}`);
    return response.data || { data: { receiptList: [], balance: 0 } };
  } catch (error) {
    console.error("학생회 영수증 정보를 가져오는 데 실패했습니다:", error);
    throw error;
  }
};

// 특정 사용자의 영수증 생성
export const createUserReceipt = async (receiptData) => {
  try {
    const response = await api.post("/api/receipt", receiptData);
    return response.data;
  } catch (error) {
    console.error("사용자 영수증 생성에 실패했습니다:", error);
    throw error;
  }
};

// 특정 영수증 삭제
export const deleteUserReceipt = async (receiptId) => {
  try {
    const response = await api.delete(`/api/receipt/${receiptId}`);
    return response.data;
  } catch (error) {
    console.error("영수증 삭제에 실패했습니다:", error);
    throw error;
  }
};

// 특정 영수증 수정
export const updateUserReceipt = async (receiptData) => {
  try {
    const response = await api.put("/api/receipt", receiptData);
    return response.data;
  } catch (error) {
    console.error("영수증 수정에 실패했습니다:", error);
    throw error;
  }
};

// 영수증 내역 csv 추출
export const exportCsv = async (csvData) => {
  try {
    const response = await api.post("/api/csv/export", csvData, {
      responseType: "blob",
    }); // blob 옵션 추가
    const arrayBuffer = await response.data.arrayBuffer();
    const blob = new Blob(
      [
        new Uint8Array([0xef, 0xbb, 0xbf]), // UTF-8 BOM
        arrayBuffer,
      ],
      { type: "text/csv;charset=utf-8;" }
    );
    return blob;
  } catch (error) {
    console.error("영수증 내역 추출에 실패했습니다:", error);
    throw error;
  }
};

// 모든 대학 조회
export const fetchAllColleges = async () => {
  try {
    const response = await api.get("/api/collegesAndClubs");
    return response.data.data;
  } catch (error) {
    console.error("모든 대학 정보를 가져오는 데 실패했습니다:", error);
    throw error;
  }
};

// 모든 학생회 조회
export const fetchAllClubs = async () => {
  try {
    const response = await api.get("/api/club");
    return response.data.data;
  } catch (error) {
    console.error("모든 학생회 정보를 가져오는 데 실패했습니다:", error);
    throw error;
  }
};

// 대학에 맞는 학생회 조회
export const fetchCollegeClubs = async (collegeId) => {
  try {
    const response = await api.get(`/api/club/${collegeId}`);
    return response.data;
  } catch (error) {
    console.error("대학에 맞는 학생회 정보를 가져오는 데 실패했습니다:", error);
    throw error;
  }
};

// CSV 파일 업로드
export const uploadCsvFile = async (userId, file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post(`/api/csv/upload/${userId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("CSV 파일 업로드에 실패했습니다:", error);
    throw error;
  }
};

// 거래내역서 PDF 업로드
export const uploadTossFile = async (userId, file, keyword) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId);
    formData.append("keyword", keyword);
    const response = await api.post("/api/breakdown/parse", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("거래내역서 업로드에 실패했습니다:", error);
    throw error;
  }
};

// OCR 영수증 생성
export const createOcrReceipt = async (userId, formData) => {
  try {
    const response = await api.post(`/api/ocr/upload/${userId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("OCR 영수증 생성에 실패했습니다:", error);
    throw error;
  }
};

// 영수증 검색
export const searchReceipts = async (searchParams = {}) => {
  try {
    const response = await api.get("/api/receipt/keyword", {
      params: searchParams,
      timeout: 8000,
    });
    return response.data;
  } catch (error) {
    console.error("영수증 검색에 실패했습니다:", error);
    throw error;
  }
};
