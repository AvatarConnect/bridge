import { mapGetters } from 'vuex'

const BREAKPOINT_MAP = {
  '2xl': 4,
  lg: 2,
  md: 1,
  sm: 0,
  xl: 3,
}

const getBreakpoints = breakpoint => {
  const index = BREAKPOINT_MAP[breakpoint]

  return {
    '2xl': breakpoint === '2xl',
    '2xlAndDown': index <= 4,
    lg: breakpoint === 'lg',
    lgAndDown: index <= 2,
    lgAndUp: index >= 2,
    md: breakpoint === 'md',
    mdAndDown: index <= 1,
    mdAndUp: index >= 1,
    sm: breakpoint === 'sm',
    smAndUp: index >= 0,
    xl: breakpoint === 'xl',
    xlAndDown: index <= 3,
    xlAndUp: index >= 3,
  }
}

export default {
  computed: {
    ...mapGetters({ $_b_breakpoint: 'theme/breakpoint' }),
    $breakpoints() {
      return getBreakpoints(this.$_b_breakpoint)
    },
  },
}
