import chicken from '../assets/images/chicken.png';

const AdvertiseButton = () => {
  return (
    <button className="text-[11px] sm:text-sm w-full flex flex-nowrap justify-center items-center bg-[#5AE3D6] hover:bg-[#38948B] active:bg-[#235F5A] p-1 sm:py-3 sm:px-4 rounded-[5px]">
      <div className="flex items-center flex-shrink-0 mr-1 space-x-1 sm:mr-2">
        <span className="text-white font-GmarketMedium whitespace-nowrap">여름방학</span>
        <span className="text-[#FFD700] font-GmarketBold whitespace-nowrap">명지닭 30%</span>
        <span className="text-white font-GmarketMedium whitespace-nowrap">행사</span>
      </div>
      <img src={chicken} className="w-6 h-6 sm:w-8 sm:h-8 bg-none" alt="닭가슴살" />
    </button>
  );
};

export default AdvertiseButton;
