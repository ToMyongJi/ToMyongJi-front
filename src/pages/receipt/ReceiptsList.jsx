import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { fetchClubReceipts } from '../../utils/receiptApi';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

const ReceiptsList = () => {
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const { clubId } = useParams();
  const location = useLocation();
  const clubName = location.state?.clubName || '동아리 이름';

  useEffect(() => {
    const loadReceipts = async () => {
      try {
        setLoading(true);
        const response = await fetchClubReceipts(clubId);
        const receiptsData = Array.isArray(response.data) ? response.data : [];
        setReceipts(receiptsData);
        setFilteredData(receiptsData);
        setError(null);
      } catch (err) {
        setError('영수증을 불러오는 데 실패했습니다.');
        setReceipts([]);
        setFilteredData([]);
      } finally {
        setLoading(false);
      }
    };

    loadReceipts();
  }, [clubId]);

  const filterDataByDateRange = () => {
    if (!Array.isArray(receipts)) return;

    const filtered = receipts.filter((item) => {
      if (!item || !item.date) return false;

      const itemDate = new Date(item.date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      if (start && end) {
        return itemDate >= start && itemDate <= end;
      } else if (start) {
        return itemDate >= start;
      } else if (end) {
        return itemDate <= end;
      }
      return true;
    });

    setFilteredData(filtered);
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-[600px] min-h-screen mx-auto bg-white flex flex-col">
      <Header />
      <div className="flex-grow flex flex-col items-start justify-start px-4 sm:px-20 py-3 mt-3 my-[100px] font-GmarketLight text-[10px] sm:text-[12px]">
        <h2 className="font-GmarketLight text-[#000000] text-[15px] sm:text-[18px] mb-4 self-start">{clubName}</h2>

        {/* 기간별 조회 기능 */}
        <div className="w-full mb-10">
          <div className="flex flex-col w-full space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
            <div className="flex space-x-2 sm:w-2/3">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-1/2 px-2 py-2 border focus:outline-none rounded focus:ring-2 focus:ring-[#CED3FF]"
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-1/2 px-2 py-2 border focus:outline-none rounded focus:ring-2 focus:ring-[#CED3FF]"
              />
            </div>
            <button
              onClick={filterDataByDateRange}
              className="w-full sm:w-1/3 px-4 py-2 text-[#061E5B] rounded-md shadow-[0_0_10px_#CED3FF] hover:shadow-[0_0_15px_#A0A9FF] border border-[#CED3FF] cursor-pointer transition duration-300 whitespace-nowrap"
            >
              조회
            </button>
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
              [...filteredData]
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((item, index) => (
                  <div key={`${item.id}-${item.date}-${index}`} className="flex items-center justify-between">
                    <span className="w-1/4">{new Date(item.date).toLocaleDateString()}</span>
                    <span className="w-1/4">{item.content}</span>
                    <span className="w-1/4 text-right text-blue-500">
                      {item.deposit > 0 ? `+${item.deposit.toLocaleString()}` : ''}
                    </span>
                    <span className="w-1/4 text-right text-red-500">
                      {item.withdrawal > 0 ? `-${item.withdrawal.toLocaleString()}` : ''}
                    </span>
                  </div>
                ))
            ) : (
              <p>표시할 데이터가 없습니다.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ReceiptsList;
