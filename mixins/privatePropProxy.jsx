/**
 * Registers computed properties to proxy mixin data properties to public properties
 * i.e. $_uf_currentValue (data prop) => $currentValue (computed prop)
 *
 * @param {string} mixinTag The abbrev/tag for the mixin (i.e. `uf`)
 * @param {object} properties The properties that should be proxied from mixin data (map keys to default values)
 * @returns {object} a Vue mixin
 */
export default (mixinTag, properties = {}) => {
  // @vue/component
  return {
    data() {
      return Object.entries(properties).reduce(
        (acc, [key, defaultValue]) =>
          Object.assign(acc, { [`$_${mixinTag}_${key}`]: defaultValue }),
        {}
      )
    },
    computed: {
      ...Object.keys(properties).reduce(
        (acc, key) =>
          Object.assign(acc, {
            [`$${key}`]: {
              get() {
                return this.$data[`$_${mixinTag}_${key}`]
              },
              set(value) {
                this.$data[`$_${mixinTag}_${key}`] = value
              },
            },
          }),
        {}
      ),
    },
  }
}
