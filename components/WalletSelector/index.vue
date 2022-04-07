<i18n locale="en" lang="json5">
{}
</i18n>
<template>
  <div class="wallet-selector">
    <SelectorHeader class="wallet-selector__header" />
    <ProviderSelector />
  </div>
</template>
<script>
import ProviderSelector from './ProviderSelector'
import SelectorHeader from './SelectorHeader'

export default {
  name: 'WalletSelector',
  components: { ProviderSelector, SelectorHeader },
}
</script>
<style lang="postcss" scoped>
.wallet-selector {
  @apply w-full mx-auto;
  max-width: 400px;

  &__header {
    @apply mb-8;
  }
}
</style>
