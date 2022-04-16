import Providers from '~/providers'

const formatProvider = provider => {
  if (provider.name) {
    const parts = provider.name.split('|')
    provider.name = parts[0]
    provider.pluralName = parts[1] || `${parts[0]}s`
  }
  return provider
}

export default Object.values(Providers).reduce(
  (acc, provider) => ({ ...acc, [provider.id]: formatProvider(provider) }),
  {}
)
