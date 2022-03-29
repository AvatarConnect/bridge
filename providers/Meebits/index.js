import MeebitsProvider from './MeebitsProvider'

const MEEBITS_API = `https://meebits.larvalabs.com/api/v1/account`

export default {
  component: MeebitsProvider,
  description:
    '20,000 unique 3D voxel characters, created by a custom generative algorithm',
  icon: 'meebits.svg',
  id: 'meebits',
  name: 'Meebits',
  async oauthHandler(query) {
    const { account, accessToken } = query
    const { data } = await this.$axios.get(
      `${MEEBITS_API}/${account}?accessToken=${accessToken}`
    )
    return data
  },
  type: 'oauth',
}
