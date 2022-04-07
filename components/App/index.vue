<template>
  <div>
    <slot>
      <Nuxt />
    </slot>
    <Snackbar />

    <Breakpoints />
    <SessionManager />
  </div>
</template>
<script>
import Snackbar from './components/Snackbar'

import Breakpoints from './controllers/Breakpoints'
import SessionManager from './controllers/SessionManager'

export default {
  name: 'App',
  components: { Breakpoints, SessionManager, Snackbar },
}
</script>
<style lang="postcss">
html {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
body {
  @apply bg-white h-full overflow-y-auto;
}
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>
