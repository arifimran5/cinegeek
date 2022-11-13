/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}', './index.html'],
  theme: {
    extend: {
      colors: {
        primary_dark: '#262626',
        secondary_dark: '#303030',

        accent: '#7551C1',
        primary_light: '#f3f3f3',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
