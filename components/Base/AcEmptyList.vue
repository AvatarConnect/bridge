<i18n locale="en" lang="json5">
{
  subtitle: 'Try refining your search',
  title: 'No results found',
}
</i18n>
<template>
  <div class="ac-empty-list">
    <img
      src="/illustrations/sleepy-face.png"
      class="ac-empty-list__illustration"
    />
    <h3 class="ac-empty-list__title" v-text="title"></h3>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <p v-html="subtitle"></p>
  </div>
</template>
<script>
export default {
  name: 'AcEmptyList',
  props: {
    /** Sets the subtitle for the empty list */
    subtitle: {
      default() {
        return this.$t('subtitle')
      },
      type: String,
    },

    /** Sets the title for the emtpy list */
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
.ac-empty-list {
  @apply flex flex-col items-center justify-center text-gray-400;

  &__illustration {
    @apply mb-2;
    width: 100px;
  }

  &__title {
    @apply font-normal mb-1 text-xl;
  }
}
</style>
