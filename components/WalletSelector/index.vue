<i18n locale="en" lang="json5">
{
  error: 'Make sure you have a wallet set up to log in',
  providers: {
    metamask: 'MetaMask',
    walletconnect: 'WalletConnect',
  },
}
</i18n>
<template>
  <div class="wallet-selector">
    <ac-button
      v-for="{ provider, color } in providers"
      :key="provider"
      :disabled="isConnecting"
      :background="color"
      @click="setProvider(provider)"
    >
      <p class="wallet-selector__button">
        <span v-text="$t(`providers.${provider}`)"></span>
        <ac-loading-spinner
          v-if="isConnecting && provider === chosenProvider"
          class="wallet-selector__icon"
        />
        <img
          v-else
          :src="`/wallet-icons/${provider}.svg`"
          class="wallet-selector__icon"
        />
      </p>
    </ac-button>
    <p v-if="error" v-t="'error'" class="wallet-selector__error"></p>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'WalletSelector',
  data() {
    return {
      chosenProvider: null,
      error: null,
      isConnecting: false,
      providers: [
        {
          color: 'black',
          provider: 'metamask',
        },
        {
          color: 'blue-800',
          provider: 'walletconnect',
        },
      ],
    }
  },
  methods: {
    ...mapActions({ changeProvider: 'web3/changeProvider' }),
    async setProvider(provider) {
      try {
        this.error = null
        this.isConnecting = true
        this.chosenProvider = provider
        await this.changeProvider(provider)
      } catch (error) {
        this.error = error
      } finally {
        this.isConnecting = false
      }
    },
  },
}
</script>
<style lang="postcss" scoped>
.wallet-selector {
  @apply grid gap-4;

  &__button {
    @apply flex items-center justify-center;
  }

  &__icon {
    @apply ml-4;
    height: 25px;
  }

  &__error {
    @apply text-red-600 mt-2 font-bold text-sm;
  }
}
</style>
