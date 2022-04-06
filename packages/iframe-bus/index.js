import { EventEmitter } from 'events'

class IframeBus extends EventEmitter {
  /**
   * Creates a two-way communication bus between an iframe and parent
   *
   * @param {string} frame An ID for the frame's instance
   * @param {string} top An ID for the parent's instance
   * @param { object} options An options object
   * @param {string} [options.origin] A specific origin to listen to
   */
  constructor(frame, top, { origin } = {}) {
    super()
    if (!window) return
    this._frame = frame
    this._top = top
    this._origin = origin
    if (top) window.onmessage = this._handleMessage
  }

  send(type, params = null) {
    const { _frame: sender } = this
    window.top.postMessage(JSON.stringify({ params, sender, type }), '*')
  }

  _handleMessage({ data, origin }) {
    if (this.origin && origin !== this.origin) return
    try {
      const { method, params, sender } = JSON.parse(data)
      if (sender !== this._top) return
      this.emit(method, params)
    } catch (error) {
      return
    }
  }
}

export default IframeBus
