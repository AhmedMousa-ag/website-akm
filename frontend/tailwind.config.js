/** @type {import('tailwindcss').Config} */
export default {
  content: {
    relative: true,
    files: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,svg,png}"],
  },
  theme: {
    fontFamily: {
      montserrat: ["Montserrat"],
    },
    backgroundImage: {
      akmpic: "url('/src/assets/my-picture.png')",
    },
    animation: {
      "bounce-slow": "bounce 0.7s linear infinite",
    },
  },
  plugins: [],
};
