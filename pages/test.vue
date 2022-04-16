<script>
import AvatarConnect from '@avatarconnect/sdk'

import { getBaseUrl } from '~/utils/helpers'

/**
 * INSTRUCTIONS:
 * -----------------------------------
 * Modify this provider config array to include
 * your provider ID and/or configuration tuple
 */
const PROVIDER_CONFIG = []

export default {
  name: 'Test',
  mounted() {
    if (!process.browser) return

    this.connector = new AvatarConnect(PROVIDER_CONFIG, {
      bridgeUrl: getBaseUrl(window.location.href),
      maxHeight: 610,
    })

    // eslint-disable-next-line no-console
    this.connector.on('result', console.log)
    // eslint-disable-next-line no-console
    this.connector.on('error', console.error)

    this.connector.enable()
  },
  render: () => null,
}
</script>
