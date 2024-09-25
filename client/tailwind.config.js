/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}',],
  theme: {
    extend: {
      colors: {
        CustomPurple: '#e8e2ff',
        DarkPurple: '#6f5acd',
        DarkPurpleShade2: '#543eb5',
        CustomPink:'#ff93dd',
      }
    },
  },
  plugins: [],
}
