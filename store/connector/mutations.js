import model from './model'

export default {
  RESET_STATE: state => {
    Object.keys(model).forEach(k => {
      state[k] = model[k]
    })
  },

  SET_ACTIVE_PROVIDER_ID: (state, providerId) => {
    state.activeProviderId = providerId
  },

  SET_SUPPORTED_PROVIDERS: (state, providers) => [
    (state.supportedProviders = providers),
  ],
}
