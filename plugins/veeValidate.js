import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import {
  email,
  max,
  max_value,
  min_value,
  required,
} from 'vee-validate/dist/rules'
import Vue from 'vue'

import { isUrl } from '~/utils/helpers'

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

const url = {
  validate: value => isUrl(value),
}

const address = {
  validate: value => /^0x[a-fA-F0-9]{40}$/.test(value),
}

const rules = {
  address,
  email,
  max,
  max_value,
  min_value,
  required,
  url,
}

Object.entries(rules).forEach(([key, value]) => extend(key, value))
