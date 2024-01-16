/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "App.tsx",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#43C651",
        primaryBold: "#056526",
        primaryText: "#555",
      },
    },
  },
  plugins: [],
};
