import React from "react";

const IntroduceImageCard = ({ image, text }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="shadow-[0_0_10px_#CED3FF] border-none p-1 sm:w-[200px] w-[150px] rounded-lg mb-1.5">
        <img
          src={image}
          alt="조회 버튼을 눌렀을 때 화면"
          className="rounded-lg"
        />
      </div>
      <p className="p-1 font-GmarketLight text-[7px] text-[#97A0C2]">{text}</p>
    </div>
  );
};

export default IntroduceImageCard;
