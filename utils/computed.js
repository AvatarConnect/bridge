/**
 * Registers a computed getter/setter for nested attributes of a parent object
 *
 * @param {string} parent the object with nested attributes
 * @param {string[]|object} attributes the nested attributes that need a computed getter/setter. Pass { `key`: 'mappedKey' } for name overrides
 * @returns {object} a set of computed getters/setters
 */
export const mapNestedProps = (parent, attributes = []) => {
  // The attributes API is flexible for code-minimization. Supports the following:
  // 1. Array of keys. ['page']
  // 2. Object containing key-mappings. { page: 'syncedPage' }
  // 3. Array of objects (good for router query sanitization). [{ source: 'page', target: 'syncedPage', sanitize: () => true }]
  const keys = Array.isArray(attributes)
    ? attributes.map(attribute =>
        typeof attribute === 'string'
          ? { source: attribute, target: attribute }
          : attribute
      )
    : Object.entries(attributes).reduce(
        (acc, [source, target]) => [...acc, { source, target }],
        []
      )
  return keys.reduce(
    (acc, { source, target }) =>
      target
        ? Object.assign(acc, {
            [target]: {
              get() {
                const parentValue = this[parent]
                if (
                  parentValue === undefined ||
                  parentValue[source] === undefined
                )
                  return
                return parentValue[source]
              },
              set(value) {
                this[parent] = { ...this[parent], [source]: value }
              },
            },
          })
        : acc,
    {}
  )
}

/**
 * Wraps a v-model prop with a computed getter/setter
 *
 * @param {string} key a name for your `value` prop
 * @param {string[]|object} [attributes] - a list of the prop's nested attributes if the prop is an object
 * @returns {object} a set of computed getters/setters
 */
export const mapModel = (key, attributes = []) => ({
  [key]: {
    get() {
      return this.value
    },
    set(value) {
      this.$emit('input', value)
    },
  },
  ...mapNestedProps(key, attributes),
})

/**
 * Wraps a prop with a computed getter/setter to expose the `.sync` modifier
 *
 * @param {string} key - synced attribute available for the component
 * @param {string} source - name of attribute passed in props
 * @param {string[]|object} attributes - name of nested attributes on the source object
 * @returns {object} a set of computed getters/setters
 */
export const mapSyncedProp = (key, source, attributes = []) => ({
  [key]: {
    get() {
      return this[source]
    },
    set(value) {
      this.$emit(`update:${source}`, value)
    },
  },
  ...mapNestedProps(key, attributes),
})

/**
 * Supports two-way binding of the current route's query
 *
 * @param {string} key - synced attribute available for the component
 * @param {string[]|object} attributes - name of nested attributes on the source object
 * @returns {object} a set of computed getters/setters
 */
export const mapRouterQueryProp = (key, attributes = []) => {
  const sanitizers =
    Array.isArray(attributes) && attributes.length
      ? attributes.reduce((acc, attribute) => {
          if (typeof attribute === 'string') return acc
          const { source, sanitize } = attribute
          if (!sanitize) return acc
          return Object.assign(acc, { [source]: sanitize })
        }, {})
      : {}
  return {
    [key]: {
      get() {
        const query = this.$route.query
        Object.entries(sanitizers).forEach(([key, sanitize]) => {
          if (query[key] !== undefined) query[key] = sanitize(query[key])
        })
        return query
      },
      set(value) {
        const currentQuery = Object.assign({}, this.$route.query)
        try {
          this.$router.replace({
            query: { ...currentQuery, ...value },
          })
        } catch (error) {
          // Do Nothing
        }
      },
    },
    ...mapNestedProps(key, attributes),
  }
}

export const mapStoreModel = (key, prefix, getter, action) => ({
  [key]: {
    get() {
      return this.$store.getters[`${prefix}/${getter}`]
    },
    set(value) {
      this.$store.dispatch(`${prefix}/${action}`, value)
    },
  },
})
