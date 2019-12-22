'use strict'
const path = require('path')
const fs = require('fs')
const JSON_REG = /.json/
class Config {
  set (prop, value) {
    this[prop] = value
  }

  get (prop) {
    if (Object.prototype.hasOwnProperty.call(this, prop)) {
      return this[prop]
    }
    return null
  }
}
const config = new Config()
function scanConfig (scanRoute = __dirname, objPath = '') {
  fs.readdirSync(scanRoute, { withFileTypes: true }).forEach((firent) => {
    if (firent.isFile() && JSON_REG.test(firent.name)) {
      const extensionIndex = firent.name.lastIndexOf('.')
      const moduleName = firent.name.slice(0, extensionIndex)
      config.set(objPath.concat('.', moduleName), require(path.join(scanRoute, firent.name)))
    } else if (firent.isDirectory()) {
      scanConfig(path.join(scanRoute, firent.name), objPath === '' ? firent.name : objPath.concat('.', firent.name))
    }
  })
}
scanConfig()
module.exports = config
