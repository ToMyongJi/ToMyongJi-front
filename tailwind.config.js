import withMT from '@material-tailwind/react/utils/withMT';

export default withMT({
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
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
