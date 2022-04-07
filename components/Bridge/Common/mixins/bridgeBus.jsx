export default {
  methods: {
    $debug(...params) {
      // eslint-disable-next-line no-console
      console.log(...params)
      this.$bus.emit('bridge-bus-event', { params, type: 'debug' })
    },
    $sendMessage(type, params) {
      this.$bus.emit('bridge-bus-event', { params, type })
    },
  },
}
