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
      handleMessage(message) {
        if (!isUrl(message))
          return this.$notify(this.$t('errors.generic'), 'error')
        const version = Math.floor(Math.random() * 100000) // We use this to cache-bust on the client side
        const avatarUri = `${message}?v=${version}`
        const extension = getExtension(avatarUri)
        const metadataUri = replaceExtension(avatarUri)
        return { avatarUri, extension, metadataUri }
      },
      src() {
        return `https://${this.config.gateway}.readyplayer.me`
      },
      type: 'iframe',
    },
  ],
  title: 'ReadyPlayerMe',
}
