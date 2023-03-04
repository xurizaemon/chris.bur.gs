const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{html,njk,md}"
  ],
  theme: {
    colors: {
      // Build your palette here
      transparent: 'transparent',
      current: 'currentColor',
      gray: colors.trueGray,
      red: colors.red,
      blue: colors.lightBlue,
      yellow: colors.amber,
    },
    extend: {},
  },
  plugins: []
}
