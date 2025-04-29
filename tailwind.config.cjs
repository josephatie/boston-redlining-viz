// tailwind.config.cjs
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        redline: '#C0747C',   // “D” grade red
        gradeA:   '#5C8546',
        gradeB:   '#59829C',
        gradeC:   '#DACE74',
        bg:       '#F7F7F7',
        text:     '#2A2A2A',
        textSub:  '#555555'
      },
      fontFamily: {
        serif:  ['Playfair Display', 'serif'],
        serif2: ['Merriweather',        'serif'],
        sans:   ['Inter',               'sans-serif']
      }
    }
  },
  plugins: []
}