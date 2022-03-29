<template>
  <div class="provider-selector">
    <div
      v-for="{ description, icon, id, name } in providers"
      :key="id"
      class="provider-selector__card"
      @click="provider = id"
    >
      <div class="provider-selector__icon-container">
        <img class="provider-selector__icon" :src="`/avatar-icons/${icon}`" />
      </div>
      <div class="provider-selector__info">
        <h2 class="provider-selector__name" v-text="name"></h2>
        <p class="provider-selector__description" v-text="description"></p>
      </div>
    </div>
  </div>
</template>
<script>
import providers from '~/providers'
import { mapModel } from '~/utils/computed'

export default {
  name: 'ProviderSelector',
  props: {
    /**
     * @model
     *
     * The ID of the active provider
     */
    value: { default: null, type: String },
  },
  data() {
    return {
      providers,
    }
  },
  computed: {
    ...mapModel('provider'),
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

  &__card {
    @apply rounded-xl py-4 px-10 cursor-pointer bg-white w-full;
    @apply hover:shadow-xl;
  }

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
