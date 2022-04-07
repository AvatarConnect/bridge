import model from './model'

export default {
  RESET_STATE: state => {
    Object.keys(model).forEach(k => {
      state[k] = model[k]
    })
  },

  SET_SESSION: (state, { infuraId }) => {
    state.infuraId = infuraId
  },
}
