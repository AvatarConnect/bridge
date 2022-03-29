<template>
  <OauthProvider
    provider="meebits"
    :create-redirect="createRedirect"
    icon="meebits.svg"
    @result="handleMessage"
  />
</template>
<script>
import OauthProvider from '~/components/Common/OauthProvider'

export default {
  name: 'MeebitsProvider',
  components: { OauthProvider },
  methods: {
    createRedirect(callback) {
      return `https://meebits.larvalabs.com/meebits/apiAccessRequest?callbackUrl=${callback}`
    },
    handleMessage(message) {
      // console.log(message)
    },
  },
}
</script>
