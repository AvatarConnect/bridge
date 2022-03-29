import Vue from 'vue'

import tooltip from '~/directives/tooltip'

import notify from '~/mixins/notify'

const DIRECTIVES = { tooltip }
const MIXINS = [notify]

for (const mixin of MIXINS) {
  Vue.mixin(mixin)
}

for (const [name, directive] of Object.entries(DIRECTIVES)) {
  Vue.directive(name, directive)
}
