import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Pagination from "../../components/Pagination";
import {
  fetchClubReceiptsAdmin,
  createUserReceipt,
  deleteUserReceipt,
  createOcrReceipt,
  exportCsv,
  updateUserReceipt,
  searchReceipts,
} from "../../utils/receiptApi";
import { fetchMyInfo } from "../../utils/authApi";
import useAuthStore from "../../store/authStore";
import useStudentClubStore from "../../store/studentClubStore";
import deleteButton from "../../assets/images/delete.png";
import tossLogo from "../../assets/images/tossLogo.png";
import excelLogo from "../../assets/images/excel.png";
import searchIcon from "../../assets/images/search.png";

const CreateReceipt = () => {
  // State 관리
  const { authData } = useAuthStore();
  const { getClubNameById } = useStudentClubStore();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [userLoginId, setUserLoginId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null);
  const [receiptData, setReceiptData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // 폼 데이터
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const [deposit, setDeposit] = useState("");
  const [withdrawal, setWithdrawal] = useState("");

  // 필터 데이터
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );
  const [selectedMonth, setSelectedMonth] = useState("");

  // balance state 추가
  const [balance, setBalance] = useState(0);

  // 페이지네이션 상태 추가
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 페이지당 표시할 항목 수

  const [editingItem, setEditingItem] = useState(null);

  // 검색
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const debounceRef = useRef(null);

  // 사용자 인증 및 데이터 로드
  useEffect(() => {
    if (authData?.accessToken) {
      try {
        const decodedToken = JSON.parse(
          atob(authData.accessToken.split(".")[1])
        );
        setUserId(decodedToken.id);
        setUserLoginId(decodedToken.sub);
      } catch (error) {
        console.error("액세스 토큰 디코딩 중 오류 발생:", error);
      }
    }
  }, [authData]);

  useEffect(() => {
    if (userId) {
      fetchUserData(userId);
    }
  }, [userId]);

  useEffect(() => {
    if (userData?.data?.studentClubId) {
      fetchReceipts();
    }
  }, [userData]);

  // API 호출 함수
  const fetchUserData = async (userId) => {
    try {
      const response = await fetchMyInfo(userId, authData.accessToken);
      setUserData(response);
    } catch (error) {
      console.error("사용자 정보를 가져오는데 실패했습니다:", error);
    }
  };

  const fetchReceipts = async () => {
    if (!userData?.data?.studentClubId) return;
    try {
      const response = await fetchClubReceiptsAdmin(userId);
      setReceiptData(response.data.receiptList || []);
      setFilteredData(response.data.receiptList || []);
      setBalance(response.data.balance || 0);
    } catch (error) {
      console.error("영수증 데이터를 가져오는데 실패했습니다:", error);
      setReceiptData([]);
      setFilteredData([]);
      setBalance(0);
    }
  };

  // 이벤트 핸들러
  const handleEdit = (item) => {
    setEditingItem({
      ...item,
      date: new Date(item.date).toISOString().split("T")[0],
      deposit: item.deposit.toString(),
      withdrawal: item.withdrawal.toString(),
    });
  };

  const handleSaveEdit = async (item) => {
    try {
      const requestData = {
        receiptId: item.receiptId,
        userId: userLoginId,
        date: new Date(item.date).toISOString(),
        content: item.content,
        deposit: Number(item.deposit) || 0,
        withdrawal: Number(item.withdrawal) || 0,
      };

      const response = await updateUserReceipt(requestData);
      if (response.statusCode === 200) {
        await fetchReceipts();
        setEditingItem(null);
        alert("내역이 성공적으로 수정되었습니다.");
      } else {
        alert("내역 수정에 실패했습니다.");
      }
    } catch (error) {
      console.error("내역 수정에 실패했습니다:", error);
      alert("내역 수정에 실패했습니다.");
    }
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  const handleInputChange = (field, value) => {
    setEditingItem((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userData?.data?.studentClubId) {
      alert("사용자 정보를 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
      return;
    }
    if (!date || !content) {
      alert("빠진 내용이 없나 확인해주세요.");
      return;
    }

    const depositAmount = Number(deposit) || 0;
    const withdrawalAmount = Number(withdrawal) || 0;

    if (depositAmount > 0 && withdrawalAmount > 0) {
      alert("입금과 출금 중 하나만 입력해주세요.");
      return;
    }

    try {
      const requestData = {
        userId: userLoginId,
        date: new Date(date).toISOString(),
        content: content,
        deposit: depositAmount,
        withdrawal: withdrawalAmount,
      };

      let response;
      if (editingItem) {
        requestData.receiptId = editingItem.receiptId;
        response = await updateUserReceipt(requestData);
      } else {
        response = await createUserReceipt(requestData);
      }

      if (response.statusCode === 201 || response.statusCode === 200) {
        resetForm();
        await fetchReceipts();
        setFilteredData([]);
        alert(
          editingItem
            ? "내역이 성공적으로 수정되었습니다."
            : "내역이 성공적으로 저장되었습니다."
        );
        setEditingItem(null);
      } else {
        alert(
          editingItem
            ? "내역 수정에 실패했습니다."
            : "내역 저장에 실패했습니다."
        );
      }
    } catch (error) {
      console.error(
        editingItem ? "내역 수정에 실패했습니다:" : "내역 생성에 실패했습니다:",
        error
      );
      alert(
        editingItem ? "내역 수정에 실패했습니다." : "내역 저장에 실패했습니다."
      );
    }
  };

  const handleImageUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validImageTypes.includes(file.type)) {
      alert("JPG, PNG 형식의 이미지 파일만 업로드 가능합니다.");
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("파일 크기는 5MB 이하여야 합니다.");
      return;
    }

    try {
      // FormData 생성
      const formData = new FormData();
      formData.append("file", file);

      // OCR API 호출
      const response = await createOcrReceipt(userId, formData);

      if (response.statusCode === 200) {
        const { date, content, withdrawal } = response.data;

        // 날짜 형식 변환 (ISO -> YYYY-MM-DD)
        const formattedDate = new Date(date).toISOString().split("T")[0];

        // 폼 데이터 업데이트
        setDate(formattedDate);
        setContent(content);
        setWithdrawal(withdrawal.toString());

        alert("영수증 인식이 완료되었습니다. 내용을 확인하고 저장해주세요.");
      } else {
        throw new Error(response.message || "OCR 처리에 실패했습니다.");
      }
    } catch (error) {
      console.error("OCR 처리 실패:", error);
      alert("영수증 인식에 실패했습니다. 직접 입력해주세요.");
    } finally {
      // 파일 입력 초기화
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDelete = async (receiptId) => {
    if (!window.confirm("정말로 이 내역을 삭제하시겠습니까?")) {
      return;
    }

    try {
      const response = await deleteUserReceipt(receiptId);
      if (response.statusCode === 200) {
        await fetchReceipts();

        if (selectedYear && selectedMonth) {
          filterDataByMonth();
        }

        alert("내역이 삭제되었습니다.");
      } else {
        alert("내역 삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error("내역 삭제에 실패했습니다:", error);
      alert("내역 삭제에 실패했습니다.");
    }
  };

  const filterDataByMonth = () => {
    if (!Array.isArray(receiptData)) return;

    const filtered = receiptData.filter((item) => {
      if (!item || !item.date) return false;
      if (!selectedYear || !selectedMonth) return true;

      const itemDate = new Date(item.date);
      const itemYear = itemDate.getFullYear().toString();
      const itemMonth = String(itemDate.getMonth() + 1).padStart(2, "0");
      return itemYear === selectedYear && itemMonth === selectedMonth;
    });

    setFilteredData(filtered);
  };

  const resetForm = () => {
    setDate("");
    setContent("");
    setDeposit("");
    setWithdrawal("");
    setEditingItem(null);
  };

  useEffect(() => {
    filterDataByMonth();
  }, [receiptData, selectedYear, selectedMonth]);

  // 현재 페이지의 데이터만 반환하는 함수
  const getCurrentPageData = () => {
    const data = selectedYear && selectedMonth ? filteredData : receiptData;
    const sortedData = [...data].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  };

  // 총 페이지 수 계산
  // const totalPages = Math.ceil(
  //   (filteredData.length > 0 ? filteredData.length : receiptData.length) /
  //     itemsPerPage
  // );

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 필터링 시 페이지 초기화
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredData]);

  const handleExportCsv = async () => {
    if (!selectedYear || !selectedMonth) {
      alert("년도와 월을 선택해주세요.");
      return;
    }

    try {
      const csvData = {
        userId: userLoginId,
        year: parseInt(selectedYear),
        month: parseInt(selectedMonth),
      };

      const blob = await exportCsv(csvData);

      // 파일명 생성 (예: 2024-03-영수증.csv)
      const fileName = `${selectedYear}-${selectedMonth}-영수증.csv`;

      // Blob을 다운로드 링크로 변환
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();

      // 메모리 정리
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error("CSV 추출 중 오류 발생:", error);
      alert("CSV 추출에 실패했습니다.");
    }
  };

  // 검색 함수
  const handleSearch = async (keyword) => {
    if (!keyword || keyword.trim().length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await searchReceipts({ keyword, page: 1, size: 1000 });
      const payload = res?.data ?? res;
      const list = Array.isArray(payload) ? payload : payload?.data ?? [];
      setResults(list);
      setCurrentPage(1);
    } catch (err) {
      console.error(err);
      setError("검색 중 오류가 발생했습니다.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // 입력 디바운스: 입력이 멈춘 후 300ms 뒤 검색
  useEffect(() => {
    // 2글자 이하이면 검색하지 않음(결과 초기화만)
    if (term.trim().length < 2) {
      clearTimeout(debounceRef.current);
      setResults([]);
      setError(null);
      setLoading(false);
      return;
    }

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      handleSearch(term.trim());
    }, 300);

    return () => clearTimeout(debounceRef.current);
  }, [term]);

  // Enter 키로 즉시 검색
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      clearTimeout(debounceRef.current);
      handleSearch(term.trim());
    }
  };

  // displayList 결정: 검색 중이면 results, 아니면 현재 페이지 데이터
  const isSearching = term.trim().length >= 2;

  const totalItems = isSearching
    ? results.length
    : filteredData.length > 0
    ? filteredData.length
    : receiptData.length;

  // totalPages 재계산 (항상 totalItems 기반)
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const displayList = isSearching
    ? results.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : getCurrentPageData();

  return (
    <div className="max-w-[600px] min-h-screen mx-auto bg-white flex flex-col">
      <Header />
      <div className="flex-grow flex flex-col items-start justify-start px-4 sm:px-20 py-3 mt-3 font-GmarketLight text-[10px] sm:text-[12px]">
        <div className="flex items-center justify-between w-full mb-6">
          <div className="flex items-center justify-between w-full">
            <h2 className="font-GmarketLight text-[#000000] text-[15px] sm:text-[18px]">
              {getClubNameById(userData?.data.studentClubId)}
            </h2>
            <div className="font-GmarketMedium text-[14px] sm:text-[16px] text-[#061E5B]">
              잔액: {balance.toLocaleString()}원
            </div>
          </div>
        </div>
        <div className="flex items-center justify-start w-full mb-1 gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/jpeg,image/png,image/jpg"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => navigate("/receipt/upload-toss")}
            className="flex items-center px-3 py-1 sm:px-4 sm:py-2 text-[10px] sm:text-[12px] text-[#002E72] rounded-lg bg-[#FFFFFF] shadow-[0_0_10px_#CED3FF] hover:shadow-[0_0_15px_#A0A9FF] border border-[#0050FF] border-opacity-50 transition duration-300"
          >
            <img
              src={tossLogo}
              alt="토스로고이미지"
              className="w-16 h-4 mr-1 mb-0.5"
            />
            거래내역서 추가
          </button>
          <button
            type="button"
            onClick={() => navigate("/receipt/upload-csv")}
            className="flex items-center px-3 py-1 sm:px-4 sm:py-2 text-[10px] sm:text-[12px] text-[#002E72] rounded-lg bg-[#FFFFFF] shadow-[0_0_10px_#2074464D] hover:shadow-[0_0_15px_#20744680] border border-[#207446] border-opacity-50 transition duration-300"
          >
            <img
              src={excelLogo}
              alt="엑셀로고이미지"
              className="w-4 h-4 sm:w-3 sm:h-3 mr-1 mb-0.5"
            />
            EXCEL 데이터 추가
          </button>
        </div>
        <div className="sticky top-0 z-40 w-full py-4 bg-white">
          <form onSubmit={handleSubmit} id="receipt-form" className="w-full">
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border-[#D9D9D9] sm:w-1/4 sm:h-10 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
                placeholder="날짜"
              />
              <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full border-[#D9D9D9] placeholder:text-black sm:w-1/5 sm:h-10 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
                placeholder="내용"
              />
              <input
                type="text"
                value={deposit}
                onChange={(e) => setDeposit(e.target.value)}
                className="w-full border-[#D9D9D9] placeholder:text-black sm:w-1/6 sm:h-10 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
                placeholder="입금"
              />
              <input
                type="text"
                value={withdrawal}
                onChange={(e) => setWithdrawal(e.target.value)}
                className="w-full border-[#D9D9D9] placeholder:text-black sm:w-1/6 sm:h-10 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
                placeholder="출금"
              />
              <button
                type="submit"
                form="receipt-form"
                className="px-3 py-1 sm:w-1/6 sm:px-4 sm:py-2 sm:h-10 text-[10px] sm:text-[12px] text-[#002E72] bg-[#F0F2FF] rounded-lg shadow-[0_0_10px_#CED3FF] hover:shadow-[0_0_15px_#A0A9FF] border border-[#CED3FF] transition duration-300"
              >
                저장
              </button>
            </div>
          </form>
        </div>
        <div className="w-full mt-6 mb-2">
          <div className="flex flex-col w-full space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
            <div className="flex space-x-2 sm:w-2/3">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-1/2 px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
              >
                {Array.from({ length: 5 }, (_, i) => {
                  const year = new Date().getFullYear() - 2 + i;
                  return (
                    <option key={year} value={year.toString()}>
                      {year}년
                    </option>
                  );
                })}
              </select>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-1/2 px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
              >
                <option value="">전체</option>
                {Array.from({ length: 12 }, (_, i) => {
                  const month = String(i + 1).padStart(2, "0");
                  return (
                    <option key={month} value={month}>
                      {month}월
                    </option>
                  );
                })}
              </select>
            </div>
            <button
              onClick={handleExportCsv}
              className="w-full sm:w-1/3 px-4 py-2 text-[#061E5B] bg-[#CED3FF]/30 rounded-md shadow-[0_0_10px_#CED3FF] hover:shadow-[0_0_15px_#A0A9FF] border border-[#CED3FF] transition duration-300"
            >
              영수증 추출
            </button>
          </div>
        </div>
        <div className="w-full mb-10 p-2 sm:p-4 rounded-md shadow-[0_0_10px_#CED3FF] mt-5">
          <div className="flex justify-center">
            <div className="w-[280px] border-b-[1px] border-[#CFD7F1] pb-1 flex items-center">
              <input
                type="text"
                placeholder="검색어 2글자 이상 입력"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                onKeyDown={onKeyDown}
                className="flex-1 ml-1 text-[#97A0C2] outline-none"
              />
              <img
                src={searchIcon}
                alt="검색 아이콘 이미지"
                className="w-4 h-4 mx-1 cursor-pointer"
                onClick={() => {
                  clearTimeout(debounceRef.current);
                  handleSearch(term.trim());
                }}
              />
            </div>
          </div>
          <hr className="mt-5 mb-3" />
          <div className="flex justify-center font-GmarketMedium text-[12px] sm:text-[14px] text-[#002e72]">
            <div className="flex items-center w-4/5">
              <span className="w-1/4">날짜</span>
              <span className="w-1/4">내용</span>
              <span className="w-1/4 text-right">입금</span>
              <span className="w-1/4 text-right">출금</span>
            </div>
          </div>
          {/* 결과 영역 */}
          <div className="flex flex-col space-y-7">
            <div className="flex justify-center">
              <div className="w-4/5">
                {loading && (
                  <div className="text-center text-sm text-[#666] mt-5">
                    로딩 중...
                  </div>
                )}
                {error && (
                  <div className="text-center text-sm text-red-500">
                    {error}
                  </div>
                )}

                {isSearching && !loading && !error && results.length === 0 && (
                  <div className="text-center text-sm text-[#666] mt-5">
                    검색 결과가 없습니다.
                  </div>
                )}
              </div>
            </div>

            {!loading && !error && displayList.length > 0
              ? displayList.map((item, index) => {
                  const keyId = item.receiptId ?? item.id ?? index;
                  const dateStr =
                    typeof item.date === "string" && item.date.length >= 10
                      ? item.date.slice(0, 10)
                      : item.date
                      ? new Date(item.date).toISOString().split("T")[0]
                      : "";

                  return (
                    <div
                      key={`${keyId}-${index}`}
                      className="flex items-center justify-between"
                    >
                      {editingItem?.receiptId === item.receiptId ? (
                        <>
                          <input
                            type="date"
                            value={editingItem.date}
                            onChange={(e) =>
                              handleInputChange("date", e.target.value)
                            }
                            className="w-1/4 p-1 border rounded focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
                          />
                          <input
                            type="text"
                            value={editingItem.content}
                            onChange={(e) =>
                              handleInputChange("content", e.target.value)
                            }
                            className="w-1/5 p-1 border rounded focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
                          />
                          <input
                            type="text"
                            value={editingItem.deposit}
                            onChange={(e) =>
                              handleInputChange("deposit", e.target.value)
                            }
                            className="w-1/5 p-1 border rounded text-right focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
                          />
                          <input
                            type="text"
                            value={editingItem.withdrawal}
                            onChange={(e) =>
                              handleInputChange("withdrawal", e.target.value)
                            }
                            className="w-1/5 p-1 border rounded text-right focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
                          />
                          <div className="flex space-x-1 ml-2">
                            <button
                              onClick={() => handleSaveEdit(editingItem)}
                              className="px-2 py-1 text-[10px] sm:text-[12px] text-[#061E5B] rounded-md shadow-[0_0_10px_#CED3FF] hover:shadow-[0_0_15px_#A0A9FF] border border-[#CED3FF] transition duration-300"
                            >
                              O
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="px-2 py-1 text-[10px] sm:text-[12px] text-red-500 rounded-md shadow-[0_0_10px_#FFE4E4] hover:shadow-[0_0_15px_#FFB6B6] border border-[#FFE4E4] transition duration-300"
                            >
                              X
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <span className="w-1/4">{dateStr}</span>
                          <span className="w-1/5">{item.content}</span>
                          <span className="w-1/5 text-right text-blue-500">
                            {item.deposit > 0
                              ? `+${Number(item.deposit).toLocaleString()}`
                              : ""}
                          </span>
                          <span className="w-1/5 text-right text-red-500">
                            {item.withdrawal > 0
                              ? `-${Number(item.withdrawal).toLocaleString()}`
                              : ""}
                          </span>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEdit(item)}
                              className="p-1 rounded-lg hover:bg-[#F0F8FF] transition duration-300"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-2 h-2 sm:w-4 sm:h-4 text-[#061E5B]"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                              </svg>
                            </button>
                            <button
                              onClick={() =>
                                handleDelete(item.receiptId ?? item.id)
                              }
                              className="p-1 rounded-lg hover:bg-[#FFF0F5] transition duration-300"
                            >
                              <img
                                src={deleteButton}
                                alt="삭제"
                                className="w-2 h-2 sm:w-4 sm:h-4"
                              />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })
              : !isSearching &&
                !loading &&
                !error && (
                  <p className="text-center text-sm text-[#666]">
                    표시할 데이터가 없습니다.
                  </p>
                )}
          </div>

          {/* 페이징: 검색 중이면 results 길이에 맞춰 페이징 보여주기 */}
          {((term.trim().length >= 2 && results.length > 0) ||
            (term.trim().length < 2 &&
              (filteredData.length > 0 || receiptData.length > 0))) && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateReceipt;
