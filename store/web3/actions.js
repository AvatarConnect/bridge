export default {
  async changeProvider({ dispatch }, providerId) {
    await dispatch('disconnect')
    await dispatch('connect', providerId)
  },
  async connect({ commit, getters }, providerId) {
    try {
      commit('SET_CONNECTING', true)
      providerId = providerId || getters.providerId
      commit('SET_PROVIDER_ID', providerId)
      await getters.providerConfig.connect(getters.provider)
      const [address] = await getters.provider.request({
        method: 'eth_requestAccounts',
      })
      commit('SET_CONNECTED', address)
    } finally {
      commit('SET_CONNECTING', false)
    }
  },
  async disconnect({ commit, getters }) {
    const { providerConfig, provider } = getters
    if (providerConfig) providerConfig.disconnect(provider)
    commit('RESET_STATE')
  },
}
