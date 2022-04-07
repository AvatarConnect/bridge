import model from './model'

export default {
  RESET_STATE: state => {
    Object.keys(model).forEach(k => {
      state[k] = model[k]
    })
  },

  SET_CONNECTED: (state, address) => {
    state.isConnecting = false
    state.isConnected = true
    state.address = address
  },

  SET_CONNECTING: (state, connecting) => {
    state.isConnecting = connecting
  },

  SET_PROVIDER_ID: (state, providerId) => {
    state.providerId = providerId
  },
}
