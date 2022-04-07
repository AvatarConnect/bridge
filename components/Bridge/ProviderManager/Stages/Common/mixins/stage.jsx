import { mapGetters } from 'vuex'

export default {
  props: {
    /** The aggregate result from each stage */
    aggregate: { required: true, type: null },

    /** The current provider */
    provider: { required: true, type: Object },

    /** The current stage in the aggregation process */
    stage: { required: true, type: Object },
  },
  computed: {
    ...mapGetters({
      config: 'bridge/activeProviderConfig',
      ethereumAddress: 'web3/address',
    }),
  },
}
