export default ({ route, store }) => {
  const [{ theme = {} }] = route.meta || [{}]
  store.dispatch('theme/setPageTheme', theme)
}
