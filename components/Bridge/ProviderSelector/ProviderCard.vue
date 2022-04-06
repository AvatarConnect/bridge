<template>
  <div class="provider-card" @click="setProvider(provider.id)">
    <div class="provider-card__icon-container">
      <img class="provider-card__icon" :src="provider.icon" />
    </div>
    <div class="provider-card__info">
      <h2 class="provider-card__name" v-text="provider.title"></h2>
      <p class="provider-card__description" v-text="provider.description"></p>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'ProviderSelector',
  props: {
    provider: { required: true, type: Object },
  },
  methods: {
    ...mapActions({ setProvider: 'bridge/setActiveProviderId' }),
  },
}
</script>
<style lang="postcss" scoped>
.provider-card {
  @apply rounded-xl py-4 px-10 cursor-pointer bg-white w-full;
  @apply hover:shadow-xl;

  &__icon-container {
    @apply w-full flex justify-center py-5;
    height: 150px;
  }

  &__icon {
    @apply max-w-full h-full;
  }

  &__info {
    @apply text-center w-full mx-auto;
    max-width: 250px;
  }

  &__name {
    @apply text-lg font-black;
  }

  &__description {
    @apply text-gray-400;
  }
}
</style>
