import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { fetchClubReceipts } from "../../utils/receiptApi";
import useStudentClubStore from "../../store/studentClubStore";
import Pagination from "../../components/Pagination";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import tossCheck from "../../assets/images/tossCheck.png";
import tooltip from "../../assets/images/tooltip.png";

const ReceiptsList = () => {
  const clubs = useStudentClubStore((state) => state.clubs);
  const { clubId } = useParams();
  const currentClub = clubs.find(
    (club) => club.studentClubId === Number(clubId)
  );

  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );
  const [selectedMonth, setSelectedMonth] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // 페이지네이션 상태 추가
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 페이지당 표시할 항목 수

  const location = useLocation();
  const clubName = location.state?.clubName || "동아리 이름";

  useEffect(() => {
    const loadReceipts = async () => {
      try {
        setLoading(true);
        const response = await fetchClubReceipts(clubId);
        const receiptsData = response.data || [];
        setReceipts(receiptsData);
        setFilteredData(receiptsData);
        setError(null);
      } catch (err) {
        setError("영수증을 불러오는 데 실패했습니다.");
        setReceipts([]);
        setFilteredData([]);
      } finally {
        setLoading(false);
      }
    };

    loadReceipts();
  }, [clubId]);

  const filterDataByMonth = () => {
    if (!Array.isArray(receipts)) return;

    const filtered = receipts.filter((item) => {
      if (!item || !item.date) return false;
      if (!selectedYear || !selectedMonth) return true;

      const itemDate = new Date(item.date);
      const itemYear = itemDate.getFullYear().toString();
      const itemMonth = String(itemDate.getMonth() + 1).padStart(2, "0");
      return itemYear === selectedYear && itemMonth === selectedMonth;
    });

    setFilteredData(filtered);
  };

  useEffect(() => {
    filterDataByMonth();
  }, [receipts, selectedYear, selectedMonth]);

  // 현재 페이지의 데이터만 반환하는 함수
  const getCurrentPageData = () => {
    const sortedData = [
      ...(filteredData.length > 0 ? filteredData : receipts),
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  };

  // 총 페이지 수 계산
  const totalPages = Math.ceil(
    (filteredData.length > 0 ? filteredData.length : receipts.length) /
      itemsPerPage
  );

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 필터링 시 페이지 초기화
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredData]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-[600px] min-h-screen mx-auto bg-white flex flex-col">
      <Header />
      <div className="flex-grow flex flex-col items-start justify-start px-4 sm:px-20 py-3 mt-3 my-[100px] font-GmarketLight text-[10px] sm:text-[12px]">
        <div className="relative flex items-center w-full mb-4 group">
          <h2 className="font-GmarketMedium text-[#002E72] text-[15px] sm:text-[18px]">
            {currentClub?.studentClubName || "동아리 이름"}
          </h2>
          {currentClub?.verification && (
            <img
              src={tossCheck}
              alt="거래내역서 인증 이미지"
              className="w-63 h-5 ml-2 mb-1"
            />
          )}
          <div className="relative ml-auto">
            <img
              src={tooltip}
              alt="인증 안내 이미지"
              className="w-3 h-3.4 cursor-pointer"
            />
            <div className="absolute mt-2 right-0 w-[304px] p-3 bg-[#F0F2FF] rounded-lg shadow-[0_0_15px_#4E67EC80] shadow-opacity-50 opacity-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-100">
              <div className="flex items-center mb-2">
                <span className="font-GmarketMedium text-[#002E72]">
                  거래내역서 인증 마크 안내
                </span>
                <img
                  src={tossCheck}
                  alt="거래내역서 인증 이미지"
                  className="w-16 h-3.5 ml-1 mb-1"
                />
              </div>
              <p className="font-GmarketSansLight text-[11px] text-[#000000]">
                전체 결제 금액 내역의 30% 이상이 토스뱅크 거래내역서로
                <br />
                인증되면, 해당 학생회의 영수증 페이지 조회 시<br />
                거래내역서 인증 마크가 추가됩니다.
              </p>
            </div>
          </div>
        </div>

        {/* 기간별 조회 기능 */}
        <div className="w-full mb-10">
          <div className="flex flex-col w-full space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
            <div className="flex w-full space-x-2">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-1/2 px-2 py-2 border focus:outline-none rounded focus:ring-2 focus:ring-[#CED3FF]"
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
                className="w-1/2 px-2 py-2 border focus:outline-none rounded focus:ring-2 focus:ring-[#CED3FF]"
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
          </div>
        </div>

        <div className="w-full p-4 sm:p-6 rounded-md shadow-[0_0_10px_#CED3FF]">
          <div className="flex items-center justify-between font-GmarketMedium my-1 pb-4 text-[12px] sm:text-[14px] text-[#002e72]">
            <span className="w-1/4">날짜</span>
            <span className="w-1/4">내용</span>
            <span className="w-1/4 text-right">입금</span>
            <span className="w-1/4 text-right">출금</span>
          </div>
          <div className="flex flex-col space-y-7">
            {Array.isArray(filteredData) && filteredData.length > 0 ? (
              getCurrentPageData().map((item, index) => (
                <div
                  key={`${item.id}-${item.date}-${index}`}
                  className="flex items-center justify-between"
                >
                  <span className="w-1/4">
                    {new Date(item.date).toISOString().split("T")[0]}
                  </span>
                  <span className="w-1/4">{item.content}</span>
                  <span className="w-1/4 text-right text-blue-500">
                    {item.deposit > 0
                      ? `+${item.deposit.toLocaleString()}`
                      : ""}
                  </span>
                  <span className="w-1/4 text-right text-red-500">
                    {item.withdrawal > 0
                      ? `-${item.withdrawal.toLocaleString()}`
                      : ""}
                  </span>
                </div>
              ))
            ) : (
              <p>표시할 데이터가 없습니다.</p>
            )}
          </div>
          {(filteredData.length > 0 || receipts.length > 0) && (
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

export default ReceiptsList;
