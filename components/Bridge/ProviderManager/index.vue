<template>
  <component
    :is="currentStageComponent"
    class="provider-manager"
    v-bind="currentStageProps"
    @result="handleResult"
    @error="handleError"
  />
</template>
<script>
import { mapGetters } from 'vuex'

import bridgeBus from '@/Bridge/Common/mixins/bridgeBus'

export default {
  name: 'ProviderManager',
  components: {
    IframeStage: () =>
      import(/* webpackPrefetch: true */ './Stages/IframeStage'),
    OAuthStage: () => import(/* webpackPrefetch: true */ './Stages/OAuthStage'),
    SelectStage: () =>
      import(/* webpackPrefetch: true */ './Stages/SelectStage'),
    TransformStage: () =>
      import(/* webpackPrefetch: true */ './Stages/TransformStage'),
    Web3Stage: () => import(/* webpackPrefetch: true */ './Stages/Web3Stage'),
  },
  mixins: [bridgeBus],
  data() {
    return {
      aggregate: null,
      stage: 0,
    }
  },
  computed: {
    ...mapGetters({
      config: 'bridge/activeProviderConfig',
      provider: 'bridge/activeProvider',
    }),
    currentStage() {
      const { providerPipeline, stage } = this
      return providerPipeline[stage]
    },
    currentStageComponent() {
      const { component, type } = this.currentStage
      switch (type) {
        case 'custom':
          return component
        case 'iframe':
          return 'IframeStage'
        case 'oauth':
          return 'OAuthStage'
        case 'transform':
          return 'TransformStage'
        case 'select':
          return 'SelectStage'
        case 'web3':
          return 'Web3Stage'
        default:
          return null
      }
    },
    currentStageProps() {
      const { aggregate, currentStage: stage, provider } = this
      return {
        aggregate,
        provider,
        stage,
      }
    },
    providerPipeline() {
      return this.provider.pipeline
    },
  },
  methods: {
    handleError(error) {
      this.$debug(error)
    },
    async handleResult(result) {
      const { providerPipeline, stage } = this
      if (stage.format) result = stage.format.call(this, result)
      if (stage + 1 === providerPipeline.length)
        return this.resolveToClient(result)
      this.aggregate = result
      this.stage += 1
    },
    resolveToClient(result) {
      const { provider } = this
      this.$sendMessage('result', {
        type: provider.id,
        [provider.id]: result,
      })
    },
  },
}
</script>
