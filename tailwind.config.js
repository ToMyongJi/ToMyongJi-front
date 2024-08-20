const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
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
