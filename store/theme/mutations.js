import model from './model'

export default {
  RESET_STATE: state => {
    Object.keys(model).forEach(k => {
      state[k] = model[k]
    })
  },

  SET_BREAKPOINT: (state, breakpoint) => {
    state.breakpoint = breakpoint
  },

  SET_PAGE_THEME: (state, { dark = false } = {}) => {
    state.dark = dark
  },
}
