import { getExtension, isUrl, replaceExtension } from '~/utils/helpers'

import icon from './icon.svg'

export default {
  config: {
    /** TODO: Replace this with an AvatarConnect gateway */
    gateway: { default: 'mona', type: String },
  },
  description:
    'Create your avatar and explore virtual worlds with one identity',
  icon,
  id: 'ready-player-me',
  name: 'RPM Avatar|RPM Avatars',
  pipeline: [
    {
      async handleMessage(message) {
        if (!isUrl(message))
          throw new Error('Result provided is not a valid URL')
        const version = Math.floor(Math.random() * 100000) // We use this to cache-bust on the client side
        const avatarUri = `${message}?v=${version}`
        const extension = getExtension(avatarUri)
        const metadataUri = replaceExtension(avatarUri, 'json')
        const { data: metadata } = await this.$axios.get(metadataUri)
        return {
          avatar: { format: extension, type: 'humanoid', uri: avatarUri },
          metadata,
        }
      },
      src() {
        return `https://${this.config.gateway}.readyplayer.me`
      },
      type: 'iframe',
    },
  ],
  title: 'ReadyPlayerMe',
}
