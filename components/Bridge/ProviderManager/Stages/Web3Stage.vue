<i18n locale="en" lang="json5">
{
  error: 'Please confirm the request to continue',
  loading: 'Waiting for confirmation',
}
</i18n>
<template>
  <div class="web3-stage">
    <WalletSelector v-if="!provider" />
    <ac-loading-overlay v-else-if="isConnecting || isLoading" v-t="'loading'" />
  </div>
</template>
<script>
import WalletSelector from '@/WalletSelector'

import stage from './Common/mixins/stage'

export default {
  name: 'Web3Stage',
  components: { WalletSelector },
  mixins: [stage],
  data() {
    return {
      isLoading: false,
    }
  },
  computed: {
    ...mapGetters({
      isConnecting: 'web3/isConnecting',
      provider: 'web3/provider',
    }),
  },
  methods: {
    async executeRequest() {
      try {
        const {
          stage: { method, params },
        } = this
        const normalizedParams =
          typeof params === 'function' ? params.call(this) : params
        this.provider.request(method, normalizedParams)
      } catch (error) {
        this.error = true
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>
<style lang="postcss" scoped>
.web3-stage {
}
</style>
