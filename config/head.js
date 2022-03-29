const CSP = `
default-src *  data: blob: filesystem: about: ws: wss: 'unsafe-inline' 'unsafe-eval';
script-src * data: blob: 'unsafe-inline' 'unsafe-eval';
connect-src * data: blob: 'unsafe-inline';
img-src * data: blob: 'unsafe-inline';
frame-src * data: blob: ;
style-src * data: blob: 'unsafe-inline';
font-src * data: blob: 'unsafe-inline';
`

const stylesheets = ['fonts', 'main']

export default {
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    {
      lang: 'css',
      src: '@fortawesome/fontawesome-svg-core/styles.css',
    },
    ...stylesheets.map(name => ({
      lang: 'css',
      src: `~/assets/css/${name}.css`,
    })),
  ],

  head: {
    htmlAttrs: {
      lang: 'en',
    },
    link: [
      {
        href: '/favicon/apple-touch-icon.png',
        rel: 'apple-touch-icon',
        size: '180x180',
        type: 'image/png',
      },
      {
        href: '/favicon/favicon-32x32.png',
        rel: 'icon',
        size: '32x32',
        type: 'image/png',
      },
      {
        href: '/favicon/favicon-16x16.png',
        rel: 'icon',
        size: '16x16',
        type: 'image/png',
      },
      { href: '/favicon/site.webmanifest', rel: 'manifest' },
      {
        color: '#19424d',
        href: '/favicon/safari-pinned-tab.svg',
        rel: 'mask-icon',
      },
      { href: '/favicon/favicon.ico', rel: 'shortcut icon' },
    ],
    meta: [
      { charset: 'utf-8' },
      { content: 'width=device-width, initial-scale=1', name: 'viewport' },
      {
        content: 'Experience 3D NFT art in a social, immersive gallery space',
        hid: 'description',
        name: 'description',
      },
      { content: '#FF2D55', name: 'msapplication-TileColor' },
      { content: '/favicon/browserconfig.xml', name: 'msapplication-config' },
      { content: '#001d04', name: 'theme-color' },
      {
        content: CSP,
        'http-equiv': 'Content-Security-Policy',
      },
    ],
    title: 'AvatarConnect',
  },

  meta: {
    ogDescription: false,
    ogTitle: false,
    ogType: false,
  },
}
