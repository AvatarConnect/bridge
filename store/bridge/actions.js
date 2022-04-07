import Providers from '~/providers'

const getPropValue = (
  provider,
  key,
  { default: defaultValue, required, validate },
  value
) => {
  if (validate && value && !validate(value))
    throw new Error(`${provider}.${key} is invalid`)
  const valueSet = value !== undefined && value !== null
  if (required && !valueSet)
    throw new Error(`${provider}.${key} is required in your config`)
  return valueSet
    ? value
    : typeof defaultValue === 'function'
    ? defaultValue()
    : defaultValue
}

const prepareProps = (provider, values = {}) => {
  const config = provider.config || {}
  return Object.keys(config).reduce(
    (acc, key) => ({
      ...acc,
      [key]: getPropValue(provider.id, key, config[key], values[key]),
    }),
    {}
  )
}

const mergeConfig = selectedProviders => {
  const result = selectedProviders.reduce((acc, provider) => {
    const isTuple = typeof provider !== 'string'
    const name = isTuple ? provider[0] : provider
    const config = isTuple ? provider[1] : {}
    return { ...acc, [name]: prepareProps(Providers[name], config) }
  }, {})
  return result
}

export default {
  configureProviders({ commit }, config = {}) {
    try {
      const { providers } = config
      commit(
        'SET_SUPPORTED_PROVIDERS',
        providers.map(provider =>
          typeof provider === 'string' ? provider : provider[0]
        )
      )
      commit('SET_PROVIDER_CONFIG', mergeConfig(providers))
    } catch (error) {
      throw new Error('Invalid configuration provided')
    }
  },
  setActiveProviderId({ commit }, providerId) {
    commit('SET_ACTIVE_PROVIDER_ID', providerId)
  },
}
