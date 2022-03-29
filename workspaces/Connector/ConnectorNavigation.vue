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
    class="connector-navigation"
    :class="[!providerId && 'connector-navigation--first-step']"
  >
    <ac-icon
      class="connector-navigation__stepper"
      :icon="backIcon"
      @click.native="clearProvider"
    />
    <h3 class="connector-navigation__title" v-text="title"></h3>
  </div>
</template>
<script>
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { mapGetters } from 'vuex'

import { mapStoreModel } from '~/utils/computed'

export default {
  name: 'ConnectorNavigation',
  data() {
    return {
      backIcon: faChevronLeft,
    }
  },
  computed: {
    ...mapGetters({ provider: 'connector/activeProvider' }),
    ...mapStoreModel(
      'providerId',
      'connector',
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
.connector-navigation {
  @apply w-full px-4 py-3 bg-white flex items-center;

  &--first-step {
    .connector-navigation__stepper {
      @apply opacity-0;
    }
  }

  &__stepper {
    @apply cursor-pointer mr-4;
  }

  &__title {
    @apply font-bold text-lg;
  }
}
</style>
