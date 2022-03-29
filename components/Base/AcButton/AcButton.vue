<template>
  <component
    :is="component"
    :to="to"
    :href="href"
    :style="style"
    :target="href ? '_blank' : undefined"
    :disabled="disabled || loading"
    :class="[
      accent && 'ac-button--accent',
      secondary && 'ac-button--secondary',
      tertiary && 'ac-button--tertiary',
      (disabled || loading) && 'ac-button--disabled',
      loading && 'ac-button--loading',
      large && 'ac-button--large',
      outlined && 'ac-button--outlined',
      rounded && 'ac-button--rounded',
      small && 'ac-button--small',
      text && 'ac-button--text',
    ]"
    class="ac-button"
    @click="handleClick"
  >
    <div v-if="loading" class="ac-button__loading-container">
      <m-loading-spinner class="ac-button__loading-spinner" />
    </div>
    <div class="ac-button__content">
      <slot></slot>
    </div>
  </component>
</template>
<script>
import { getColor } from '~/utils/theme'

export default {
  name: 'AcButton',
  props: {
    /** Sets the button to an accent theme */
    accent: { default: false, type: Boolean },

    /** Set the background color for the button */
    background: { default: undefined, type: String },

    /** Sets the button to a disabled state */
    disabled: { default: false, type: Boolean },

    /** An optional external link for the button */
    href: { default: undefined, type: String },

    /** Sets the button size to large */
    large: { default: false, type: Boolean },

    /** Sets the button to a loading state */
    loading: { default: false, type: Boolean },

    outlined: { default: false, type: Boolean },

    /** Rounds the borders on the button */
    rounded: { default: false, type: Boolean },

    /** Sets the button to a secondary theme */
    secondary: { default: false, type: Boolean },

    /** Sets the button size to small */
    small: { default: false, type: Boolean },

    /** Sets the button to a tertiary theme */
    tertiary: { default: false, type: Boolean },

    /** Sets the button to text only */
    text: { default: false, type: Boolean },

    /** Route for an internal page  */
    to: { default: undefined, type: [String, Object] },
  },
  computed: {
    backgroundColor() {
      const { accent, background, secondary, tertiary } = this
      return (
        background ||
        (accent
          ? 'primary'
          : secondary
          ? 'gray-500'
          : tertiary
          ? 'white'
          : 'black')
      )
    },
    component() {
      const { href, to } = this
      return href ? 'a' : to ? 'nuxt-link' : 'button'
    },
    style() {
      const { backgroundColor } = this
      return {
        '--background': getColor(backgroundColor),
      }
    },
  },
  methods: {
    handleClick($event) {
      const { disabled, loading } = this
      if (disabled || loading) return $event.stopPropagation()
      this.$emit('click', $event)
    },
  },
}
</script>
<style lang="postcss" scoped>
.ac-button {
  @apply text-white px-6 py-3 font-bold rounded-md inline-block cursor-pointer relative;
  background: var(--background);

  &:before {
    @apply absolute inset-0 rounded-md transition-opacity opacity-0;
    content: '';
    background: currentColor;
  }

  &:hover:before:not(.ac-button--disabled) {
    @apply opacity-10;
  }

  &--accent {
    @apply bg-primary;
  }

  &--tertiary {
    @apply text-gray-800;
  }

  &--rounded {
    @apply rounded-full;
  }

  &--disabled {
    @apply cursor-default;
  }

  &--disabled:not(.ac-button--outlined) {
    &:hover:before,
    &:before {
      @apply opacity-40;
    }
  }

  &--disabled.ac-button--outlined {
    @apply opacity-70;
  }

  &--text {
    @apply rounded-none bg-transparent text-black;
    padding: 0 !important;

    &:before {
      @apply hidden;
    }
  }

  &--loading {
    @apply pointer-events-none cursor-default;

    .ac-button__content {
      @apply opacity-0;
    }
  }

  &--large {
    @apply px-8 py-4 rounded-lg text-xl;

    &:before {
      @apply rounded-lg;
    }
  }

  &--outlined {
    @apply bg-transparent border border-white text-white;
  }

  &--small {
    @apply px-4 py-1 text-base;
  }

  &__loading-container {
    @apply absolute inset-0 flex justify-center items-center;
  }
}
</style>
