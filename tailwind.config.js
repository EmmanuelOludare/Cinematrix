/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'red': '#FC4747',
        'dark-blue': '#10141E',
        "grayish-blue": '#5A698F',
        'semi-dark-blue': '#161D2F',
        'white': '#FFFFFF',
      },
      fontFamily: {
        outfit: ['"Outfit"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}