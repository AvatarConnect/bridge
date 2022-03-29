import { PROVIDER_MAP } from '~/providers'

export default {
  activeProvider: state => {
    const { activeProviderId } = state
    return activeProviderId ? PROVIDER_MAP[activeProviderId] : null
  },
  activeProviderId: state => state.activeProviderId || null,
  providers: state =>
    state.supportedProviders
      .map(id => PROVIDER_MAP[id])
      .filter(provider => !!provider),
  supportedProviders: state =>
    state.supportedProviders || ['meebits', 'readyplayerme'],
}
