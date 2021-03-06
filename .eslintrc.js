module.exports = {
  extends: ['monaverse/vue'],
  settings: {
    'import/resolver': {
      alias: {
        extensions: ['.ts', 'tsx', '.graphql', '.js', '.jsx', '.json', '.vue'],
        map: [
          ['@', './components/'],
          ['~', './'],
          ['@local', './packages/'],
        ],
      },
    },
  },
}
