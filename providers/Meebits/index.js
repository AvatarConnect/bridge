import icon from './icon.svg'

const MEEBITS_API = `https://meebits.larvalabs.com/api/v1/account`

const OUTPUT_TYPES = {
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
  outputType
) => ({
  avatar: {
    type: outputType,
    uri: `${
      ownerFiles[`ownerDownload${OUTPUT_TYPES[outputType]}`]
    }?accessToken=${accessToken}`,
  },
  imageUrl,
  index,
  metadata: {
    type,
  },
})

export default {
  config: {
    output: {
      default: 'vrm',
      type: String,
      validate: type => [Object.keys(OUTPUT_TYPES)].includes(type),
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
          formatMetadata(meebit, accessToken, this.config.output)
        )
      },
      redirect(callback) {
        return `https://meebits.larvalabs.com/meebits/apiAccessRequest?callbackUrl=${callback}`
      },
      type: 'oauth',
    },
    {
      format(result) {
        const { avatar, metadata } = result
        return { avatar, metadata }
      },
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
