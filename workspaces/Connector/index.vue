<template>
  <div class="connector">
    <ConnectorNavigation />
    <transition-group
      tag="div"
      class="connector__content"
      :name="provider ? 'slide' : 'slide-back'"
    >
      <ProviderSelector
        v-if="!provider"
        key="1"
        v-model="activeProviderId"
        class="connector__provider-selector"
      />
      <component
        :is="provider.component"
        v-else
        key="2"
        class="connector__provider"
        @set-avatar="setAvatar"
      />
    </transition-group>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

import { mapStoreModel } from '~/utils/computed'

import IframeBus from '@local/iframe-bus'

import ConnectorNavigation from './ConnectorNavigation'
import ProviderSelector from './ProviderSelector'

export default {
  name: 'Connector',
  components: {
    ConnectorNavigation,
    ProviderSelector,
  },
  computed: {
    ...mapGetters({ provider: 'connector/activeProvider' }),
    ...mapStoreModel(
      'activeProviderId',
      'connector',
      'activeProviderId',
      'setActiveProviderId'
    ),
  },
  mounted() {
    this.bus = new IframeBus()
    this.bus.on('configure', this.configureProviders)
  },
  methods: {
    ...mapActions({ configureProviders: 'connector/configure' }),
    setAvatar(avatarMetadata) {
      this.bus.send('result', avatarMetadata)
    },
  },
}
</script>
<style lang="postcss" scoped>
.connector {
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
