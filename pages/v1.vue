<i18n locale="en" lang="json5">
{}
</i18n>
<template>
  <div class="version-1">
    <Connector />
  </div>
</template>
<script>
import Connector from '@/Connector'

export default {
  name: 'Version1',
  components: { Connector },
}
</script>
<style lang="postcss" scoped>
.version-1 {
  @apply min-h-screen;
}
</style>
