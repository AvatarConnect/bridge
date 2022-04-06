<i18n locale="en" lang="json5">
{
  title: 'Connect a wallet to get started',
  subtitle: {
    question: "Don't have a wallet?",
    cta: 'Get one here',
  },
}
</i18n>
<template>
  <div class="selector-header" :class="[small && 'selector-header--small']">
    <h1 class="selector-header__title" v-text="title"></h1>
    <h3 class="selector-header__subtitle">
      <span v-text="$t('subtitle.question')"></span>
      <a
        class="selector-header__link"
        href="https://metamask.io"
        target="_blank"
        v-text="$t('subtitle.cta')"
      ></a>
    </h3>
  </div>
</template>
<script>
export default {
  name: 'SelectorHeader',
  props: {
    small: { default: false, type: Boolean },
    title: {
      default() {
        return this.$t('title')
      },
      type: String,
    },
  },
}
</script>
<style lang="postcss" scoped>
.selector-header {
  &__title {
    @apply text-2xl font-bold;
  }

  &__link {
    @apply font-bold underline hover:text-primary;
  }

  &--small {
    .selector-header__title {
      @apply text-base;
    }

    .selector-header__subtitle {
      @apply text-sm;
    }
  }
}
</style>
