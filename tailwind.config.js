const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Montserrat', ...defaultTheme.fontFamily.sans],
        'encode': ['"Encode Sans Expanded"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
