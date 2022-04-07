<template>
  <div>
    <p v-text="JSON.stringify(result, null, 2)"></p>
    <p v-if="error" v-text="error"></p>
  </div>
</template>
<script>
import IframeBus from '@local/iframe-bus'

export default {
  name: 'ProviderCallback',
  mounted() {
    if (!process.browser) return
    const bus = new IframeBus('@avatarconnect/bridge/oauth')
    bus.send('oauth-result', this.$route.query)
  },
}
</script>
