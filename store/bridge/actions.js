import Providers from '~/providers'

const providerList = Object.values(Providers).map(({ id }) => id)

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

const mergeConfig = (selectedProviders, providedConfig) => {
  const result = selectedProviders.reduce(
    (acc, provider) => ({
      ...acc,
      [provider]: prepareProps(Providers[provider], providedConfig[provider]),
    }),
    {}
  )
  return result
}

export default {
  configureProviders({ commit }, config = {}) {
    try {
      const { providers = providerList, ...providerConfig } = config
      commit('SET_SUPPORTED_PROVIDERS', providers)
      commit('SET_PROVIDER_CONFIG', mergeConfig(providers, providerConfig))
    } catch (error) {
      throw new Error('Invalid configuration provided')
    }
  },
  setActiveProviderId({ commit }, providerId) {
    commit('SET_ACTIVE_PROVIDER_ID', providerId)
  },
}
