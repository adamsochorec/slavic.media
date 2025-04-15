import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
function createRemoteCollection(fetchEndpoint) {
  let _cache
  return async () => {
    if (_cache)
      return _cache
    const res = await fetch(fetchEndpoint).then(r => r.json())
    _cache = res
    return res
  }
}

export const collections = {
  'bxl': () => require('@iconify-json/bxl/icons.json'),
  'circle-flags': () => require('@iconify-json/circle-flags/icons.json'),
  'material-symbols': () => require('@iconify-json/material-symbols/icons.json'),
}