/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'noto-serif': ['Noto Serif', 'serif'],
        'lobster': ['Lobster', 'cursive'],
      },
      colors: {
        whiteray: '#f1faee', // Primary Color
        skyy: '#a8dadc',    // Secondary Color
        red1 : "8d0801",
        red2 : "bf0603",
        red3: "a4161a",
      },
    },
  },
  plugins: [],
};
