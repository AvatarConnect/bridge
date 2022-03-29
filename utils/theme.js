import resolveConfig from 'tailwindcss/lib/util/resolveConfig'
import defaultConfig from 'tailwindcss/stubs/defaultConfig.stub'

import customConfig from '~/tailwind.config'

const config = resolveConfig([customConfig, defaultConfig]).theme

export const getColor = colorKey => {
  if (colorKey.startsWith('#') || colorKey.startsWith('rgb')) return colorKey
  const paths = colorKey.split('-')
  let value = config.colors
  for (const k of paths) {
    value = value[k]
  }
  return value
}

export const getBreakpoint = breakpoint =>
  parseInt(config.screens[breakpoint].max.replace('px', ''))
