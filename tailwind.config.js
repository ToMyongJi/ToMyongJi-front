const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // 이 경로에 있는 파일들을 모두 포함
  ],
  theme: {
    extend: {},
    fontFamily: {
      GmarketLight: ['GmarketSansLight'],
      GmarketMedium: ['GmarketSansMedium'],
      GmarketBold: ['GmarketSansBold'],
    },
  },
  plugins: [],
});
