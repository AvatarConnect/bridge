import icon from './icon.png'

const CRYPTO_AVATARS_API = 'https://api.cryptoavatars.io'

export default {
  config: {
    apiKey: { required: true, type: String },
  },
  description: '3D avatars as NFTs for use across multiple virtual worlds',
  icon,
  id: 'crypto-avatars',
  name: 'CryptoAvatar',
  pipeline: [
    {
      format(result) {
        const [address] = result
        return address
      },
      method: 'eth_requestAccounts',
      type: 'web3',
    },
    {
      async transform() {
        const { data } = await this.$axios.get(
          `${CRYPTO_AVATARS_API}/nfts/avatars/${this.aggregate}?skip=0&limit=20`,
          {
            headers: {
              'API-KEY': this.config.apiKey,
              accept: 'application/json',
            },
          }
        )
        return data
      },
      type: 'transform',
    },
    {
      format({ metadata: { asset } }) {
        return { avatar: { type: 'vrm', uri: asset } }
      },
      image({ metadata: { image } }) {
        return image
      },
      name({ metadata: { name } }) {
        return name
      },
      type: 'select',
    },
  ],
  purchaseLink: 'https://cryptoavatars.io/market',
  title: 'Crypto Avatars',
}
