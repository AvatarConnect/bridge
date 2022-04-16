<i18n locale="en" lang="json5">
{
  empty: {
    subtitles: {
      default: 'Try choosing another avatar',
      purchase: 'Get a {name} <a href="{purchaseLink}" class="underline" target="_blank">here</a>',
    },
    title: 'No {pluralName} found',
  },
}
</i18n>
<template>
  <div
    class="select-stage"
    :class="[!aggregate.length && 'select-stage--empty']"
  >
    <div v-if="aggregate.length" class="select-stage__list">
      <SelectionCard
        v-for="(item, i) in aggregate"
        :key="i"
        :stage="stage"
        :item="item"
        class="select-stage__card"
        @click.native="select(item)"
      />
    </div>
    <ac-empty-list
      v-else
      :title="emptyListTitle"
      :subtitle="emptyListSubtitle"
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
  computed: {
    emptyListSubtitle() {
      const { provider } = this
      return this.$t(
        `empty.subtitles.${provider.purchaseLink ? 'purchase' : 'default'}`,
        provider
      )
    },
    emptyListTitle() {
      return this.$t('empty.title', this.provider)
    },
  },
  methods: {
    select(item) {
      this.$emit('result', item)
    },
  },
}
</script>
<style lang="postcss" scoped>
.select-stage {
  &__list {
    @apply grid gap-4 place-items-center;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));

    @screen lg {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
  }

  &__card {
    @apply w-full;
    height: 420px;

    @screen lg {
      height: 370px;
    }
  }

  &--empty {
    @apply mt-12;
  }
}
</style>
