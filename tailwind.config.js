/** @type {import('tailwindcss').Config} */
module.exports = {
  // Chỉ định Tailwind quét các file này để áp dụng style
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Định nghĩa bảng màu thương hiệu
      colors: {
        primary: '#667eea',    // Màu xanh tím chủ đạo
        secondary: '#764ba2',  // Màu tím đậm cho gradient
        accent: '#e74c3c',     // Màu đỏ cam logo/nút
        success: '#2ecc71',    // Màu xanh lá thông báo
      },
      // Định nghĩa Font chữ Poppins
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
};