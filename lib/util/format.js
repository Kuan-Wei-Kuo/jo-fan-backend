const errorCode = require('../../config/errorCode.js')

class UtilFormat {
  static resultFormat(error = 0, data = null) {
    return {
      error,
      data
    }
  }
}

module.exports = {
  UtilFormat,
  errorCode
}