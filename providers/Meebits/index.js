import icon from './icon.svg'

const MEEBITS_API = `https://meebits.larvalabs.com/api/v1/account`
const AVATAR_FILES = [
  'FBX',
  'GLB',
  'VRM',
  'Vox',
  'Vox3DPrint',
  'VoxTPose',
  'VoxTPoseCored',
]

const formatMetadata = (
  { imageUrl, index, type, ...ownerFiles },
  accessToken
) => ({
  imageUrl,
  index,
  type,
  ...AVATAR_FILES.reduce(
    (acc, filename) => ({
      ...acc,
      [`ownerDownload${filename}`]: `${
        ownerFiles[`ownerDownload${filename}`]
      }?accessToken=${accessToken}`,
    }),
    {}
  ),
})

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
          data: {
            data: { meebits = [] },
          },
        } = await this.$axios.get(
          `${MEEBITS_API}/${account}?accessToken=${accessToken}`
        )
        return meebits.map(meebit => formatMetadata(meebit, accessToken))
      },
      redirect(callback) {
        return `https://meebits.larvalabs.com/meebits/apiAccessRequest?callbackUrl=${callback}`
      },
      type: 'oauth',
    },
    {
      image({ imageUrl }) {
        return imageUrl
      },
      name({ index }) {
        return `Meebit ${index}`
      },
      type: 'select',
    },
  ],
  title: 'Meebits',
}
