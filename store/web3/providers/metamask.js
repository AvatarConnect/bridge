export default {
  async connect(provider) {
    return await provider.request({ method: 'eth_requestAccounts' })
  },
  async disconnect() {
    return
  },
  getProvider() {
    return window ? window.ethereum : null
  },
}
