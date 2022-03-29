<template>
  <div class="ac-divider"><slot></slot></div>
</template>
<script>
export default {
  name: 'AcDivider',
  props: {},
}
</script>
<style lang="postcss" scoped>
.ac-divider {
  @apply w-full text-center text-gray-400 uppercase text-lg flex items-center;

  &::before,
  &::after {
    @apply flex-1 border-b border-gray-400 border-dashed;
    content: '';
  }

  &::before {
    @apply mr-3;
  }
  &::after {
    @apply ml-3;
  }
}
</style>
