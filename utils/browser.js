/**
 * Based on the user's user-agent, return which WebGL build target we should use
 *
 * @param {string} browser The user agent's browser
 * @param {string} browserVersion The user agents browser version
 * @returns {1|2} The number 1 or 2
 */
export const getWebGlVersion = (browser, browserVersion) => {
  // https://caniuse.com/webgl2
  const WEBGL_SUPPORT_MAP = {
    Chrome: 56,
    Edge: 79,
    Firefox: 51,
    Opera: 43,
  }

  const supportedVersion = WEBGL_SUPPORT_MAP[browser]
  if (!supportedVersion) return 1
  return supportedVersion >= browserVersion ? 1 : 2
}
