const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: false,
  // or 'media' or 'class'
  jit: true,
  purge: {
    content: [
      `components/**/*.{vue,js}`,
      `layouts/**/*.vue`,
      `pages/**/*.vue`,
      `plugins/**/*.{js,ts}`,
      `nuxt.config.{js,ts}`,
    ],
    enabled: process.env.NODE_ENV === 'production',
  },
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
        primary: '#FF2D55',
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
