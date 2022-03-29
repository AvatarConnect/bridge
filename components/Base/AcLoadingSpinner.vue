<template>
  <div class="ac-loading-spinner" :class="`ac-loading-spinner--${size}`"></div>
</template>
<script>
export default {
  name: 'AcLoadingSpinner',
  props: {
    /** Sets the spinner to a large size */
    large: { default: false, type: Boolean },

    /** Sets the spinner to a medium size */
    medium: { default: true, type: Boolean },

    /** Sets the spinner to a small size */
    small: { default: false, type: Boolean },
  },
  computed: {
    size() {
      return ['xSmall', 'small', 'large', 'xLarge', 'medium'].find(
        size => this[size]
      )
    },
  },
}
</script>
<style lang="postcss" scoped>
.ac-loading-spinner {
  @apply ease-linear rounded-full border-gray-200;

  border-top-color: theme('colors.primary');
  -webkit-animation: spinner 0.7s linear infinite;
  animation: spinner 0.7s linear infinite;

  &--large {
    @apply h-8 w-8 border-t-4 border-4;
  }

  &--medium {
    @apply h-6 w-6 border-t-2 border-2;
  }

  &--small {
    @apply h-4 w-4 border-t border;
  }
}

@-webkit-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
