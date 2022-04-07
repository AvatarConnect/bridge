<i18n locale="en" lang="json5">
{}
</i18n>
<template>
  <div class="selection-card" :style="style">
    <div class="selection-card__container">
      <p v-if="name" class="selection-card__name" v-text="name"></p>
    </div>
  </div>
</template>
<script>
import image from '~/mixins/image'

export default {
  name: 'SelectionCard',
  mixins: [image('imageProps', { target: '$imageSrc' })],
  props: {
    item: { required: true, type: null },
    stage: { required: true, type: Object },
  },
  computed: {
    image() {
      const {
        item,
        stage: { image },
      } = this
      return typeof image === 'function' ? image(item) : image
    },
    imageProps() {
      const { image } = this
      return {
        fit: 'cover',
        height: 600,
        src: image,
        width: 400,
      }
    },
    name() {
      const {
        item,
        stage: { name },
      } = this
      if (!name) return null
      return typeof name === 'function' ? name(item) : name
    },
    style() {
      const { $imageSrc } = this
      return {
        '--background-image': `url("${$imageSrc}")`,
      }
    },
  },
}
</script>
<style lang="postcss" scoped>
.selection-card {
  @apply relative;
  @apply cursor-pointer;

  &__container {
    @apply absolute inset-0 transition-all;
    @apply rounded-2xl bg-no-repeat bg-cover bg-center px-3;
    background-image: var(--background-image);
    transform: translate3d(0, 0, 0);
  }

  &__name {
    @apply text-lg text-gray-100 font-light
      bg-gray-800 bg-opacity-70 px-4 py-2 rounded-full
      transition-all absolute right-4 bottom-4;
    @apply md:text-base md:px-3 md:py-1;
  }

  &:hover {
    .selection-card {
      &__name {
        @apply transform scale-110;
      }

      &__container {
        @apply shadow-2xl shadow-blue-200 border-2 border-blue-500;
        left: -8px;
        right: -8px;
        top: -8px;
        bottom: -8px;
      }
    }
  }
}
</style>
