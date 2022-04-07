import Providers from './providers'

export default {
  activeProvider: state => {
    const { activeProviderId } = state
    return activeProviderId ? Providers[activeProviderId] : null
  },
  activeProviderConfig: state => {
    const { activeProviderId, config } = state
    return config[activeProviderId] || {}
  },
  activeProviderId: state => state.activeProviderId || null,
  providers: state =>
    state.supportedProviders
      .map(id => Providers[id])
      .filter(provider => !!provider),
  supportedProviders: state =>
    state.supportedProviders || ['meebits', 'readyplayerme'],
}
