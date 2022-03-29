import { mapActions } from 'vuex'

import { getBreakpoint } from '~/utils/theme'

export default {
  name: 'Breakpoints',
  created() {
    if (!process.browser) return

    const breakpoints = [
      { max: 'sm', name: 'sm' },
      { max: 'md', min: 'sm', name: 'md' },
      { max: 'lg', min: 'md', name: 'lg' },
      { max: 'xl', min: 'lg', name: 'xl' },
      { min: 'xl', name: '2xl' },
    ]

    breakpoints.forEach(({ max, min, name }) => {
      const query = []
      if (max) query.push(`(max-width: ${getBreakpoint(max)}px)`)
      if (min) query.push(`(min-width: ${getBreakpoint(min) + 1}px)`)
      this.setQueryListener(name, query.join(' and '))
    })
  },
  methods: {
    ...mapActions({ setBreakpoint: 'theme/setBreakpoint' }),
    checkBreakpoint(breakpoint, event) {
      if (event.matches) this.setBreakpoint(breakpoint)
    },
    setQueryListener(breakpoint, query) {
      const mediaQuery = window.matchMedia(query)

      this.checkBreakpoint(breakpoint, mediaQuery)

      const listener = e => this.checkBreakpoint(breakpoint, e)

      try {
        // Chrome & Firefox
        mediaQuery.addEventListener('change', listener)
      } catch (error) {
        // Safari
        mediaQuery.addListener(listener)
      }
    },
  },
  render: () => null,
}
