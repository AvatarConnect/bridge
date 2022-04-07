export default {
  image: {
    cloudinary: {
      // eslint-disable-next-line xss/no-mixed-html
      baseURL: `https://res.cloudinary.com/${process.env.CLOUDINARY_NAME}/image/fetch/`,
    },
  },
  modules: [
    'nuxt-route-meta',
    '@nuxtjs/axios',
    '@nuxt/image',
    '@nuxtjs/pwa',
    'nuxt-user-agent',
    ['nuxt-helmet', { frameguard: false }],
    [
      'nuxt-i18n',
      {
        defaultLocale: 'en',
        detectBrowserLanguage: {
          cookieKey: 'i18n_redirected',
          onlyOnRoot: true,
          useCookie: true, // recommended
        },
        langDir: 'locales/',
        lazy: true,
        locales: [
          {
            code: 'en',
            file: 'en.js',
          },
        ],
        strategy: 'no_prefix',
        vueI18nLoader: true,
      },
    ],
  ],
  tailwind: {
    exposeConfig: true,
  },
}
