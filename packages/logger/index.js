/* eslint-disable no-console */
const classifyRE = /(?:^|[-_])(\w)/g
const classify = str =>
  str.replace(classifyRE, c => c.toUpperCase()).replace(/[-_]/g, '')

const formatComponentName = (vm, includeFile) => {
  if (vm.$root === vm) {
    return '<Root>'
  }
  const options =
    typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
      ? vm.$options || vm.constructor.options
      : vm || {}
  let name = options.name || options._componentTag
  const file = options.__file
  if (!name && file) {
    const match = file.match(/([^/\\]+)\.vue$/)
    name = match && match[1]
  }

  return (
    (name ? `<${classify(name)}>` : `<Anonymous>`) +
    (file && includeFile !== false ? ` at ${file}` : '')
  )
}

const formatStackTrace = (vm, tree) =>
  '\n\n' +
  tree
    .map(
      (vm, i) =>
        `${i === 0 ? '---> ' : ' '.repeat(5 + i * 2)}${
          Array.isArray(vm)
            ? `${formatComponentName(vm[0])}... (${vm[1]} recursive calls)`
            : formatComponentName(vm)
        }`
    )
    .join('\n')

const generateComponentTrace = vm => {
  if (vm._isVue && vm.$parent) {
    const tree = []
    let currentRecursiveSequence = 0
    while (vm) {
      if (tree.length > 0) {
        const last = tree[tree.length - 1]
        if (last.constructor === vm.constructor) {
          currentRecursiveSequence++
          vm = vm.$parent
          continue
        } else if (currentRecursiveSequence > 0) {
          tree[tree.length - 1] = [last, currentRecursiveSequence]
          currentRecursiveSequence = 0
        }
      }
      tree.push(vm)
      vm = vm.$parent
    }
    return formatStackTrace(vm, tree)
  } else {
    return `\n\n(found in ${formatComponentName(vm)})`
  }
}

class VueLogger {
  /**
   * @param {object} options An options object
   * @param {object} [options.vm] the Vue component context if you'd like to include the component stacktrace
   * @param {boolean} [options.verbose] tells the logger to log non-errors
   */
  constructor({ vm, verbose = false } = {}) {
    this._vm = vm
    this._verbose = verbose
  }

  /**
   * Logs an info message
   *
   * @param {string} message A message to log
   */
  info(message) {
    if (!this._verbose) return
    const newMessage = this._createMessage(message)
    if (!newMessage) return
    console.info(newMessage)
  }

  /**
   * Logs an error message
   *
   * @param {string} message A message to log
   */
  error(message) {
    const newMessage = this._createMessage(message)
    if (!newMessage) return
    console.error(newMessage)
  }

  /**
   * Logs a warning message
   *
   * @param {string} message A message to log
   */
  warn(message) {
    if (!this._verbose) return
    const newMessage = this._createMessage(message)
    if (!newMessage) return
    console.warn(newMessage)
  }

  _createMessage(message) {
    const { _vm: vm } = this
    return (
      `[@avatarconnect/bridge] ${message}` +
      (vm ? generateComponentTrace(vm) : '')
    )
  }
}

export default VueLogger
