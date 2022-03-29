import app from './app'
import build from './build'
import environment from './environment'
import head from './head'
import integrations from './integrations'

export default {
  ...app,
  ...build,
  ...environment,
  ...head,
  ...integrations,
}
