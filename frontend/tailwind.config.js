/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/daisyui/dist/**/*.js", // Đảm bảo DaisyUI được quét
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'), // Thêm DaisyUI vào các plugin
  ],
  darkMode: 'class', // Đảm bảo darkMode là 'class'
};
