<template>
  <div>
    <p v-text="JSON.stringify(result, null, 2)"></p>
    <p v-if="error" v-text="error"></p>
  </div>
</template>
<script>
import Providers from '~/providers'
import { getBaseUrl } from '~/utils/helpers'

import IframeBus from '@local/iframe-bus'

export default {
  name: 'ProviderCallback',
  async asyncData({ $axios, params: { providerId }, query }) {
    try {
      const provider = Providers[providerId]
      if (!provider) return { error: providerId }
      const result = await provider.oauthHandler.call({ $axios }, query)
      return { result }
    } catch (error) {
      return { error: true }
    }
  },
  mounted() {
    if (!process.browser) return
    this.$notify(JSON.stringify(this.result))
    const origin = getBaseUrl(window.location.href)
    const bus = new IframeBus({ origin, sender: '@avatarconnect/bridge/oauth' })
    bus.send('oauth-result', JSON.stringify(this.result))
  },
}
</script>
