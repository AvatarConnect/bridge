<template>
  <transition-group name="fade" class="snackbar" tag="div">
    <div
      v-for="{ icon, id, message, mode } in snacks"
      :key="id"
      class="snackbar__snack"
      :class="[`snackbar__snack--${mode}`]"
    >
      <ac-icon :icon="icon" />
      <span class="snackbar__message" v-text="message"></span>
      <ac-icon
        :icon="closeIcon"
        size="lg"
        class="snackbar__close"
        @click="popSnack(id)"
      />
    </div>
  </transition-group>
</template>
<script>
import {
  faCheckCircle,
  faExclamationCircle,
  faExclamationTriangle,
  faInfoCircle,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'

import bus from '~/mixins/bus'

const TIMEOUT = 3500
const TRANSITION_DURATION = 200

export default {
  name: 'Snackbar',
  mixins: [bus],
  data() {
    return {
      closeIcon: faTimes,
      snacks: [],
    }
  },
  mounted() {
    this.$bus.on('root-notification', this.pushSnack)
  },
  methods: {
    getIcon(mode) {
      return {
        error: faExclamationCircle,
        info: faInfoCircle,
        success: faCheckCircle,
        warning: faExclamationTriangle,
      }[mode]
    },
    async popSnack(id) {
      const index = this.snacks.findIndex(snack => snack.id === id)
      this.snacks[index].hidden = true
      setTimeout(() => {}, TRANSITION_DURATION)
    },
    async pushSnack({ message, mode }) {
      const id = Math.floor(Math.random() * 1000000)
      this.snacks.push({
        hidden: true,
        icon: this.getIcon(mode),
        id,
        message,
        mode,
      })
      const index = this.snacks.length - 1
      setTimeout(() => {
        this.popSnack(id)
      }, TIMEOUT)
      setTimeout(() => {
        this.snacks[index].hidden = false
      }, 10)
    },
  },
}
</script>
<style lang="postcss" scoped>
.snackbar {
  @apply fixed bottom-10 w-full flex flex-col space-y-4 items-center z-50 pointer-events-none;
  @apply sm:top-10 sm:bottom-auto;

  &__message {
    @apply flex-1;
  }

  &__close {
    @apply cursor-pointer;
  }

  &__snack {
    @apply rounded-lg flex space-x-4 items-center py-2 px-4 font-bold;
    pointer-events: all !important;
    width: 98%;
    max-width: 400px;

    &--info {
      @apply bg-blue-300 text-blue-900 bg-opacity-70 backdrop-filter backdrop-blur-md;
    }

    &--success {
      @apply bg-green-300 text-green-900 bg-opacity-70 backdrop-filter backdrop-blur-md;
    }

    &--error {
      @apply bg-red-300 text-red-900 bg-opacity-70 backdrop-filter backdrop-blur-md;
    }

    &--warning {
      @apply bg-yellow-300 text-yellow-900 bg-opacity-70 backdrop-filter backdrop-blur-md;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  @apply transition-all duration-300;
}

.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
  transform: translateX(-20px);
}
</style>
