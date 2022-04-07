import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'SessionManager',
  computed: {
    ...mapGetters({
      address: 'web3/address',
      isConnected: 'web3/isConnected',
      provider: 'web3/provider',
    }),
  },
  watch: {
    isConnected(ready) {
      if (!ready) return
      this.startProviderListener()
    },
  },
  async created() {
    if (!process.browser) return
    if (this.isConnected) this.startProviderListener()
    else {
      try {
        await this.connect()
      } catch (error) {
        return
      }
    }
  },
  methods: {
    ...mapActions({
      connect: 'web3/connect',
      disconnect: 'web3/disconnect',
    }),
    async checkAddress() {
      const { address, provider } = this
      if (!address) return
      const addresses = await provider.request({
        method: 'eth_accounts',
      })
      if (!addresses.map(address => address.toLowerCase()).includes(address))
        this.disconnect()
    },
    async startProviderListener() {
      const { isConnected: isConnected, provider: provider } = this
      if (!isConnected) return
      await this.checkAddress()
      provider.on('accountsChanged', () => {
        this.checkAddress()
      })
      provider.on('disconnect', () => {
        this.disconnect()
      })
    },
  },
  render: () => null,
}
