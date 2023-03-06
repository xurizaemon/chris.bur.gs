const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{html,njk,md,js,css}"
  ],
  screens: {
    sm: '480px',
    md: '768px',
    lg: '976px',
    xl: '1440px'
  },
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
  safelist: [{
    pattern: /hljs+/,
  }],
  plugins: [
    require('@tailwindcss/typography')
  ]
}
