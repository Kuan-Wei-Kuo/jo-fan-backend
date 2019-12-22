'use strict'
const crypt = require('../../../lib/util/crypt.js')
const config = require('../../../config/index')
const errorCode = require('../../../config/errorCode')
const checker = require('../../../lib/checker/index')
class Filter {
  /**
   *  check r                                               equest
   * @param {Object} req express request
   * @param {Object} res express response
   * @param {Function} next express callback
   */
  checkRequest (req, res, next) {
    try {
      this._checkPath(req)
      this._checkAuth(req)
      this._checkBody(req)
      return next()
    } catch (error) {
      console.warn(error)
      return next(errorCode.BAD_REQUEST)
    }
  }

  /*
         ███████  ██████  ██████  ███    ███  █████  ████████ ████████  ██████
         ██      ██    ██ ██   ██ ████  ████ ██   ██    ██       ██    ██    ██
         █████   ██    ██ ██████  ██ ████ ██ ███████    ██       ██    ██    ██
         ██      ██    ██ ██   ██ ██  ██  ██ ██   ██    ██       ██    ██    ██
 ███████ ██       ██████  ██   ██ ██      ██ ██   ██    ██       ██     ██████
*/
  /*
  █████  ██████  ██ ███████ ██ ██      ████████ ███████ ██████  ██████   ██████  ██    ██ ████████ ███████
 ██   ██ ██   ██ ██ ██      ██ ██         ██    ██      ██   ██ ██   ██ ██    ██ ██    ██    ██    ██
 ███████ ██████  ██ █████   ██ ██         ██    █████   ██████  ██████  ██    ██ ██    ██    ██    █████
 ██   ██ ██      ██ ██      ██ ██         ██    ██      ██   ██ ██   ██ ██    ██ ██    ██    ██    ██
 ██   ██ ██      ██ ██      ██ ███████    ██    ███████ ██   ██ ██   ██  ██████   ██████     ██    ███████
*/
  /**
   *
   * @param {String} route
   */
  _formatToApiFilterRoute (route) {
    return `apiFilter${route.replace(/\//g, '.')}`
  }

  /*
         ███████  ██████  ██████  ███    ███  █████  ████████ ████████  ██████
         ██      ██    ██ ██   ██ ████  ████ ██   ██    ██       ██    ██    ██
         █████   ██    ██ ██████  ██ ████ ██ ███████    ██       ██    ██    ██
         ██      ██    ██ ██   ██ ██  ██  ██ ██   ██    ██       ██    ██    ██
 ███████ ██       ██████  ██   ██ ██      ██ ██   ██    ██       ██     ██████
*/
  /*
  ██████  ██████  ███    ██ ███████ ██  ██████  ██████   ██████  ██    ██ ████████ ███████
 ██      ██    ██ ████   ██ ██      ██ ██       ██   ██ ██    ██ ██    ██    ██    ██
 ██      ██    ██ ██ ██  ██ █████   ██ ██   ███ ██████  ██    ██ ██    ██    ██    █████
 ██      ██    ██ ██  ██ ██ ██      ██ ██    ██ ██   ██ ██    ██ ██    ██    ██    ██
  ██████  ██████  ██   ████ ██      ██  ██████  ██   ██  ██████   ██████     ██    ███████
*/
  /**
   *
   * @param {String} route
   */
  _formatToConfigRoute (route) {
    return route.replace(/\//g, '.')
  }

  /*
          ██████  ███████ ████████  █████  ██████  ██ ███████ ██ ██      ████████ ███████ ██████
         ██       ██         ██    ██   ██ ██   ██ ██ ██      ██ ██         ██    ██      ██   ██
         ██   ███ █████      ██    ███████ ██████  ██ █████   ██ ██         ██    █████   ██████
         ██    ██ ██         ██    ██   ██ ██      ██ ██      ██ ██         ██    ██      ██   ██
 ███████  ██████  ███████    ██    ██   ██ ██      ██ ██      ██ ███████    ██    ███████ ██   ██
*/
  /*
 ███████ ███████ ████████ ████████ ██ ███    ██  ██████
 ██      ██         ██       ██    ██ ████   ██ ██
 ███████ █████      ██       ██    ██ ██ ██  ██ ██   ███
      ██ ██         ██       ██    ██ ██  ██ ██ ██    ██
 ███████ ███████    ██       ██    ██ ██   ████  ██████
*/
  /**
   *
   * @param {String} route
   */
  _getApiFilterSetting (route) {
    return config.get(this._formatToApiFilterRoute(route))
  }

  /*
          ██████ ██   ██ ███████  ██████ ██   ██ ██████   █████  ████████ ██   ██
         ██      ██   ██ ██      ██      ██  ██  ██   ██ ██   ██    ██    ██   ██
         ██      ███████ █████   ██      █████   ██████  ███████    ██    ███████
         ██      ██   ██ ██      ██      ██  ██  ██      ██   ██    ██    ██   ██
 ███████  ██████ ██   ██ ███████  ██████ ██   ██ ██      ██   ██    ██    ██   ██
*/
  /**
   *
   * @param {Object} req express request
   */
  _checkPath (req) {
    const route = req.originalUrl
    const apiFilterSetting = this._getApiFilterSetting(route)
    if (checker.typeCheck.isNil(apiFilterSetting)) {
      // throw new Error('Can not find API Filter Config by this request path : ${route.path}.')

    }
  }

  /*
          ██████ ██   ██ ███████  ██████ ██   ██  █████  ██    ██ ████████ ██   ██
         ██      ██   ██ ██      ██      ██  ██  ██   ██ ██    ██    ██    ██   ██
         ██      ███████ █████   ██      █████   ███████ ██    ██    ██    ███████
         ██      ██   ██ ██      ██      ██  ██  ██   ██ ██    ██    ██    ██   ██
 ███████  ██████ ██   ██ ███████  ██████ ██   ██ ██   ██  ██████     ██    ██   ██
*/
  /**
   *
   * @param {Object} req express request
   */
  _checkAuth (req) {
    const authToken = req.get('Authorized')
    const route = req.originalUrl
    const apiFilterSetting = this._getApiFilterSetting(route)
    if (apiFilterSetting.isAuth) {
      const result = crypt.decrypt(authToken, 'jwt')
      if (result.error) {
        throw new Error(result.error)
      }
    }
  }

  /*
          ██████ ██   ██ ███████  ██████ ██   ██ ██████   ██████  ██████  ██    ██
         ██      ██   ██ ██      ██      ██  ██  ██   ██ ██    ██ ██   ██  ██  ██
         ██      ███████ █████   ██      █████   ██████  ██    ██ ██   ██   ████
         ██      ██   ██ ██      ██      ██  ██  ██   ██ ██    ██ ██   ██    ██
 ███████  ██████ ██   ██ ███████  ██████ ██   ██ ██████   ██████  ██████     ██
*/
  /**
   *
   * @param {Object} req express request
   */
  _checkBody (req) {
    const route = req.originalUrl
    const reqBody = req.body
    const apiFilterSetting = this._getApiFilterSetting(route)
    for (const filterSetting of apiFilterSetting.inputParam) {
      if (!Object.prototype.hasOwnProperty.call(reqBody, filterSetting.path)) {
        throw new Error(`[${route}]Can not find ${filterSetting.path} in request body. request body : ${JSON.stringify(reqBody, null, 1)}`)
      }
      const value = this._getValueByPath(reqBody, filterSetting.path)
      if (!checker.typeCheck.exec(filterSetting.dataType, value)) {
        throw new TypeError(`[${route}]check value type Error: path :${route} value : ${value}`)
      }
    }
  }

  /*
          ██████  ███████ ████████ ██    ██  █████  ██      ██    ██ ███████
         ██       ██         ██    ██    ██ ██   ██ ██      ██    ██ ██
         ██   ███ █████      ██    ██    ██ ███████ ██      ██    ██ █████
         ██    ██ ██         ██     ██  ██  ██   ██ ██      ██    ██ ██
 ███████  ██████  ███████    ██      ████   ██   ██ ███████  ██████  ███████
*/
  /*
 ██████  ██    ██ ██████   █████  ████████ ██   ██
 ██   ██  ██  ██  ██   ██ ██   ██    ██    ██   ██
 ██████    ████   ██████  ███████    ██    ███████
 ██   ██    ██    ██      ██   ██    ██    ██   ██
 ██████     ██    ██      ██   ██    ██    ██   ██
*/
  /**
   * get object value by path
   * @param {Object} obj
   * @param {String} path
   * @returns {any} target value
   */
  _getValueByPath (obj, path) {
    const pathList = path.split('.')
    let tempObj = obj
    for (const thisPath of pathList) {
      if (Object.prototype.hasOwnProperty.call(tempObj, thisPath)) {
        tempObj = tempObj[thisPath]
      } else {
        throw new Error(`Can not find value by path :${path} obj:${JSON.stringify(obj, null, 1)}`)
      }
    }
    return tempObj
  }
}
module.exports = new Filter()
