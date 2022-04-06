<i18n locale="en" lang="json5">
{}
</i18n>
<template>
  <div class="ac-loading-overlay">
    <ac-loading-spinner large />
  </div>
</template>
<script>
export default {
  name: 'AcLoadingOverlay',
}
</script>
<style lang="postcss" scoped>
.ac-loading-overlay {
  @apply absolute inset-0 flex justify-center items-center;
}
</style>
