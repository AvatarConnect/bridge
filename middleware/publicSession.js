export default async ({ store, $config }) => {
  if (process.browser) return
  const { infuraId } = $config
  await store.dispatch('app/setPublicSession', {
    infuraId,
  })
}
