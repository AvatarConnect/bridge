import icon from './icon.svg'

const MEEBITS_API = `https://meebits.larvalabs.com/api/v1/account`

const FORMATS = {
  fbx: 'FBX',
  glb: 'GLB',
  vox: 'Vox',
  'vox-t-pose': 'VoxTPose',
  'vox-t-pose-cored': 'VoxTPoseCored',
  vrm: 'VRM',
}

const formatMetadata = (
  { imageUrl, index, type, ...ownerFiles },
  accessToken,
  format
) => ({
  avatar: {
    format,
    type: type === 'HUMAN' ? 'humanoid' : null,
    uri: `${
      ownerFiles[`ownerDownload${FORMATS[format]}`]
    }?accessToken=${accessToken}`,
  },
  imageUrl,
  index,
})

export default {
  config: {
    format: {
      default: 'vrm',
      type: String,
      validate: type => [Object.keys(FORMATS)].includes(type),
    },
  },
  description: '20,000 unique 3D voxel characters',
  icon,
  id: 'meebits',
  name: 'Meebit',
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
        return meebits.map(meebit =>
          formatMetadata(meebit, accessToken, this.config.format)
        )
      },
      redirect(callback) {
        return `https://meebits.larvalabs.com/meebits/apiAccessRequest?callbackUrl=${callback}`
      },
      type: 'oauth',
    },
    {
      format: ({ avatar }) => ({ avatar }),
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
