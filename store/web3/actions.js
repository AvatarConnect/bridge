export default {
  async changeProvider({ dispatch }, providerId) {
    await dispatch('disconnect')
    await dispatch('connect', providerId)
  },
  async connect({ commit, getters }, providerId) {
    providerId = providerId || getters.providerId
    commit('SET_PROVIDER_ID', providerId)
    await getters.providerConfig.connect(getters.provider)
    commit('SET_CONNECTED')
  },
  async disconnect({ commit, getters }) {
    const { providerConfig, provider } = getters
    if (providerConfig) providerConfig.disconnect(provider)
    commit('RESET_STATE')
  },
}
