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

const prepareProps = ({ config = {}, id }, values = {}) =>
  Object.keys(config).reduce(
    (acc, key) => ({
      ...acc,
      [key]: getPropValue(id, key, config[key], values[key]),
    }),
    {}
  )

const mergeConfig = providers =>
  providers.reduce(
    (acc, { config, id }) => ({
      ...acc,
      [id]: prepareProps(Providers[id], config),
    }),
    {}
  )

export default {
  configureProviders({ commit }, { providers = [] } = {}) {
    try {
      const normalizedProviders = providers.map(provider => {
        const isTuple = typeof provider !== 'string'
        return {
          config: isTuple ? provider[1] : {},
          id: isTuple ? provider[0] : provider,
        }
      })
      commit(
        'SET_SUPPORTED_PROVIDERS',
        normalizedProviders.map(({ id }) => id)
      )
      commit('SET_PROVIDER_CONFIG', mergeConfig(normalizedProviders))
    } catch (error) {
      throw new Error('Invalid configuration provided')
    }
  },
  setActiveProviderId({ commit }, providerId) {
    commit('SET_ACTIVE_PROVIDER_ID', providerId)
  },
}
