<i18n locale="en" lang="json5">
{
  title: 'Hmmm...',
  subtitles: {
    error: 'Something went wrong.',
    'not-found': "We couldn't find what you were looking for.",
  },
  home: 'Return home',
}
</i18n>
<template>
  <App class="error">
    <div class="error__container">
      <div class="error__text">
        <h1 class="error__title" v-text="$t('title')"></h1>
        <h3 class="error__subtitle" v-text="subtitle"></h3>
      </div>
      <img class="error__image" src="/images/404.jpeg" lazy />
      <ac-button accent to="/" v-text="$t('home')" />
    </div>
  </App>
</template>
<script>
import App from '@/App'

export default {
  layout: 'landing',
  components: { App },
  props: {
    /** A Nuxt router error */
    error: { default: () => {}, type: Object },
  },
  computed: {
    subtitle() {
      const { error } = this
      return this.$t(
        `subtitles.${error.statusCode === 404 ? 'not-found' : 'error'}`
      )
    },
  },
  mounted() {
    // eslint-disable-next-line no-console
    console.error(this.error)
  },
}
</script>
<style lang="postcss" scoped>
.error {
  @apply h-full w-full flex justify-center items-center mt-10;

  &__container {
    @apply grid gap-10 justify-items-center items-center justify-center px-5;
  }

  &__title {
    @apply text-7xl font-black;
    @apply sm:text-5xl;
  }

  &__image {
    @apply shadow-2xl;
    max-width: 90%;

    @screen md {
      width: 300px;
    }
  }

  &__subtitle {
    @apply text-3xl text-gray-500;
    @apply sm:text-xl;
  }
}
</style>
