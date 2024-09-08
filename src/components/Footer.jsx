import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#DDE5FA] px-12 py-8 text-left text-[#747474] text-[8px] sm:text-[10px]">
      <Link to="/privacy-policy" className="font-GmarketMedium hover:underline">
        개인정보처리방침
      </Link>
      <br />
      <span className="font-GmarketMedium">Copyright ⓒ ToMyongJi. All Rights Reserved</span>
      <p className="font-GmarketLight">
        {/* <br />
        명지대학교(인문) 멋쟁이백마처럼
        <br />
        대표자 : 이준규
        <br />
        팀원 : 이서현, 박진형
        <br />
        주소 : 서울특별시 서대문구 거북골로 34
        <br />
        연락처 : 010 - 6540 -3642 */}
        E-mail: junnkyuu22@gmail.com
      </p>
    </footer>
  );
};

export default Footer;
