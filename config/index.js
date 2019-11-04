'use strict';
const path = require('path');
const fs = require('fs');

class Config {
  set (prop, value) {
    this[prop] = value;
  }

  get (prop) {
    return this[prop] || null;
  }
}
const config = new Config();
function scanConfig (scanRoute = __dirname, objPath = '') {
  fs.readdirSync(scanRoute, { withFileTypes: true }).forEach((firent) => {
    if (firent.isFile() && /.json/.test(firent.name)) {
      const moduleName = firent.name.split('.')[0];
      config.set(objPath.concat('.', moduleName), require(path.join(scanRoute, firent.name)));
    } else if (firent.isDirectory()) {
      scanConfig(path.join(__dirname, firent.name), objPath === '' ? firent.name : objPath.concat('.', firent.name));
    }
  });
}
scanConfig();
module.exports = config;
