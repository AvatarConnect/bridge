<template>
  <transition-group
    ref="transition-group"
    tag="div"
    class="ac-window-group"
    :name="activeProviderId ? 'slide' : 'slide-back'"
  >
    <!--
      @slot The window group content
      -->
    <slot></slot>
  </transition-group>
</template>
<script>
export default {
  name: 'AcWindow',
}
</script>
<style lang="postcss" scoped>
.ac-window {
  .slide-leave-active,
  .slide-enter-active {
    transition: 0.3s;
  }
  .slide-enter {
    transform: translate(100%, 0);
  }
  .slide-leave-to {
    transform: translate(-100%, 0);
  }

  .slide-back-leave-active,
  .slide-back-enter-active {
    transition: 0.3s;
  }
  .slide-back-enter {
    transform: translate(-100%, 0);
  }
  .slide-back-leave-to {
    transform: translate(100%, 0);
  }
}
</style>
