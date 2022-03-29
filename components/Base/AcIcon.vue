<template>
  <FontAwesomeIcon class="ac-icon" :icon="icon" />
</template>
<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  name: 'AcIcon',
  components: { FontAwesomeIcon },
  props: {
    icon: { required: true, type: Object },
  },
}
</script>
