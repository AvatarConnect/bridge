<i18n locale="en" lang="json5">
{}
</i18n>
<template>
  <div class="transform-stage">
    <ac-loading-overlay />
  </div>
</template>
<script>
import stage from './Common/mixins/stage'

export default {
  name: 'TransformStage',
  mixins: [stage],
  async mounted() {
    try {
      const result = await this.stage.transform.call(this)
      this.$emit('result', result)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
      this.$emit('error', error)
    }
  },
}
</script>
<style lang="postcss" scoped>
.transform-stage {
  @apply w-full h-full;
}
</style>
