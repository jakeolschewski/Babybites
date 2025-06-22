/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        babyBlue: '#d4e4f1',
        babyPink: '#f4e1d2',
        babyGreen: '#c1e1c5',
      },
    },
  },
  plugins: [],
};
