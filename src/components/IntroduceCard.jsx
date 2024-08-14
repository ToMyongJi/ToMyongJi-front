import React from 'react';
import { useNavigate } from 'react-router-dom';

const IntroduceCard = ({ contentText, buttonText, path }) => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate(path);
  };

  return (
    <div className="text-[#061E5B] font-GmarketLight text-[12px] sm:text-[14px] flex flex-col items-start justify-center rounded-lg">
      <p className="p-1 mb-5">{contentText}</p>
      <button
        className="px-3 py-4 rounded-md shadow-[0_0_10px_#CED3FF] hover:shadow-[0_0_15px_#A0A9FF] border-none cursor-pointer transition duration-300"
        onClick={handleOnClick}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default IntroduceCard;
