<template>
  <div></div>
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
