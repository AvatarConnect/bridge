export default {
  setPublicSession({ commit }, { infuraId }) {
    commit('SET_SESSION', { infuraId })
  },
}
