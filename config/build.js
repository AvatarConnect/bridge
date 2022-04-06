import { resolve } from 'path'

export default {
  alias: {
    '@': resolve(__dirname, '../components'),
    '@local': resolve(__dirname, '../packages'),
    '~': resolve(__dirname, '../'),
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, { isClient }) {
      if (isClient) {
        config.module.rules.push({
          exclude: /(node_modules)/,
          test: /\.worker\.js$/,
          use: { loader: 'worker-loader' },
        })
      }
    },
    postcss: {
      plugins: {
        'postcss-hexrgba': {},
        'postcss-import': {},
        'postcss-mixins': {},
        'postcss-nested': {},
        'postcss-simple-vars': {},
      },
      preset: {
        autoprefixer: {
          grid: true,
        },
      },
    },
    transpile: ['vee-validate'],
  },

  buildDir: 'dist',

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',

    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },
  server: {
    port: 8000, // default: 3000
  },
}
