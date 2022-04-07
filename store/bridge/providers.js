import Providers from '~/providers'

export default Object.values(Providers).reduce(
  (acc, provider) => ({ ...acc, [provider.id]: provider }),
  {}
)
