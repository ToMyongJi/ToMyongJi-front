const KakaoLogin = () => {
  const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const REDIRECT_URI = import.meta.env.VITE_PERFORM_REDIRECT_URI;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;

  const clickToKakao = () => {
    window.location.replace(`${KAKAO_AUTH_URL}`);
    console.log(`카카오 url: ${KAKAO_AUTH_URL}`);
  };

  return (
    <div className="w-[80%]">
      <button
        className="w-[100%] h-[40px] rounded-[5px] bg-[#FEE502] flex items-center justify-center text-sm font-GmarketMedium hover:bg-[#9E8E00] active:bg-[#5B5200]"
        onClick={clickToKakao}
      >
        <img
          className="mr-[10px]"
          width="24"
          height="24"
          src="//yaimg.yanolja.com/joy/sunny/static/images/login/ic-login-kakao.svg"
          alt="kakao_icon"
        ></img>
        카카오로 시작하기
      </button>
    </div>
  );
};

export default KakaoLogin;
