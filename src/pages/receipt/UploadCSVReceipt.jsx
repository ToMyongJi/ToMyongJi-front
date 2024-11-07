import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import useAuthStore from '../../store/authStore';
import useStudentClubStore from '../../store/studentClubStore';
import { createUserReceipt } from '../../utils/receiptApi';

const UploadCsvReceipt = () => {
  const navigate = useNavigate();
  const { authData } = useAuthStore();
  const { getClubNameById } = useStudentClubStore();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const rows = text.split('\n');

        // 빈 줄 제거 및 각 행의 공백 제거
        const cleanRows = rows.filter((row) => row.trim() !== '');

        // 모든 행을 데이터로 처리
        const previewData = cleanRows.slice(0, 5).map((row) => {
          const values = row.split(',').map((val) => val.trim());
          return {
            date: values[0] || '',
            content: values[1] || '',
            deposit: values[2] || '0',
            withdrawal: values[3] || '0',
          };
        });

        setPreview(previewData);
      };
      reader.readAsText(file, 'UTF-8');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('파일을 선택해주세요.');
      return;
    }

    setIsLoading(true);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target.result;
        const rows = text.split('\n');
        const headers = rows[0].split(',').map((h) => h.trim());

        // CSV 데이터 처리
        const data = rows.slice(1).map((row) => {
          const values = row.split(',');
          return {
            date: values[0]?.trim(),
            content: values[1]?.trim(),
            deposit: Number(values[2]) || 0,
            withdrawal: Number(values[3]) || 0,
            clubId: JSON.parse(atob(authData.accessToken.split('.')[1])).studentClubId,
          };
        });

        // 서버로 데이터 전송
        for (const item of data) {
          if (item.date && item.content) {
            await createUserReceipt(JSON.parse(atob(authData.accessToken.split('.')[1])).id, item);
          }
        }

        alert('CSV 파일 업로드가 완료되었습니다.');
        navigate('/receipt');
      };
      reader.readAsText(file);
    } catch (error) {
      console.error('CSV 업로드 중 오류 발생:', error);
      alert('CSV 파일 업로드 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-[600px] min-h-screen mx-auto bg-white flex flex-col">
      <Header />
      <div className="flex-grow flex flex-col items-start justify-start px-4 sm:px-20 py-3 mt-3 font-GmarketLight text-[10px] sm:text-[12px]">
        <div className="flex items-center justify-between w-full mb-4">
          <h2 className="font-GmarketLight text-[#000000] text-[15px] sm:text-[18px]">CSV 파일 업로드</h2>
        </div>

        <div className="w-full p-4 sm:p-6 rounded-md shadow-[0_0_10px_#CED3FF] mb-4">
          <h3 className="font-GmarketMedium text-[12px] sm:text-[14px] text-[#002e72] mb-3">CSV 파일 형식 안내</h3>
          <div className="space-y-3 text-[10px] sm:text-[12px] text-[#061E5B]">
            <p className="mb-2">엑셀 파일을 다음과 같은 CSV 형식으로 변환해주세요:</p>
            <div className="bg-gray-50 p-3 rounded-md font-mono text-[10px] sm:text-[11px]">
              날짜, 내용, 입금, 출금
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
              </ol>
            </div>

            <div className="mt-4">
              <p className="mb-2 font-GmarketMedium">주의사항:</p>
              <ul className="ml-2 space-y-1 list-disc list-inside">
                <li>위의 형식과 반드시 동일해야 합니다.</li>
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

            {/* 미리보기 */}
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
