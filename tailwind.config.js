/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./layouts/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3DB46D",
        danger: "#EB5757",
        secondary: "#BDBDBD",
        darkgrey: "#333333",
        white: "#FFFFFF",
      },
      keyframes: {
        spinreverse: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(-360deg)" },
        },
      },
      animation: {
        spinreverse: "spinreverse 1s linear infinite",
      },
    },
  },
  plugins: [],
};
