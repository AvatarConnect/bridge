export default {
  modules: [
    'nuxt-route-meta',
    '@nuxtjs/axios',
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
