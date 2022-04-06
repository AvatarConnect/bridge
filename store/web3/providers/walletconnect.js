import WalletConnectProvider from '@walletconnect/web3-provider'

export default {
  async connect(provider) {
    return await provider.enable()
  },
  async disconnect(provider) {
    await provider.disconnect()
  },
  getProvider(infuraId) {
    const getInfuraRpc = network =>
      `https://${network}.infura.io/v3/${infuraId}`

    const provider = new WalletConnectProvider({
      rpc: {
        1: getInfuraRpc('mainnet'),
        1337: 'http://localhost:8545',
        137: getInfuraRpc('polygon-mainnet'),
        4: getInfuraRpc('rinkeby'),
        80001: getInfuraRpc('polygon-mumbai'),
      },
    })

    return provider
  },
}
