import mitt from 'mitt'

const emitter = mitt()

/**
 * Exposes a global event bus.
 * this.$bus.on(<event>, <handler>)
 * this.$bus.emit(<event>, <payload>)
 *
 * @mixin
 */
export default {
  created() {
    this.$_b_emitter = emitter
    this.$_b_listeners = {}
    this.$bus = {
      emit: this.$_b_emit,
      off: this.$_b_off,
      on: this.$_b_on,
    }
  },
  beforeDestroy() {
    Object.entries(this.$_b_listeners).forEach(([event, listener]) =>
      this.$_b_emitter.off(event, listener)
    )
  },
  methods: {
    $_b_emit(event, payload) {
      this.$_b_emitter.emit(event, payload)
    },
    $_b_off(event) {
      this.$_b_emitter.off(event, this.$_b_listeners[event])
      delete this.$_b_listeners[event]
    },
    $_b_on(event, handler) {
      this.$_b_emitter.on(event, handler)
      this.$_b_listeners[event] = handler
    },
  },
}
