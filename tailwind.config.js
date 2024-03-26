/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        kiwi: "#00d26a",
        kiwiCeed: "#1b1c1b",
        kiwiCenter: "#e2ff92",
      },
    },
  },
  plugins: [],
};
