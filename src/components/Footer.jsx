import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#DDE5FA] px-12 py-8 text-left text-[#747474] text-[8px] sm:text-[10px]">
      <Link to="/privacy-policy" className="font-GmarketMedium hover:underline">
        개인정보처리방침
      </Link>
      <br />
      <span className="font-GmarketMedium">Copyright ⓒ ToMyongJi. All Rights Reserved</span>
      <p className="font-GmarketLight">E-mail: tomyongji2024@gmail.com</p>
    </footer>
  );
};

export default Footer;
