import CryptoAvatars from './CryptoAvatars'
import Meebits from './Meebits'
import ReadyPlayerMe from './ReadyPlayerMe'

// Add your provider to this list
const providers = [ReadyPlayerMe, Meebits, CryptoAvatars]

export default providers.reduce(
  (acc, provider) => ({ ...acc, [provider.id]: provider }),
  {}
)
