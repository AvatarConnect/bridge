/**
 * Sanitizes a filthy, filthy, little string
 *
 * @param {string} youDirtyString an unsanitized string
 * @returns {string} a sanitized string
 */
export const escapeHTML = youDirtyString =>
  youDirtyString
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')

/**
 * Sanitizes a page number query option
 *
 * @param {*} page takes in a router page prop
 * @returns {number|undefined} returns a sanitized page number
 */
export const sanitizePageNumber = page => {
  if (isNaN(page)) return
  return parseInt(page)
}

/**
 * Sanitizes a sort query option
 *
 * @param {*} sorts A list of sort options from the router query
 * @returns {string[]|undefined} returns a sanitized page number
 */
export const sanitizeSort = sorts => {
  if (!sorts) return
  if (!Array.isArray(sorts)) sorts = [sorts]
  if (
    sorts.find(
      sort =>
        typeof sort !== 'string' ||
        sort.split(':').length < 2 ||
        !['asc', 'desc'].includes(sort.split(':')[1])
    )
  )
    return
  return sorts
}

/**
 * Sanitizes a router-provided boolean value
 *
 * @param {*} value A router-provided boolean value
 * @returns {boolean|undefined} A boolean value
 */
export const sanitizeBoolean = value => {
  if (value === 'true') return true
  if (value === 'false') return false
  return value === true || value === false ? value : undefined
}
