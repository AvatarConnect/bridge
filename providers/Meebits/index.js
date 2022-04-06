import icon from './icon.svg'

const MEEBITS_API = `https://meebits.larvalabs.com/api/v1/account`

export default {
  description: '20,000 unique 3D voxel characters',
  icon,
  id: 'meebits',
  name: 'Meebit|Meebits',
  pipeline: [
    {
      async callbackHandler(query) {
        const { account, accessToken } = query
        const {
          data: { data },
        } = await this.$axios.get(
          `${MEEBITS_API}/${account}?accessToken=${accessToken}`
        )
        return data.meebits
      },
      redirect(callback) {
        return `https://meebits.larvalabs.com/meebits/apiAccessRequest?callbackUrl=${callback}`
      },
      type: 'oauth',
    },
    {
      getImage({ imageUrl }) {
        return `https://meebits.larvalabs.com${imageUrl}`
      },
      getName({ index }) {
        return `Meebit ${index}`
      },
      type: 'select',
    },
  ],
  title: 'Meebits',
}
