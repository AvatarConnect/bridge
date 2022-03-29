# AvatarConnect Vue Logger

## Usage

```javascript
import VueLogger from '@local/logger

this.$logger = new VueLogger
  this,
  { verbose: this.$context.runtime !== 'production' }
)

this.$logger.info('Hello World')
```
