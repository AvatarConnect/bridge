import { mapNestedProps } from '~/utils/computed'

/**
 * Creates a mixin that registers a computed property to provide a fallback
 * value for an optional prop that operates as a model
 *
 * @param {string} key synced attribute available for the component
 * @param {string} source name of attribute passed in props
 * @param {string} event The event to update the parent
 * @param {*|*[]} type a Vue prop type
 * @param {*} defaultValue Default value for the prop if not set
 * @param {string[]|object} attributes name of nested attributes on the source object
 * @returns {object} a Vue mixin
 * @mixin
 */
const propFallback = (
  key,
  source,
  event,
  type,
  defaultValue,
  attributes = []
) => {
  const localKey = `$_pf_${key}`

  // @vue/component
  return {
    props: {
      /** An optional synced prop */
      [source]: {
        default: undefined,
        type,
      },
    },
    data() {
      return {
        [localKey]: defaultValue,
      }
    },
    computed: {
      ...mapNestedProps(key, attributes),
      [key]: {
        get() {
          return this[source] !== undefined
            ? this[source]
            : this.$data[localKey]
        },
        set(value) {
          if (this[source] !== undefined) return this.$emit(event, value)
          this.$data[localKey] = value
        },
      },
    },
  }
}

/**
 * Supports optional v-model capabilities on the component
 *
 * @param {string} key The desired key for the local-version of the model
 * @param {*|*[]} type a Vue prop type
 * @param {*} defaultValue Default value for the prop if not set
 * @param {string[]|object} attributes name of nested attributes on the source object
 * @returns {object} a Vue mixin
 */
export const modelFallback = (key, type, defaultValue, attributes) =>
  propFallback(key, 'value', 'input', type, defaultValue, attributes)

/**
 * Supports optional .sync capabilities on the component
 *
 * @param {string} key The desired key for the local-version of the synced prop
 * @param {string} source The prop source for the synced value
 * @param {*|*[]} type a Vue prop type
 * @param {*} defaultValue Default value for the prop if not set
 * @param {string[]|object} attributes name of nested attributes on the source object
 * @returns {object} a Vue mixin
 */
export const syncFallback = (key, source, type, defaultValue, attributes) =>
  propFallback(key, source, `update:${source}`, type, defaultValue, attributes)
