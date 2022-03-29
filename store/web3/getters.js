import providers from './providers'

export default {
  isConnected: state => state.isConnected,
  provider: (state, _, context) => {
    if (!state.providerId) return null
    return providers[state.providerId].getProvider(context.app.infuraId)
  },
  providerConfig: state => {
    if (!state.providerId) return null
    return providers[state.providerId]
  },
  providerId: state => state.providerId,
}
