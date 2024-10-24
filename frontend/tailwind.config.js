/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      poppins: ["Poppins"],
    },
    backgroundImage: {
      akmpic: "url('./src/assets/my-picture.png')",
    },
    animation: {
      "bounce-slow": "bounce 0.7s linear infinite",
    },
  },
  plugins: [],
};
