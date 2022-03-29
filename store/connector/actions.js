export default {
  configureProviders({ commit }, configuration = {}) {
    const { providers = [] } = configuration
    commit('SET_SUPPORTED_PROVIDERS', providers)
  },
  setActiveProviderId({ commit }, providerId) {
    commit('SET_ACTIVE_PROVIDER_ID', providerId)
  },
}
