<template>
  <div
    v-resize.quiet="onResize"
    class="m-pagination"
    :class="[disabled && 'm-pagination--disabled']"
  >
    <div class="m-pagination__inner">
      <div
        v-for="(page, index) in pages"
        :key="`${page}-${index}`"
        class="m-pagination__page"
        :style="pageStyles"
      >
        <button
          v-if="page !== '...'"
          class="m-pagination__page-button"
          :class="[page === activePage && 'm-pagination__page-button--active']"
          :disabled="disabled"
          @click="goToPage(page)"
          v-text="page"
        ></button>
        <div v-else class="m-pagination__ellipsis">...</div>
      </div>
    </div>
  </div>
</template>
<script>
import resize from '~/directives/resize'
import { mapModel } from '~/utils/computed'

export default {
  name: 'MPagination',
  directives: { resize },
  props: {
    /** Sets the pagination component to a disabled state */
    disabled: { default: false, type: Boolean },

    /** The max number of pages visible */
    maxVisible: { default: 7, type: [Number, String] },

    /** Sets the page count of the pagination */
    pageCount: { default: 1, type: [Number, String] },

    /** @model */
    value: { default: 1, type: [Number, String] },
  },
  data() {
    return {
      maxButtons: 0,
    }
  },
  computed: {
    ...mapModel('activePage'),
    isFirstPage() {
      return this.activePage === 1
    },
    isLastPage() {
      const { pageCount, activePage } = this

      return activePage === parseInt(pageCount)
    },
    nextPageEvent() {
      const { disabled, isLastPage } = this

      return !isLastPage && !disabled ? 'click:append' : null
    },
    pageStyles() {
      return { color: this.$stateColor }
    },
    pages() {
      const {
        activePage,
        pageCount: pageCountProp,
        range,
        maxVisible: maxVisibleProp,
      } = this

      const maxVisible = parseInt(maxVisibleProp)
      const pageCount = parseInt(pageCountProp)
      const maxPageCount = Math.min(
        Math.max(0, maxVisible) || pageCount,
        Math.max(0, this.maxButtons) || pageCount,
        pageCount
      )

      if (pageCount <= maxPageCount) {
        return range(1, pageCount)
      }

      const even = maxPageCount % 2 === 0 ? 1 : 0
      const left = Math.floor(maxPageCount / 2)
      const right = pageCount - left + 1 + even

      if (activePage > left && activePage < right) {
        const start = activePage - left + 2
        const end = activePage + left - 2 - even
        return [1, '...', ...range(start, end), '...', pageCount]
      } else if (activePage === left) {
        const end = activePage + left - 1 - even
        return [...range(1, end), '...', pageCount]
      } else if (activePage === right) {
        const start = activePage - left + 1
        return [1, '...', ...range(start, pageCount)]
      } else {
        return [...range(1, left), '...', ...range(right, pageCount)]
      }
    },
    previousPageEvent() {
      const { disabled, isFirstPage } = this

      return !isFirstPage && !disabled ? 'click:prepend' : null
    },
  },
  watch: {
    value() {
      this.init()
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    getWidthWithoutPadding(el) {
      const style = getComputedStyle(el)

      return (
        el.clientWidth -
        (parseFloat(style.paddingLeft) + parseFloat(style.paddingRight))
      )
    },
    goToPage(page) {
      if (this.$listeners.change) {
        this.$emit('change', page)
      } else {
        this.activePage = page
      }
    },
    init() {
      this.$nextTick(this.onResize)
    },
    nextPage() {
      const { activePage, goToPage, pageCount } = this

      goToPage(Math.min(pageCount, activePage + 1))
    },
    onResize() {
      const width =
        this.$el && this.$el.parentElement
          ? this.getWidthWithoutPadding(this.$el.parentElement)
          : window.innerWidth

      this.maxButtons = Math.floor((width - 41) / 38)
    },
    previousPage() {
      const { activePage, goToPage } = this

      goToPage(Math.max(1, activePage - 1))
    },
    range(start, end) {
      const range = []

      start = start > 0 ? start : 1

      for (let i = start; i <= end; i++) {
        range.push(i)
      }

      return range
    },
  },
}
</script>
<style lang="postcss" scoped>
$page-width: 50px;

.m-pagination {
  @apply text-center text-2xl font-black;

  &__inner {
    @apply flex flex-row;
  }

  &__page {
    @apply text-center mx-2;
    width: $page-width;
    height: $page-width;
    line-height: $page-width;
  }

  &__ellipsis {
    &:hover {
      @apply cursor-default;
    }
  }

  &__page-button {
    @apply rounded-lg transition bg-gray-100;
    min-width: $page-width;
    outline: none;

    &--active {
      @apply bg-gray-400 text-white;
    }
  }

  &:not(.m-pagination--disabled) {
    .m-pagination__page-button {
      &--active {
        @apply bg-primary;
      }
    }
  }
}
</style>
