<i18n locale="en" lang="json5">
{
  error: 'Please confirm the request to continue',
  loading: 'Waiting for confirmation',
}
</i18n>
<template>
  <div class="web3-stage">
    <WalletSelector v-if="!isConnected" />
    <ac-loading-overlay
      v-else-if="isConnecting || isLoading"
      v-text="$t('loading')"
    />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

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
      isConnected: 'web3/isConnected',
      isConnecting: 'web3/isConnecting',
      web3Provider: 'web3/provider',
    }),
  },
  watch: {
    isConnected: 'executeRequest',
  },
  mounted() {
    this.executeRequest()
  },
  methods: {
    async executeRequest() {
      if (!this.isConnected) return
      try {
        const {
          stage: { method, params },
        } = this
        const normalizedParams =
          typeof params === 'function' ? params.call(this) : params || []
        const result = await this.web3Provider.request({
          method,
          params: normalizedParams,
        })
        this.$emit('result', result)
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
