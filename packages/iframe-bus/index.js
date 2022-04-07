import { EventEmitter } from 'events'

class IframeBus extends EventEmitter {
  /**
   * Creates a two-way communication bus between an iframe and parent
   *
   * @param {string} sender An ID for the frame's instance
   * @param { object} options An options object
   * @param {string} [options.origin] A specific origin to listen to
   */
  constructor(sender, { origin } = {}) {
    super()
    if (!window) return
    this._sender = sender
    this._origin = origin
  }

  on(event, handler) {
    super.on(event, handler)
    window.onmessage = this._handleMessage.bind(this)
  }

  send(event, params = null) {
    const { _sender: sender } = this
    window.parent.postMessage(JSON.stringify({ event, params, sender }), '*')
  }

  _handleMessage({ data, origin }) {
    if (this._origin && origin !== this._origin) return
    try {
      const { event, params, sender } = JSON.parse(data)
      if (sender !== this._sender) return
      this.emit(event, params)
    } catch (error) {
      return
    }
  }
}

export default IframeBus
