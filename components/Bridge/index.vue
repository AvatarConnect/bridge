<template>
  <div class="bridge">
    <BridgeNavigation class="bridge__navigation" />
    <div class="bridge__container">
      <transition
        v-if="!provider"
        class="bridge__content"
        name="slide-back"
        tag="div"
      >
        <ProviderSelector class="bridge__provider-selector"
      /></transition>
      <transition v-else class="bridge__content" name="slide" tag="div">
        <ProviderManager class="bridge__provider" />
      </transition>
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

  &__provider-selector,
  &__provider {
    @apply p-4;
  }

  &__container {
    @apply relative flex-1 mt-12;
  }

  &__content {
    @apply mb-4 p-4;
  }
}

.slide-back-leave-to,
.slide-enter {
  transform: translate(100%, 0);
}

.slide-back-enter,
.slide-leave-to {
  transform: translate(-100%, 0);
}

.slide-leave-active,
.slide-enter-active,
.slide-back-leave-active,
.slide-back-enter-active {
  transition: 0.15s;
  @apply absolute top-0 left-0 right-0;
}
</style>
