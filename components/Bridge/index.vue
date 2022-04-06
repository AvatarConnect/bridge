<template>
  <div class="bridge">
    <BridgeNavigation />
    <transition-group
      tag="div"
      class="bridge__content"
      :name="provider ? 'slide' : 'slide-back'"
    >
      <ProviderSelector
        v-if="!provider"
        key="1"
        class="bridge__provider-selector"
      />
      <ProviderManager v-else key="2" class="bridge__provider" />
    </transition-group>
    <BridgeBusController />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

import BridgeBusController from './BridgeBusController'
import BridgeNavigation from './BridgeNavigation'
import ProviderManager from './ProviderManager'
import ProviderSelector from './ProviderSelector'

export default {
  name: 'Bridge',
  components: {
    BridgeBusController,
    BridgeNavigation,
    ProviderManager,
    ProviderSelector,
  },
  computed: {
    ...mapGetters({ provider: 'bridge/activeProvider' }),
  },
}
</script>
<style lang="postcss" scoped>
.bridge {
  @apply min-h-screen bg-gray-100 flex flex-col;

  &__provider-selector {
    @apply p-4;
  }

  &__content {
    @apply relative flex-1;
  }

  &__provider {
    @apply h-full;
  }
}
</style>
