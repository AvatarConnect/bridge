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
      return window && window.self !== window.top
    },
  },
  mounted() {
    if (!process.browser) return
    this.$bus.on('bridge-bus-event', this.sendBridgeBusMessage)
    this.outboundBus = new IframeBus('@avatarconnect/bridge')
    // Check if running as standalone client (not in iframe)
    if (!this.isIframe)
      this.configure({
        providers: ['ready-player-me', 'meebits', 'crypto-avatars'],
      })
    else {
      this.inboundBus = new IframeBus('@avatarconnect/sdk')
      this.inboundBus.on('configure', this.configure)
      this.outboundBus.send('mounted')
      this.outboundBus.send('debug', ['HERE', 'test'])
    }
  },
  beforeDestroy() {
    this.$bus.off('bridge-bus-event', this.sendBridgeBusMessage)
  },
  methods: {
    ...mapActions({ configureProviders: 'bridge/configureProviders' }),
    configure(config) {
      this.outboundBus.send('debug', ['HERE'])
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
      this.outboundBus.send(type, params)
    },
  },
  render: () => null,
}
