const defaultConditional = () => {
  return true
}

const handleClick = (event, el, method) => {
  const handler =
    typeof method.value === 'function' ? method.value : method.value.handler

  const isActive =
    (typeof method.value === 'object' && method.value.closeConditional) ||
    defaultConditional

  if (!event || isActive(event) === false) return

  if (
    ('isTrusted' in event && !event.isTrusted) ||
    ('pointerType' in event && !event.pointerType)
  )
    return
  const elements = (
    (typeof method.value === 'object' && method.value.include) ||
    (() => [])
  )()
  elements.push(el)

  !elements.some(el => el.contains(event.target)) &&
    setTimeout(() => {
      isActive(event) && handler && handler(event)
    }, 0)
}

export default {
  /**
   * Removes an element from the DOM if the user does not have a specific role
   *
   * @param {object} el the DOM element
   * @param {Function} method a Vue component method to call when clicked outside of element
   * @public
   */
  bind(el, method) {
    el._clickOutside = event => handleClick(event, el, method)
    document.body.addEventListener('click', el._clickOutside, true)
  },
  /**
   * Unbinds the click listener created when the directive was initialized
   *
   * @param {object} el The DOM element
   */
  unbind(el) {
    document.body.removeEventListener('click', el._clickOutside, true)
  },
}
