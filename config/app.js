const SLOTTED_TEXT_COMPONENTS = ['AcButton', 'AcLoadingText']

export default {
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    {
      extensions: ['vue'],
      ignore: [...SLOTTED_TEXT_COMPONENTS.map(name => `**/${name}/*`)],
      path: '~/components/Base',
    },
    ...SLOTTED_TEXT_COMPONENTS.map(name => ({
      extensions: ['js'],
      path: `~/components/Base/${name}/${name}`,
    })),
  ],

  /* eslint-disable sort-keys-fix/sort-keys-fix */
  /* eslint-disable vue/sort-keys */
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: Object.entries({
    browserGlobals: true,
    download: 'client',
    veeValidate: true,
  }).reduce(
    (plugins, [file, mode]) => [
      ...plugins,
      {
        mode: mode === true ? undefined : mode,
        src: `~/plugins/${file}`,
      },
    ],
    []
  ),

  router: { middleware: ['theme'] },
}
