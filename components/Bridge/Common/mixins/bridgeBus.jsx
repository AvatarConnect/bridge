export default {
  methods: {
    $sendMessage(type, params) {
      this.$bus.emit('bridge-bus-event', { params, type })
    },
  },
}
