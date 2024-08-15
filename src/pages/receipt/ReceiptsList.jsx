import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const ReceiptsList = () => {
  const { groupId } = useParams();

  const sampleData = [
    { date: '2024-08-14', content: '청소도구', deposit: 0, withdrawal: 15000 },
    { date: '2024-08-10', content: '회식비', deposit: 0, withdrawal: 50000 },
    { date: '2024-08-05', content: '학생회비', deposit: 100000, withdrawal: 0 },
    { date: '2024-07-30', content: '문구류', deposit: 0, withdrawal: 8000 },
    { date: '2024-07-25', content: '간식비', deposit: 0, withdrawal: 30000 },
  ];

  // 실제로는 api로
  const groupName = '융합소프트웨어학부 학생회';

  return (
    <div className="max-w-[600px] min-h-screen mx-auto bg-white flex flex-col">
      <Header />
      <div className="flex-grow flex flex-col items-start justify-start px-4 sm:px-20 py-3 mt-3 font-GmarketLight text-[10px] sm:text-[12px]">
        <h2 className="font-GmarketLight text-[#000000] text-[15px] sm:text-[18px] mb-4 self-start">{groupName}</h2>
        <div className="w-full p-4 sm:p-6 rounded-md shadow-[0_0_10px_#CED3FF]">
          <div className="flex items-center justify-between font-GmarketMedium my-1 pb-4 text-[12px] sm:text-[14px] text-[#002e72]">
            <span className="w-1/4">날짜</span>
            <span className="w-1/4">내용</span>
            <span className="w-1/4 text-right">입금</span>
            <span className="w-1/4 text-right">출금</span>
          </div>
          <div className="flex flex-col space-y-7">
            {sampleData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="w-1/4">{item.date}</span>
                <span className="w-1/4">{item.content}</span>
                <span className="w-1/4 text-right text-blue-500">
                  {item.deposit > 0 ? `+${item.deposit.toLocaleString()}` : ''}
                </span>
                <span className="w-1/4 text-right text-red-500">
                  {item.withdrawal > 0 ? `-${item.withdrawal.toLocaleString()}` : ''}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ReceiptsList;
