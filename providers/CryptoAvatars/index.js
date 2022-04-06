import icon from './icon.png'

const CRYPTO_AVATARS_API = 'https://api.cryptoavatars.io'

export default {
  description: '3D avatars as NFTs for use across multiple virtual worlds',
  icon,
  id: 'crypto-avatars',
  pipeline: [
    {
      method: 'eth_personalSign',
      params: ['[AvatarConnect] Sign message to log into Crypto Avatars'],
      type: 'web3',
    },
    {
      async transform({ address, signature }) {
        const {
          data: { access_token: accessToken },
        } = await this.$axios.post(`${CRYPTO_AVATARS_API}/login`, {
          signature,
          wallet: address,
        })

        const { data } = await this.$axios.get(
          `${CRYPTO_AVATARS_API}/nfts/${address}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        return { result: data }
      },
      type: 'transform',
    },
    {
      getImage: ({ metadata: { image } }) => image,
      getName: ({ metadata: { name } }) => name,
      type: 'select',
    },
  ],
  title: 'Crypto Avatars',
}
