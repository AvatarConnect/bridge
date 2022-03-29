import bus from '~/mixins/bus'

/**
 * Triggers a snackbar notification using the `$notify` method
 *
 * @mixin
 */
export default {
  mixins: [bus],
  methods: {
    $notify(message, mode = 'info', options = {}) {
      this.$bus.emit('root-notification', { message, mode, ...options })
    },
  },
}
