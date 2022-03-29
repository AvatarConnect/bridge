import Meebits from './Meebits'
import ReadyPlayerMe from './ReadyPlayerMe'

const providers = [Meebits, ReadyPlayerMe]

export const PROVIDER_MAP = providers.reduce(
  (acc, provider) => ({ ...acc, [provider.id]: provider }),
  {}
)

export default providers
