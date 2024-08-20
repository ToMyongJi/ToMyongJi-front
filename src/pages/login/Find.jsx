import { useState } from 'react';
import Header from '../../components/Header';
import { findUserId } from '../../utils/authApi';

const Find = () => {
  const [email, setEmail] = useState('');
  const [foundUserId, setFoundUserId] = useState('');
  const [error, setError] = useState('');

  const handleFindUserId = async () => {
    try {
      setError('');
      setFoundUserId('');
      const userId = await findUserId(email);
      setFoundUserId(userId);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="max-w-[600px] min-h-screen mx-auto bg-white flex flex-col">
      <Header />
      <div className="flex flex-col items-center justify-center px-4 sm:px-20 py-10 mt-3 font-GmarketLight text-[10px] sm:text-[12px]">
        <div className="w-full mb-8 p-4 sm:p-6 rounded-md shadow-[0_0_10px_#CED3FF]">
          <h2 className="font-GmarketMedium text-[#002e72] text-[15px] sm:text-[18px] mb-4">아이디 찾기</h2>
          <div className="flex flex-col p-2 space-y-6">
            <div className="flex flex-wrap items-center">
              <label className="w-full sm:w-[65px] text-[#002e72] mb-2 sm:mb-0">이메일 주소</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full sm:w-[calc(100%-65px)] p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
              />
            </div>
            <button
              onClick={handleFindUserId}
              className="w-full py-2 text-white bg-[#CED3FF] rounded shadow-[0_4px_6px_rgba(156,163,255,0.5)] hover:shadow-[0_6px_8px_rgba(156,163,255,0.7)] transition-shadow duration-300"
            >
              아이디 찾기
            </button>
            {error && <p className="text-red-500">{error}</p>}
            {foundUserId && <p className="text-green-500">찾은 아이디: {foundUserId}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Find;
