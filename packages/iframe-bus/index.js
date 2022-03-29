import { EventEmitter } from 'events'

class IframeBus extends EventEmitter {
  constructor({ origin, sender = '@avatarconnect/provider' } = {}) {
    super()
    if (!window) return
    this.sender = sender
    this.origin = origin
    window.onmessage = this._handleMessage
    this.send('mounted')
  }

  send(type, params = null) {
    const { sender } = this
    window.top.postMessage(JSON.stringify({ params, sender, type }), '*')
  }

  _handleMessage({ data, origin }) {
    if (this.origin && origin !== this.origin) return
    try {
      const { method, params, sender } = JSON.parse(data)
      if (sender !== this.sender) return
      this.emit(method, params)
    } catch (error) {
      return
    }
  }
}

export default IframeBus
