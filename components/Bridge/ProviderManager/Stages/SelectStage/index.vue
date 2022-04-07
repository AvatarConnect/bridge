<template>
  <div class="select-stage">
    <SelectionCard
      v-for="(item, i) in aggregate"
      :key="i"
      :stage="stage"
      :item="item"
      class="select-stage__card"
      @click.native="select(item)"
    />
  </div>
</template>
<script>
import stage from '../Common/mixins/stage'

import SelectionCard from './SelectionCard'

export default {
  name: 'SelectStage',
  components: { SelectionCard },
  mixins: [stage],
  methods: {
    select(item) {
      this.$emit('result', item)
    },
  },
}
</script>
<style lang="postcss" scoped>
.select-stage {
  @apply grid gap-4 place-items-center;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));

  @screen lg {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }

  &__card {
    @apply w-full;
    height: 420px;

    @screen lg {
      height: 370px;
    }
  }
}
</style>
