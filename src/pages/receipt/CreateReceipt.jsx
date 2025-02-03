import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { fetchClubReceipts, createUserReceipt, deleteUserReceipt, createOcrReceipt } from '../../utils/receiptApi';
import { fetchMyInfo } from '../../utils/authApi';
import useAuthStore from '../../store/authStore';
import useStudentClubStore from '../../store/studentClubStore';
import deleteButton from '../../assets/images/delete.png';

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
  const [date, setDate] = useState('');
  const [content, setContent] = useState('');
  const [deposit, setDeposit] = useState('');
  const [withdrawal, setWithdrawal] = useState('');

  // 필터 데이터
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // balance state 추가
  const [balance, setBalance] = useState(0);

  // 사용자 인증 및 데이터 로드
  useEffect(() => {
    if (authData?.accessToken) {
      try {
        const decodedToken = JSON.parse(atob(authData.accessToken.split('.')[1]));
        setUserId(decodedToken.id);
        setUserLoginId(decodedToken.sub);
      } catch (error) {
        console.error('액세스 토큰 디코딩 중 오류 발생:', error);
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

  useEffect(() => {
    filterDataByDateRange();
  }, [receiptData, startDate, endDate]);

  // API 호출 함수
  const fetchUserData = async (userId) => {
    try {
      const response = await fetchMyInfo(userId, authData.accessToken);
      setUserData(response);
    } catch (error) {
      console.error('사용자 정보를 가져오는데 실패했습니다:', error);
    }
  };

  const fetchReceipts = async () => {
    if (!userData?.data?.studentClubId) return;
    try {
      const response = await fetchClubReceipts(userData.data.studentClubId);
      setReceiptData(response.data.receiptList || []);
      setFilteredData(response.data.receiptList || []);
      setBalance(response.data.balance || 0);
    } catch (error) {
      console.error('영수증 데이터를 가져오는데 실패했습니다:', error);
      setReceiptData([]);
      setFilteredData([]);
      setBalance(0);
    }
  };

  // 이벤트 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userData?.data?.studentClubId) {
      alert('사용자 정보를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }
    if (!date || !content) {
      alert('빠진 내용이 없나 확인해주세요.');
      return;
    }

    try {
      const requestData = {
        userId: userLoginId,
        date: new Date(date).toISOString(),
        content: content,
        deposit: Number(deposit) || 0,
        withdrawal: Number(withdrawal) || 0,
      };

      const response = await createUserReceipt(requestData);
      if (response.statusCode === 201) {
        resetForm();
        await fetchReceipts();
        setFilteredData([]);
        alert('내역이 성공적으로 저장되었습니다.');
      } else {
        alert('내역 저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('내역 생성에 실패했습니다:', error);
      alert('내역 저장에 실패했습니다.');
    }
  };

  const handleImageUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validImageTypes.includes(file.type)) {
      alert('JPG, PNG 형식의 이미지 파일만 업로드 가능합니다.');
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('파일 크기는 5MB 이하여야 합니다.');
      return;
    }

    try {
      // FormData 생성
      const formData = new FormData();
      formData.append('file', file);

      // OCR API 호출
      const response = await createOcrReceipt(userId, formData);

      if (response.statusCode === 200) {
        const { date, content, withdrawal } = response.data;

        // 날짜 형식 변환 (ISO -> YYYY-MM-DD)
        const formattedDate = new Date(date).toISOString().split('T')[0];

        // 폼 데이터 업데이트
        setDate(formattedDate);
        setContent(content);
        setWithdrawal(withdrawal.toString());

        alert('영수증 인식이 완료되었습니다. 내용을 확인하고 저장해주세요.');
      } else {
        throw new Error(response.statusMessage || 'OCR 처리에 실패했습니다.');
      }
    } catch (error) {
      console.error('OCR 처리 실패:', error);
      alert('영수증 인식에 실패했습니다. 직접 입력해주세요.');
    } finally {
      // 파일 입력 초기화
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDelete = async (receiptId) => {
    if (!window.confirm('정말로 이 내역을 삭제하시겠습니까?')) {
      return;
    }

    try {
      const response = await deleteUserReceipt(receiptId);
      if (response.statusCode === 200) {
        await fetchReceipts();

        if (startDate || endDate) {
          filterDataByDateRange();
        }

        alert('내역이 삭제되었습니다.');
      } else {
        alert('내역 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('내역 삭제에 실패했습니다:', error);
      alert('내역 삭제에 실패했습니다.');
    }
  };

  const filterDataByDateRange = () => {
    if (!receiptData) return;

    const filtered = receiptData.filter((item) => {
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

  const resetForm = () => {
    setDate('');
    setContent('');
    setDeposit('');
    setWithdrawal('');
  };

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
        <div className="flex items-center justify-end w-full mb-4 space-x-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/jpeg,image/png,image/jpg"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => navigate('/receipt/upload-csv')}
            className="px-3 py-1 sm:px-4 sm:py-2 text-[10px] sm:text-[12px] text-[#061E5B] rounded-md shadow-[0_0_10px_#CED3FF] hover:shadow-[0_0_15px_#A0A9FF] border border-[#CED3FF] transition duration-300"
          >
            기존 데이터 추가
          </button>
          <button
            type="button"
            onClick={handleImageUpload}
            className="px-3 py-1 sm:px-4 sm:py-2 text-[10px] sm:text-[12px] text-[#061E5B] rounded-md shadow-[0_0_10px_#CED3FF] hover:shadow-[0_0_15px_#A0A9FF] border border-[#CED3FF] transition duration-300"
          >
            영수증 첨부
          </button>
        </div>
        <div className="sticky top-0 z-40 w-full py-4 bg-white">
          <div className="w-full p-4 sm:p-6 rounded-md shadow-[0_0_10px_#CED3FF]">
            <form onSubmit={handleSubmit} id="receipt-form" className="w-full">
              <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full sm:w-1/6 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
                  placeholder="날짜"
                />
                <input
                  type="text"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full sm:w-2/6 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
                  placeholder="내용"
                />
                <input
                  type="text"
                  value={deposit}
                  onChange={(e) => setDeposit(e.target.value)}
                  className="w-full sm:w-1/6 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
                  placeholder="입금"
                />
                <input
                  type="text"
                  value={withdrawal}
                  onChange={(e) => setWithdrawal(e.target.value)}
                  className="w-full sm:w-1/6 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
                  placeholder="출금"
                />
                <button
                  type="submit"
                  className="w-full sm:w-[50px] px-4 py-2 text-[#061E5B] rounded-lg shadow-[0_0_10px_#CED3FF] hover:shadow-[0_0_15px_#A0A9FF] border border-[#CED3FF] transition duration-300 flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="w-full mt-8 mb-4">
          <div className="flex flex-col w-full space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
            <div className="flex space-x-2 sm:w-2/3">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-1/2 px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-1/2 px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
              />
            </div>
            <button
              onClick={filterDataByDateRange}
              className="w-full sm:w-1/3 px-4 py-2 text-[#061E5B] rounded-md shadow-[0_0_10px_#CED3FF] hover:shadow-[0_0_15px_#A0A9FF] border border-[#CED3FF] transition duration-300"
            >
              조회
            </button>
          </div>
        </div>
        <div className="w-full mb-10 p-2 sm:p-4 rounded-md shadow-[0_0_10px_#CED3FF] mt-5">
          <div className="flex justify-center font-GmarketMedium my-1 pb-4 text-[12px] sm:text-[14px] text-[#002e72]">
            <div className="flex items-center w-4/5">
              <span className="w-1/4">날짜</span>
              <span className="w-1/4">내용</span>
              <span className="w-1/4 text-right">입금</span>
              <span className="w-1/4 text-right">출금</span>
            </div>
          </div>
          <div className="flex flex-col space-y-7">
            {(filteredData.length > 0 ? filteredData : receiptData).length > 0 ? (
              (filteredData.length > 0 ? filteredData : receiptData)
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((item, index) => (
                  <div key={`${item.id || ''}-${item.date}-${index}`} className="flex items-center justify-between">
                    <span className="w-1/4">{new Date(item.date).toISOString().split('T')[0]}</span>{' '}
                    <span className="w-1/5">{item.content}</span>
                    <span className="w-1/5 text-right text-blue-500">
                      {item.deposit > 0 ? `+${item.deposit.toLocaleString()}` : ''}
                    </span>
                    <span className="w-1/5 text-right text-red-500">
                      {item.withdrawal > 0 ? `-${item.withdrawal.toLocaleString()}` : ''}
                    </span>
                    <button
                      onClick={() => handleDelete(item.receiptId)}
                      className="p-1 rounded-lg hover:bg-[#FFF0F5] transition duration-300"
                    >
                      <img src={deleteButton} alt="삭제" className="w-2 h-2 sm:w-4 sm:h-4" />
                    </button>
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

export default CreateReceipt;
