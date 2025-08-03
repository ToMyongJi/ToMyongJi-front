import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { uploadTossFile } from "../../utils/receiptApi";
import useAuthStore from "../../store/authStore";
import tossCheck from "../../assets/images/tossCheck.png";

const UploadTossReceipt = () => {
  const navigate = useNavigate();
  const { authData } = useAuthStore();
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  // 사용자 인증 및 데이터 로드
  useEffect(() => {
    if (authData?.accessToken) {
      try {
        const decodedToken = JSON.parse(
          atob(authData.accessToken.split(".")[1])
        );
        setUserId(decodedToken.sub);
      } catch (error) {
        console.error("액세스 토큰 디코딩 중 오류 발생:", error);
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
      alert("파일을 선택해주세요.");
      return;
    }

    setIsLoading(true);
    try {
      if (!userId) {
        alert("사용자 ID를 찾을 수 없습니다.");
        return;
      }

      const response = await uploadTossFile(userId, file);

      if (response.statusCode === 200) {
        const receipts = response.data;
        alert("거래내역서가 성공적으로 업로드되었습니다.");
        navigate(`/create-receipt`);
      } else {
        alert("거래내역서 업로드에 실패했습니다.");
      }
    } catch (error) {
      console.error("데이터 업로드 중 오류 발생:", error);
      alert("데이터 업로드 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-[600px] min-h-screen mx-auto bg-white flex flex-col">
      <Header />
      <div className="flex-grow flex flex-col items-start justify-start px-4 sm:px-20 py-3 mt-3 font-GmarketLight text-[10px] sm:text-[12px]">
        <div className="flex items-center justify-between w-full mb-4">
          <h2 className="font-GmarketMedium text-[#002E72] text-[15px] sm:text-[18px]">
            토스뱅크 거래내역서 인증
          </h2>
        </div>
        <div className="w-full p-4 sm:p-6 rounded-md shadow-[0_0_10px_#CED3FF] mb-4">
          <div className="flex items-center mb-3">
            <div className="pt-0.5 font-GmarketMedium text-[12px] sm:text-[14px] text-[#002e72]">
              거래내역서 인증 마크 안내
            </div>
            <img
              src={tossCheck}
              alt="거래내역서 인증 이미지"
              className="w-63 h-5 ml-2"
            />
          </div>
          <div className="space-y-2 text-[10px] sm:text-[12px] text-[#061E5B]">
            <p className="mb-2 text-black">
              전체 입출금 내역의 30% 이상이 토스뱅크 거래내역서로 인증되면
            </p>
            <p className="mb-2 text-black">
              해당 학생회의 영수증 페이지 조회 시 거래내역서 인증 마크가
              추가됩니다.
            </p>
          </div>
          <div className="mt-5">
            <h3 className="flex font-GmarketMedium text-[12px] sm:text-[14px] text-[#002e72] mb-3">
              엑셀 파일을 CSV로 변환하는 방법:
            </h3>
            <ol className="ml-2 space-y-2 list-decimal list-inside">
              <li>통장 탭 → 통장관리를 선택합니다.</li>
              <li>문서관리 카테고리에서 거래내역서를 선택합니다.</li>
              <li>발급방법을 'PDF로 저장하기'로 선택합니다.</li>
              <li>언어 한글 선택 → 거래내역을 확인할 계좌를 선택합니다.</li>
              <li>
                거래내역 기간 선택 → '입출금 전체' 선택 후 발급을 완료합니다.
              </li>
            </ol>
          </div>
        </div>

        <div className="w-full p-4 sm:p-6 rounded-md shadow-[0_0_10px_#CED3FF]">
          <div className="flex flex-col space-y-4">
            <div className="flex justify-center w-full">
              <label className="w-1/4 px-3 py-2 text-[#061E5B] rounded-md shadow-[0_0_10px_#CED3FF] hover:shadow-[0_0_15px_#A0A9FF] border-none cursor-pointer transition duration-300 text-center">
                파일 선택
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
            {file && (
              <p className="text-center text-[#061E5B] text-[12px] sm:text-[14px]">
                선택된 파일: {file.name}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-center w-full mt-8 mb-10 space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="w-1/4 px-3 py-2 text-[#061E5B] rounded-md shadow-[0_0_10px_#CED3FF] hover:shadow-[0_0_15px_#A0A9FF] border border-[#CED3FF] transition duration-300"
          >
            취소
          </button>
          <button
            onClick={handleUpload}
            disabled={!file || isLoading}
            className={`w-1/4 px-3 py-2 rounded-md shadow-[0_0_10px_#CED3FF] hover:shadow-[0_0_15px_#A0A9FF] border-none transition duration-300 ${
              !file || isLoading
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-[#061E5B] text-white hover:bg-[#0A307D]"
            }`}
          >
            {isLoading ? "업로드 중..." : "업로드"}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UploadTossReceipt;
