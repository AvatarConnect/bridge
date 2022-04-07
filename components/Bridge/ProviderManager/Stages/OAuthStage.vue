<i18n locale="en" lang="json5">
{
  loading: 'Loading',
  'powered-by': 'Avatars powered by',
}
</i18n>
<template>
  <div class="oauth-provider">
    <iframe
      :src="redirectUri"
      allow="camera *; microphone *"
      class="oauth-provider__iframe"
    >
    </iframe>
    <div class="oauth-provider__loading-container">
      <p v-t="'powered-by'" class="oauth-provider__supertext"></p>
      <img class="oauth-provider__platform-logo" :src="provider.icon" />
      <ac-loading-text
        class="oauth-provider__loading-text"
        v-text="$t('loading')"
      />
    </div>
  </div>
</template>
<script>
import IframeBus from '@local/iframe-bus'

import stage from './Common/mixins/stage'

export default {
  name: 'IframeProvider',
  mixins: [stage],
  computed: {
    redirectUri() {
      const {
        provider: providerId,
        stage: { redirect },
      } = this

      const { hostname, port, protocol } = window.location

      const baseUrl = `${protocol}//${hostname}${port ? `:${port}` : ''}`

      const { href } = this.$router.resolve({
        name: 'oauth-providerId',
        params: { providerId },
      })

      return redirect(encodeURIComponent(baseUrl + href))
    },
  },
  mounted() {
    if (!process.browser) return
    const bus = new IframeBus({ sender: '@avatarconnect/bridge/oauth' })
    bus.on('oauth-result', result => {
      this.$emit('result', result)
    })
  },
}
</script>
<style lang="postcss" scoped>
.oauth-provider {
  @apply w-full h-full;

  &__iframe {
    @apply absolute inset-0 z-10 w-full h-full;
  }

  &__loading-container {
    @apply inset-0 absolute flex justify-center items-center flex-col;
  }

  &__supertext {
    @apply uppercase text-gray-600 text-sm mb-3;
  }

  &__platform-logo {
    @apply w-36;
  }

  &__loading-text {
    @apply mt-3 font-bold text-lg;
  }
}
</style>
