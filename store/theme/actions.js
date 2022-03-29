export default {
  setBreakpoint({ commit }, breakpoint) {
    commit('SET_BREAKPOINT', breakpoint)
  },

  setPageTheme({ commit }, { dark }) {
    commit('SET_PAGE_THEME', { dark })
  },
}
