<template>
  <p class="ac-loading-text">
    <slot></slot>
    <span class="ac-loading-text__ellipses" v-text="ellipses"></span>
  </p>
</template>
<script>
export default {
  name: 'AcLoadingText',
  data() {
    return {
      count: 0,
      interval: null,
    }
  },
  computed: {
    ellipses() {
      const ellipses = this.count % 4
      const spaces = 3 - ellipses
      return Array(ellipses)
        .fill()
        .map(() => '.')
        .concat(
          Array(spaces)
            .fill()
            .map(() => ' ')
        )
        .join('')
    },
  },
  mounted() {
    this.interval = setInterval(() => this.count++, 300)
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
}
</script>
<style lang="postcss" scoped>
.ac-loading-text {
  @apply flex;

  &__ellipses {
    @apply whitespace-pre;
    font-family: monospace;
    letter-spacing: -0.2em;
  }
}
</style>
