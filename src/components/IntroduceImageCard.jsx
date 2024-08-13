import React from 'react';

const IntroduceImageCard = ({ image }) => {
  return (
    <div>
      <div className="shadow-[0_0_10px_#CED3FF] border-none p-1 sm:w-[200px] w-[150px] rounded-lg">
        <img src={image} alt="조회 버튼을 눌렀을 때 화면" className="rounded-lg" />
      </div>
    </div>
  );
};

export default IntroduceImageCard;
