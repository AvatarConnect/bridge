import model from './model'

export default {
  RESET_STATE: state => {
    Object.keys(model).forEach(k => {
      state[k] = model[k]
    })
  },

  SET_CONNECTED: state => {
    state.isConnected = true
  },

  SET_PROVIDER_ID: (state, providerId) => {
    state.providerId = providerId
  },
}
