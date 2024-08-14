import Header from '../../components/Header';

const Find = () => {
  return (
    <div className="max-w-[600px] min-h-screen mx-auto bg-white flex flex-col">
      <Header />
      <div className="flex flex-col items-center justify-center px-4 sm:px-20 py-10 mt-3 font-GmarketLight text-[10px] sm:text-[12px]">
        {/* 아이디 찾기 */}
        <div className="w-full mb-8 p-4 sm:p-6 rounded-md shadow-[0_0_10px_#CED3FF]">
          <h2 className="font-GmarketMedium text-[#002e72] text-[15px] sm:text-[18px] mb-4">아이디 찾기</h2>
          <div className="flex flex-col p-2 space-y-6">
            <div className="flex flex-wrap items-center">
              <label className="w-full sm:w-[65px] text-[#002e72] mb-2 sm:mb-0">이름</label>
              <input
                type="text"
                className="w-full sm:w-[calc(100%-65px)] p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
              />
            </div>
            <div className="flex flex-wrap items-center">
              <label className="w-full sm:w-[65px] text-[#002e72] mb-2 sm:mb-0">이메일 주소</label>
              <div className="w-full sm:w-[calc(100%-65px)] flex flex-col sm:flex-row">
                <input
                  type="email"
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CED3FF] mb-2 sm:mb-0 sm:mr-2"
                />
                <button className="w-full sm:w-auto px-4 py-2 text-white bg-[#CED3FF] rounded shadow-[0_4px_6px_rgba(156,163,255,0.5)] hover:shadow-[0_6px_8px_rgba(156,163,255,0.7)] transition-shadow duration-300 whitespace-nowrap">
                  인증번호 발송
                </button>
              </div>
            </div>
            <div className="flex flex-wrap items-center">
              <label className="w-full sm:w-[65px] text-[#002e72] mb-2 sm:mb-0">인증번호</label>
              <input
                type="text"
                className="w-full sm:w-[calc(100%-65px)] p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
              />
            </div>
            <button className="w-full py-2 text-white bg-[#CED3FF] rounded shadow-[0_4px_6px_rgba(156,163,255,0.5)] hover:shadow-[0_6px_8px_rgba(156,163,255,0.7)] transition-shadow duration-300">
              인증확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Find;
