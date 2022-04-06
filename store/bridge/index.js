import actions from './actions'
import getters from './getters'
import model from './model'
import mutations from './mutations'

export default {
  actions,
  getters,
  mutations,
  state: () => model,
}
