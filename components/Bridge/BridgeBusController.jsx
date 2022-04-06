import { mapActions } from 'vuex'

import IframeBus from '@local/iframe-bus'

export default {
  name: 'BridgeBusController',
  data() {
    return {
      iframeBus: null,
    }
  },
  computed: {
    isIframe() {
      return window && window.self !== window.top
    },
  },
  mounted() {
    if (!process.browser) return
    this.$bus.on('bridge-bus-event', this.sendBridgeBusMessage)
    this.iframeBus = new IframeBus(
      '@avatarconnect/bridge',
      '@avatarconnect/sdk'
    )
    // Check if running as standalone client (not in iframe)
    if (!this.isIframe) this.configure()
    else {
      this.iframeBus.on('configure', this.configure)
      this.iframeBus.send('mounted')
    }
  },
  beforeDestroy() {
    this.$bus.off('bridge-bus-event', this.sendBridgeBusMessage)
  },
  methods: {
    ...mapActions({ configureProviders: 'bridge/configureProviders' }),
    configure(config) {
      try {
        this.configureProviders(config)
      } catch (error) {
        if (!this.isIframe)
          return this.$notify('Invalid configuration', 'error')
        this.sendBridgeBusMessage({
          params: {
            details: error.message,
            message: `You've provided an invalid configuration`,
          },
          type: 'error',
        })
      }
    },
    sendBridgeBusMessage({ params, type }) {
      this.iframeBus.send(type, params)
    },
  },
  render: () => null,
}
