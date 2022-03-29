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
      <img
        class="oauth-provider__platform-logo"
        :src="`/avatar-icons/${icon}`"
      />
      <ac-loading-text
        class="oauth-provider__loading-text"
        v-text="$t('loading')"
      />
    </div>
  </div>
</template>
<script>
import { getBaseUrl } from '~/utils/helpers'

import IframeBus from '@local/iframe-bus'

export default {
  name: 'IframeProvider',
  props: {
    /** A function that accepts a callback URL and returns a redirect URI */
    createRedirect: { required: true, type: Function },

    /** The name of the provider's icon in /avatar-icons */
    icon: { required: true, type: String },

    /** The provider ID */
    provider: { required: true, type: String },
  },
  computed: {
    redirectUri() {
      const { createRedirect, provider: providerId } = this

      const { hostname, port, protocol } = window.location

      const baseUrl = `${protocol}//${hostname}${port ? `:${port}` : ''}`

      const { href } = this.$router.resolve({
        name: 'oauth-providerId',
        params: { providerId },
      })

      return createRedirect(encodeURIComponent(baseUrl + href))
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
