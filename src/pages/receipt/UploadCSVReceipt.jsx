import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { uploadCsvFile } from '../../utils/receiptApi';
import useAuthStore from '../../store/authStore';

const UploadCsvReceipt = () => {
  const navigate = useNavigate();
  const { authData } = useAuthStore();
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  // 사용자 인증 및 데이터 로드
  useEffect(() => {
    if (authData?.accessToken) {
      try {
        const decodedToken = JSON.parse(atob(authData.accessToken.split('.')[1]));
        setUserId(decodedToken.id);
      } catch (error) {
        console.error('액세스 토큰 디코딩 중 오류 발생:', error);
      }
    }
  }, [authData]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('파일을 선택해주세요.');
      return;
    }

    setIsLoading(true);
    try {
      if (!userId) {
        alert('사용자 ID를 찾을 수 없습니다.');
        return;
      }

      const response = await uploadCsvFile(userId, file);

      if (response.statusCode === 200) {
        const receipts = response.data;
        alert('기존 데이터가 성공적으로 업로드되었습니다.');
        navigate(`/create-receipt`);
      } else {
        alert('기존 데이터 업로드에 실패했습니다.');
      }
    } catch (error) {
      console.error('데이터 업로드 중 오류 발생:', error);
      alert('데이터 업로드 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-[600px] min-h-screen mx-auto bg-white flex flex-col">
      <Header />
      <div className="flex-grow flex flex-col items-start justify-start px-4 sm:px-20 py-3 mt-3 font-GmarketLight text-[10px] sm:text-[12px]">
        <div className="flex items-center justify-between w-full mb-4">
          <h2 className="font-GmarketMedium text-[#061E5B] text-[15px] sm:text-[18px]">기존 데이터 추가하기</h2>
        </div>

        <div className="w-full p-4 sm:p-6 rounded-md shadow-[0_0_10px_#CED3FF] mb-4">
          <h3 className="font-GmarketMedium text-[12px] sm:text-[14px] text-[#002e72] mb-3">CSV 파일 형식 안내</h3>
          <div className="space-y-3 text-[10px] sm:text-[12px] text-[#061E5B]">
            <p className="mb-2 text-red-500">엑셀 파일을 다음과 같은 CSV 형식으로 변환해주세요:</p>
            <div className="bg-gray-50 p-3 rounded-md font-mono text-[10px] sm:text-[11px]">
              date, content, deposit, withdrawal
              <br />
              2024-11-01, 회비, 50000, 0
              <br />
              2024-11-06, 간식비, 0, 30000
            </div>

            <div className="mt-4">
              <p className="mb-2 font-GmarketMedium">엑셀 파일을 CSV로 변환하는 방법:</p>
              <ol className="ml-2 space-y-1 list-decimal list-inside">
                <li>엑셀 파일을 엽니다.</li>
                <li>상단 메뉴에서 [파일] → [다른 이름으로 저장]을 선택합니다.</li>
                <li>파일 형식을 "CSV (쉼표로 분리) (*.csv)"로 선택합니다.</li>
                <li>파일명을 입력하고 [저장]을 클릭합니다.</li>
                <li>저장된 파일을 우클릭한 후 메모장으로 실행합니다.</li>
                <li>
                  메모장에서 편집 → 상단의 파일탭을 클릭 → 다른 이름으로 저장 → 하단의 인코딩 형식을 UTF-8로 변경후
                  저장합니다.
                </li>
              </ol>
            </div>

            <div className="mt-4">
              <p className="mb-2 font-GmarketMedium">주의사항:</p>
              <ul className="ml-2 space-y-1 list-disc list-inside">
                <li className="text-red-500">위의 형식과 반드시 동일해야 합니다.</li>
                <li className="text-red-500">날짜와 내용이 같은 줄은 영수증으로 인식되지 않습니다.</li>
                <li>컬럼 명은 date, content, deposit, withdrawal 이어야 합니다.</li>
                <li>날짜는 YYYY-MM-DD 형식으로 입력해주세요.</li>
                <li>내용은 최대 10자까지 입력해주세요.</li>
                <li>입금과 출금은 숫자만 입력해주세요.</li>
                <li>입금이나 출금이 없는 경우 0으로 입력해주세요.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="w-full p-4 sm:p-6 rounded-md shadow-[0_0_10px_#CED3FF]">
          <div className="flex flex-col space-y-4">
            <div className="flex justify-center w-full">
              <label className="w-1/4 px-3 py-2 text-[#061E5B] rounded-md shadow-[0_0_10px_#CED3FF] hover:shadow-[0_0_15px_#A0A9FF] border-none cursor-pointer transition duration-300 text-center">
                파일 선택
                <input type="file" accept=".csv" onChange={handleFileChange} className="hidden" />
              </label>
            </div>
            {file && <p className="text-center text-[#061E5B] text-[12px] sm:text-[14px]">선택된 파일: {file.name}</p>}

            {/* 미리보기 주석 처리 */}
            {/* {preview.length > 0 && (
              <div className="mt-4">
                <h3 className="font-GmarketMedium text-[12px] sm:text-[14px] text-[#002e72] mb-4">미리보기</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="font-GmarketMedium text-[12px] sm:text-[14px] text-[#002e72]">
                        <th className="w-1/4 p-2 text-left">날짜</th>
                        <th className="w-1/4 p-2 text-left">내용</th>
                        <th className="w-1/4 p-2 text-right">입금</th>
                        <th className="w-1/4 p-2 text-right">출금</th>
                      </tr>
                    </thead>
                    <tbody className="space-y-7">
                      {preview.map((row, index) => (
                        <tr key={index} className="text-[10px] sm:text-[12px]">
                          <td className="p-2">{row.date}</td>
                          <td className="p-2">{row.content}</td>
                          <td className="p-2 text-right text-blue-500">
                            {Number(row.deposit) > 0 ? `+${Number(row.deposit).toLocaleString()}` : ''}
                          </td>
                          <td className="p-2 text-right text-red-500">
                            {Number(row.withdrawal) > 0 ? `-${Number(row.withdrawal).toLocaleString()}` : ''}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )} */}
          </div>
        </div>

        <div className="flex justify-center w-full mt-8 mb-10 space-x-4">
          <button
            onClick={() => navigate('/receipt')}
            className="w-1/4 px-3 py-2 text-[#061E5B] rounded-md shadow-[0_0_10px_#CED3FF] hover:shadow-[0_0_15px_#A0A9FF] border border-[#CED3FF] transition duration-300"
          >
            취소
          </button>
          <button
            onClick={handleUpload}
            disabled={!file || isLoading}
            className={`w-1/4 px-3 py-2 rounded-md shadow-[0_0_10px_#CED3FF] hover:shadow-[0_0_15px_#A0A9FF] border-none transition duration-300 ${
              !file || isLoading
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-[#061E5B] text-white hover:bg-[#0A307D]'
            }`}
          >
            {isLoading ? '업로드 중...' : '업로드'}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UploadCsvReceipt;
