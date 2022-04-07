const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    `components/**/*.{vue,js}`,
    `layouts/**/*.vue`,
    `pages/**/*.vue`,
    `plugins/**/*.{js,ts}`,
    `nuxt.config.{js,ts}`,
  ],
  jit: true,
  media: false,
  theme: {
    extend: {
      animation: {
        fadeSlideDown: 'fadeSlideDown 1s ease',
        fadeSlideDownFast: 'fadeSlideDown 0.5s ease',
        fadeSlideDownSlow: 'fadeSlideDown 2s ease',
        fadeSlideUp: 'fadeSlideUp 1s ease',
        fadeSlideUpFast: 'fadeSlideUp 0.5s ease',
        fadeSlideUpSlow: 'fadeSlideUp 2s ease',
      },
      colors: {
        primary: '#5200FF',
        secondary: '#FF7ECC',
        tertiary: '#181818',
      },
      keyframes: {
        fadeSlideDown: {
          '0%': {
            opacity: 0,
            transform: 'translateY(-30px)',
          },
          '100%': { opacity: 1 },
        },
        fadeSlideUp: {
          '0%': {
            opacity: 0,
            transform: 'translateY(30px)',
          },
          '100%': { opacity: 1 },
        },
      },
    },
    fontFamily: {
      sans: ['Newline Text', ...defaultTheme.fontFamily.sans],
    },
    screens: {
      '2xl': { max: '1535px' },
      lg: { max: '1023px' },
      md: { max: '767px' },
      sm: { max: '639px' },
      xl: { max: '1279px' },
    },
  },
}
