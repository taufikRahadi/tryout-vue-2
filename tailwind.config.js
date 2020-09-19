module.exports = {
  future: {},
  purge: [
    './public/**/*.html',
    './src/**/*.vue'
  ],
  theme: {
    extend: {
      colors: {
        half: 'rgba(0, 0, 0, .24)',
        dark: 'rgba(0, 0, 0, .45)'
      },
      fontFamily: {
        nunito: ['nunito']
      }
    },
  },
  variants: {},
  plugins: [],
}
