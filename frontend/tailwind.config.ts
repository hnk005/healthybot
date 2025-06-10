/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0CC0DF",
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
        sidebar: "sidebar 1s ease-in-out",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        sidebar: {
          
        }
      },
    },
  },
  plugins: [],
};
