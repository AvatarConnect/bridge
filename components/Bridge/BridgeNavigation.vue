<i18n locale="en" lang="json5">
{
  titles: {
    choose: 'Choose your avatar',
    connect: 'Choose a different avatar',
  },
}
</i18n>
<template>
  <div
    class="bridge-navigation"
    :class="[!providerId && 'bridge-navigation--first-step']"
  >
    <div class="bridge-navigation__content" @click="clearProvider">
      <ac-icon class="bridge-navigation__stepper" :icon="backIcon" />
      <h3 class="bridge-navigation__title" v-text="title"></h3>
    </div>
  </div>
</template>
<script>
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { mapGetters } from 'vuex'

import { mapStoreModel } from '~/utils/computed'

export default {
  name: 'BridgeNavigation',
  data() {
    return {
      backIcon: faChevronLeft,
    }
  },
  computed: {
    ...mapGetters({ provider: 'bridge/activeProvider' }),
    ...mapStoreModel(
      'providerId',
      'bridge',
      'activeProviderId',
      'setActiveProviderId'
    ),
    title() {
      const { provider } = this
      return this.$t(`titles.${provider ? 'connect' : 'choose'}`, provider)
    },
  },
  methods: {
    clearProvider() {
      this.providerId = null
    },
  },
}
</script>
<style lang="postcss" scoped>
.bridge-navigation {
  @apply w-full px-4 py-3 bg-white;
  @apply backdrop-filter backdrop-blur-md bg-white bg-opacity-50;

  &--first-step {
    .bridge-navigation__stepper {
      @apply opacity-0;
    }

    .bridge-navigation__content {
      @apply cursor-default;
    }
  }

  &__content {
    @apply inline-flex items-center justify-start cursor-pointer;
  }

  &__stepper {
    @apply cursor-pointer mr-4;
  }

  &__title {
    @apply font-bold text-lg;
  }
}
</style>
