import Header from '../components/Header';
import IntroduceCard from '../components/IntroduceCard';
import Footer from '../components/Footer';
import IntroduceImageCard from '../components/IntroduceImageCard';

import logo from '../assets/images/logo.png';
import receiptList from '../assets/images/receipts-list.png';
import createReceipt from '../assets/images/create-receipt.png';
import myPage from '../assets/images/my-page.png';

const Home = () => {
  return (
    <div className="max-w-[600px] min-h-screen ml-auto mr-auto bg-white">
      <Header />
      {/* 페이지 소개 */}
      <div className="flex flex-col items-center justify-center p-10">
        {/* 투명지 소개 */}
        <div className="w-full sm:w-[90%] flex items-center justify-between mb-[100px]">
          <img className="w-[45%] sm:w-[40%]" src={logo} alt="투명지 로고 이미지" />
          <div className="w-[50%] text-[#061E5B] text-[12px] sm:text-[14px] flex flex-col justify-between py-2 font-GmarketLight h-[115px] sm:h-[170px]">
            <p>투명한 명지의 줄임말로, 학생회비 사용 내역을 투명하고 간편하게 조회할 수 있는 서비스입니다.</p>
            <br />
            <p>영어로는 To MyongJi 로, 명지대 학생들에게 라는 의미 또한 가지고 있습니다 :)</p>
          </div>
        </div>
        {/* 기능 소개 */}
        {/* 조회 버튼 */}
        <div className="w-full sm:w-[90%] flex items-center justify-between mb-[100px]">
          <div className="w-[45%]">
            <IntroduceCard
              contentText={'화면 메뉴의 조회버튼을 클릭하여 원하는 대학과 소속을 선택하면 조회가 가능합니다.'}
              buttonText={'융합소프트웨어학부 학생회비 사용 내역 조회 하러 가기'}
              path={'/receipts-list/1'}
            />
          </div>
          <div className="w-[45%] flex justify-end">
            <IntroduceImageCard image={receiptList} />
          </div>
        </div>
        {/* 작성 버튼 */}
        <div className="w-full sm:w-[90%] flex items-center justify-between mb-[100px]">
          <div className="w-[45%] flex justify-start">
            <IntroduceImageCard image={createReceipt} />
          </div>
          <div className="w-[45%]">
            <IntroduceCard
              contentText={'학생회 소속일 경우 수기 또는 사진을 찍어 영수증 작성이 가능합니다.'}
              buttonText={'학과 학생회비 사용 내역 작성 하러 가기'}
              path={'/create-receipt'}
            />
          </div>
        </div>
        {/* 마이 버튼 */}
        <div className="w-full sm:w-[90%] flex items-center justify-between mb-[100px]">
          <div className="w-[45%]">
            <IntroduceCard
              contentText={
                '학생회 소속일 경우 내 정보 관리를 할 수 있고, 학생회 회장일 경우 소속원 관리까지 할 수 있습니다.'
              }
              buttonText={'마이 ���이지 조회 하러 가기'}
              path={'/my-page'}
            />
          </div>
          <div className="w-[45%] flex justify-end">
            <IntroduceImageCard image={myPage} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
