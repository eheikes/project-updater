const parsePackageJsonName = require('parse-packagejson-name')

/**
 * Adds additional details to npm package info.
 */
exports.enhanceNpmPackage = pkgInfo => {
  const nameDetails = parsePackageJsonName(pkgInfo.name)
  return Object.assign({}, pkgInfo, nameDetails)
}
