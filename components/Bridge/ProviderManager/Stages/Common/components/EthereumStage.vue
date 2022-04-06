<i18n locale="en" lang="json5">
{}
</i18n>
<template>
  <div class="ethereum-stage">
    <WalletSelector />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

import WalletSelector from '@/WalletSelector'

export default {
  name: 'EthereumStage',
  components: { WalletSelector },
  props: {
    loading: { default: false, type: Boolean },
  },
  computed: {
    ...mapGetters({
      isConnecting: 'web3/isConnecting',
      provider: 'web3/provider',
    }),
    isLoading() {
      const { isConnecting, loading } = this
      return isConnecting || loading
    },
  },
}
</script>
<style lang="postcss" scoped>
.ethereum-stage {
}
</style>
