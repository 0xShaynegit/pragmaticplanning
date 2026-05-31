/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './assets/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        canvas: '#FCFAF2',
        ink: '#0A0A0A',
        'accent-green': '#005F4B',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderWidth: {
        '0.5': '0.5px',
      },
      gridTemplateColumns: {
        '12': 'repeat(12, minmax(0, 1fr))',
      },
      maxWidth: {
        'editorial': '1440px',
      },
      letterSpacing: {
        'mono': '0.15em',
      },
    },
  },
  plugins: [],
}
