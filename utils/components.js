import Vue from 'vue'

/**
 * Wraps a single-file component in a functional component
 * to prevent v-t/v-text (textContent) or v-html (htmlContent)
 * from overwriting a default slot on the component
 *
 * @param {object} Component The component to be rendered
 * @returns {object} A Vue component
 */
export const generateSlottedTextNode = Component =>
  // eslint-disable-next-line vue/one-component-per-file
  Vue.component(Component.name, {
    functional: true,
    render(h, { data, children }) {
      // eslint-disable-next-line xss/no-mixed-html
      const componentContent = data.domProps
        ? data.domProps.textContent || data.domProps.innerHTML
        : ''

      // Remove innerHTML & textContent
      if (data.domProps) {
        delete data.domProps.textContent
        delete data.domProps.innerHTML
      }

      return h(
        Component,
        data,
        componentContent ? [componentContent] : children
      )
    },
  })
