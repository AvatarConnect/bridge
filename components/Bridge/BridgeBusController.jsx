import { mapActions } from 'vuex'

import IframeBus from '@local/iframe-bus'

export default {
  name: 'BridgeBusController',
  data() {
    return {
      inboundBus: null,
      outboundBus: null,
    }
  },
  computed: {
    isIframe() {
      return window && window.self !== window.parent
    },
  },
  mounted() {
    if (!process.browser) return
    this.$bus.on('bridge-bus-event', this.sendBridgeBusMessage)
    this.outboundBus = new IframeBus('@avatarconnect/bridge')
    // Check if running as standalone client (not in iframe)
    if (!this.isIframe)
      this.configure({
        providers: ['ready-player-me', 'meebits'],
      })
    else {
      this.inboundBus = new IframeBus('@avatarconnect/sdk')
      this.inboundBus.on('configure', this.configure)
      this.outboundBus.send('mounted')
    }
  },
  beforeDestroy() {
    this.$bus.off('bridge-bus-event', this.sendBridgeBusMessage)
  },
  methods: {
    ...mapActions({ configureProviders: 'bridge/configureProviders' }),
    async configure(config) {
      try {
        this.configureProviders(config)
      } catch (error) {
        if (!this.isIframe) {
          await this.$nextTick()
          return this.$notify('Invalid configuration', 'error')
        }

        this.outboundBus.send('error', {
          details: error.message,
          message: `You've provided an invalid configuration`,
        })
      }
    },
    sendBridgeBusMessage({ params, type }) {
      this.outboundBus.send(type, params)
    },
  },
  render: () => null,
}
