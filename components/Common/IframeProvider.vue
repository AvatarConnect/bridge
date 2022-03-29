<i18n locale="en" lang="json5">
{
  loading: 'Loading',
  'powered-by': 'Avatars powered by',
}
</i18n>
<template>
  <div class="iframe-provider">
    <iframe
      :src="src"
      allow="camera *; microphone *"
      class="iframe-provider__iframe"
    >
    </iframe>
    <div class="iframe-provider__loading-container">
      <p v-t="'powered-by'" class="iframe-provider__supertext"></p>
      <img
        class="iframe-provider__platform-logo"
        :src="`/avatar-icons/${icon}`"
      />
      <ac-loading-text
        class="iframe-provider__loading-text"
        v-text="$t('loading')"
      />
    </div>
  </div>
</template>
<script>
import { getBaseUrl } from '~/utils/helpers'

export default {
  name: 'IframeProvider',
  props: {
    /** The name of the provider's icon in /avatar-icons */
    icon: { required: true, type: String },

    /** URL path for the iframe */
    src: { required: true, type: String },
  },
  computed: {
    baseUrl() {
      return getBaseUrl(this.src)
    },
  },
  mounted() {
    window.addEventListener('message', this.receiveMessage, false)
  },
  beforeDestroy() {
    window.removeEventListener('message', this.receiveMessage)
  },
  methods: {
    receiveMessage(event) {
      if (event.origin !== this.baseUrl || !event.data) return
      /**
       * @event message Emitted when the iframe sends a message to the parent
       */
      this.$emit('message', event.data)
    },
  },
}
</script>
<style lang="postcss" scoped>
.iframe-provider {
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
