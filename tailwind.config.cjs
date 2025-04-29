/** @type {import('tailwindcss').Config} */
module.exports = {
  // ← Tell Tailwind which files to scan for class names
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,css}',
  ],

  theme: {
    extend: {
      colors: {
        bg:      '#F7F7F7',
        text:    '#2A2A2A',
        redline: '#C0747C',
        gradeA:  '#5C8546',
        gradeB:  '#59829C',
        gradeC:  '#DACE74',
      },
      fontFamily: {
        sans:  ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },

  // no extra plugins for now
  plugins: [],
}
