<template>
  <div class="bridge">
    <BridgeNavigation class="bridge__navigation" />
    <div class="bridge__container">
      <transition-group
        class="bridge__content"
        :name="provider ? 'slide' : 'slide-back'"
        tag="div"
      >
        <ProviderSelector
          v-if="!provider"
          key="1"
          class="bridge__provider-selector"
        />
        <ProviderManager v-else key="2" class="bridge__provider" />
      </transition-group>
    </div>
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

  &__navigation {
    @apply fixed top-0 left-0 right-0 z-50;
  }

  &__provider-selector {
    @apply p-4;
  }

  &__container {
    @apply relative flex-1 mt-12;
  }

  &__content {
    @apply mb-4;
  }

  &__provider {
    @apply h-full;
  }
}

.slide-leave-active,
.slide-enter-active {
  transition: 0.3s;
}
.slide-enter {
  transform: translate(100%, 0);
}
.slide-leave-to {
  transform: translate(-100%, 0);
}

.slide-back-leave-active,
.slide-back-enter-active {
  transition: 0.3s;
}
.slide-back-enter {
  transform: translate(-100%, 0);
}
.slide-back-leave-to {
  transform: translate(100%, 0);
}
</style>
