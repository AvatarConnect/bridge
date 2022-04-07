<template>
  <div>
    <p v-text="JSON.stringify(result, null, 2)"></p>
    <p v-if="error" v-text="error"></p>
  </div>
</template>
<script>
// import Providers from '~/providers'

import IframeBus from '@local/iframe-bus'

export default {
  name: 'ProviderCallback',
  // async asyncData({ $axios, params: { providerId }, query }) {
  //   try {
  //     const provider = Providers[providerId]
  //     if (!provider) return { error: providerId }
  //     const result = await provider.callbackHandler.call({ $axios }, query)
  //     return { result }
  //   } catch (error) {
  //     return { error }
  //   }
  // },
  mounted() {
    if (!process.browser) return
    const bus = new IframeBus('@avatarconnect/bridge/oauth')
    bus.send('oauth-result', this.$route.query)
  },
}
</script>
