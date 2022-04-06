<template>
  <div class="provider-selector">
    <ProviderCard
      v-for="provider in providers"
      :key="provider.id"
      :provider="provider"
    />
  </div>
</template>
<script>
// TODO: Show loading overlay while waiting for configuration
import { mapGetters } from 'vuex'

import ProviderCard from './ProviderCard'

export default {
  name: 'ProviderSelector',
  components: { ProviderCard },
  computed: {
    ...mapGetters({ providers: 'bridge/providers' }),
  },
}
</script>
<style lang="postcss" scoped>
.provider-selector {
  @apply grid gap-2 place-items-center;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));

  @screen lg {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }

  @screen sm {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}
</style>
