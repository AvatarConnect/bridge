<template>
  <IframeProvider
    :src="rpmBase"
    icon="readyplayerme.svg"
    @message="handleMessage"
  />
</template>
<script>
import IframeProvider from '~/components/Common/IframeProvider'

import { getExtension, isUrl, replaceExtension } from '~/utils/helpers'

export default {
  name: 'RpmProvider',
  components: { IframeProvider },
  props: {
    /** The base URL for our ReadyPlayerMe subdomain */
    rpmBase: { default: 'https://mona.readyplayer.me', type: String }, // TODO: Update to avatarconnect.readyplayer.me
  },
  methods: {
    handleMessage(message) {
      if (!isUrl(message))
        return this.$notify(this.$t('errors.generic'), 'error')

      const version = Math.floor(Math.random() * 100000) // We use this to cache-bust on the client side
      const avatarUri = `${message}?v=${version}`
      const extension = getExtension(avatarUri)
      const metadataUri = replaceExtension(avatarUri)
      this.$emit('set-avatar', { avatarUri, extension, metadataUri })
    },
  },
}
</script>
