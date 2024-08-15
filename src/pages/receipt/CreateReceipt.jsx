import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import addCircle from '../../assets/images/add-circle.png';
import addFile from '../../assets/images/add-file.png';
import deleteButton from '../../assets/images/delete.png';

const CreateReceipt = () => {
  const [date, setDate] = useState('');
  const [content, setContent] = useState('');
  const [deposit, setDeposit] = useState('');
  const [withdrawal, setWithdrawal] = useState('');
  const [receiptData, setReceiptData] = useState([
    { date: '2023-05-01', content: '회비', deposit: 50000, withdrawal: 0 },
    { date: '2023-05-05', content: '간식 구매', deposit: 0, withdrawal: 30000 },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !content) {
      alert('빠진 내용이 없나 확인해주세요.');
      return;
    }
    const newItem = {
      date,
      content,
      deposit: Number(deposit) || 0,
      withdrawal: Number(withdrawal) || 0,
    };
    setReceiptData([...receiptData, newItem]);
    setDate('');
    setContent('');
    setDeposit('');
    setWithdrawal('');
  };

  const handleImageUpload = () => {
    // 이미지 업로드
  };

  const handleDelete = (index) => {
    setReceiptData(receiptData.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    // 저장 로직
    alert('영수증이 저장되었습니다.');
  };

  return (
    <div className="max-w-[600px] min-h-screen mx-auto bg-white flex flex-col">
      <Header />
      <div className="flex-grow flex flex-col items-start justify-start px-4 sm:px-20 py-3 mt-3 font-GmarketLight text-[10px] sm:text-[12px]">
        <div className="flex items-center justify-between w-full mb-4">
          <h2 className="font-GmarketLight text-[#000000] text-[15px] sm:text-[18px]">융합소프트웨어학부 학생회</h2>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={handleImageUpload}
              className="p-1 sm:p-2 rounded-lg hover:bg-[#CED3FF] transition duration-300"
            >
              <img src={addFile} alt="사진 첨부" className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>
            <button onClick={handleSubmit} className="p-1 sm:p-2 rounded-lg hover:bg-[#CED3FF] transition duration-300">
              <img src={addCircle} alt="추가" className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
        <div className="w-full p-4 sm:p-6 rounded-md shadow-[0_0_10px_#CED3FF]">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div className="flex space-x-2">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-1/6 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
                placeholder="날짜"
              />
              <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-2/5 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
                placeholder="내용"
              />
              <input
                type="text"
                value={deposit}
                onChange={(e) => setDeposit(e.target.value)}
                className="w-1/6 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
                placeholder="입금"
              />
              <input
                type="text"
                value={withdrawal}
                onChange={(e) => setWithdrawal(e.target.value)}
                className="w-1/6 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#CED3FF]"
                placeholder="출금"
              />
            </div>
          </form>
        </div>

        {/* 영수증 내역 */}
        <div className="w-full mt-8 mb-10 p-2 sm:p-4 rounded-md shadow-[0_0_10px_#CED3FF]">
          <div className="flex justify-center font-GmarketMedium my-1 pb-4 text-[12px] sm:text-[14px] text-[#002e72]">
            <div className="flex items-center w-4/5">
              <span className="w-1/4">날짜</span>
              <span className="w-1/4">내용</span>
              <span className="w-1/4 text-right">입금</span>
              <span className="w-1/4 text-right">출금</span>
            </div>
          </div>
          <div className="flex flex-col space-y-7">
            {receiptData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="w-1/5">{item.date}</span>
                <span className="w-1/5">{item.content}</span>
                <span className="w-1/5 text-right text-blue-500">
                  {item.deposit > 0 ? `+${item.deposit.toLocaleString()}` : ''}
                </span>
                <span className="w-1/5 text-right text-red-500">
                  {item.withdrawal > 0 ? `-${item.withdrawal.toLocaleString()}` : ''}
                </span>
                <button
                  onClick={() => handleDelete(index)}
                  className="p-1 rounded-lg hover:bg-[#FFF0F5] transition duration-300"
                >
                  <img src={deleteButton} alt="삭제" className="w-2 h-2 sm:w-4 sm:h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 작성하기 버튼 추가 */}
        <div className="flex justify-center w-full mt-4">
          <button
            onClick={handleSave}
            className="w-1/4 px-3 py-2 text-[#061E5B] rounded-md shadow-[0_0_10px_#CED3FF] hover:shadow-[0_0_15px_#A0A9FF] border-none cursor-pointer transition duration-300"
          >
            작성하기
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateReceipt;
