<i18n locale="en" lang="json5">
{
  loading: 'Loading',
  'powered-by': 'Avatars powered by',
}
</i18n>
<template>
  <div class="iframe-stage">
    <iframe
      :src="iframeSrc"
      allow="camera *; microphone *"
      class="iframe-stage__iframe"
    >
    </iframe>
    <div class="iframe-stage__loading-container">
      <p v-t="'powered-by'" class="iframe-stage__supertext"></p>
      <img class="iframe-stage__platform-logo" :src="provider.icon" />
      <ac-loading-text
        class="iframe-stage__loading-text"
        v-text="$t('loading')"
      />
    </div>
  </div>
</template>
<script>
import { getBaseUrl } from '~/utils/helpers'

import stage from './Common/mixins/stage'

export default {
  name: 'IframeStage',
  mixins: [stage],
  computed: {
    baseUrl() {
      return getBaseUrl(this.iframeSrc)
    },
    iframeSrc() {
      const src = this.stage.src
      return typeof src === 'function' ? src.call(this) : src
    },
  },
  mounted() {
    window.addEventListener('message', this.receiveMessage, false)
  },
  beforeDestroy() {
    window.removeEventListener('message', this.receiveMessage)
  },
  methods: {
    async receiveMessage(event) {
      if (event.origin !== this.baseUrl || !event.data) return
      const result = await this.stage.handleMessage.call(this, event.data)
      this.$emit('result', result)
    },
  },
}
</script>
<style lang="postcss" scoped>
.iframe-stage {
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
