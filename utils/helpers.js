const getComparisonStringDefault = str => str

export const alphabetize = (
  list,
  getComparisonString = getComparisonStringDefault
) =>
  list.sort((a, b) =>
    getComparisonString(a).localeCompare(getComparisonString(b))
  )

export const isUrl = string => /http:\/\/|https:\/\/|ipfs:\/\//.test(string)

export const getBaseUrl = path => {
  const pathArray = path.split('/')
  const protocol = pathArray[0].replace(':', '')
  const host = pathArray[2]
  return `${protocol}://${host}`
}

export const getFileExtensionFromUrl = url =>
  url.split(/[#?]/)[0].split('.').pop().trim()

export const wait = async time =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, time)
  })

export const replaceExtension = (uri, extension) => {
  const beginning = uri.substr(0, uri.lastIndexOf('.'))
  const queryString = uri.split('?')[1]
  let newUri = `${beginning}.${extension}`
  if (queryString) newUri += `?${queryString}`
  return newUri
}

export const getExtension = uri => uri.split('.').pop().split('?')[0]

/**
 * Removes the Vue observers from any objects/arrays
 *
 * @param {*} any A dirty variable
 * @returns {*} A cleaned variable
 */
export const removeObserver = any => JSON.parse(JSON.stringify(any))
