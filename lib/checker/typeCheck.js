
'use strict'
const cNumberCheck = {
  number: true
}
const cStringCheck = {
  string: true
}
const cBooleanCheck = {
  boolean: true
}
const cObjectCheck = {
  object: true
}

class TypeCheck {
  /**
# ██ ███████     ███    ██ ██    ██ ███    ███ ██████  ███████ ██████
# ██ ██          ████   ██ ██    ██ ████  ████ ██   ██ ██      ██   ██
# ██ ███████     ██ ██  ██ ██    ██ ██ ████ ██ ██████  █████   ██████
# ██      ██     ██  ██ ██ ██    ██ ██  ██  ██ ██   ██ ██      ██   ██
# ██ ███████     ██   ████  ██████  ██      ██ ██████  ███████ ██   ██
 */
  /**
     *檢查數字（包含NaN）
     * @param {number} num 要檢查的數字
     * @returns {boolean} true ：是  false：不是（NaN也視為不是）
     */
  static isNumber (num) {
    if (isNaN(num)) {
      console.log(`[Checker][typeCheck] The num is NaN！`)
      return false
    }
    return cNumberCheck[typeof (num)] || false
  }

  /**
# ██ ███████     ███████ ████████ ██████  ██ ███    ██  ██████
# ██ ██          ██         ██    ██   ██ ██ ████   ██ ██
# ██ ███████     ███████    ██    ██████  ██ ██ ██  ██ ██   ███
# ██      ██          ██    ██    ██   ██ ██ ██  ██ ██ ██    ██
# ██ ███████     ███████    ██    ██   ██ ██ ██   ████  ██████
 */
  /**
     * 檢查字串
     * @param {string} str 要檢查的字串
     * @returns {boolean} true ：是  false：不是
     */
  static isString (str) {
    return cStringCheck[typeof (str)] || false
  }

  /**
# ██ ███████     ██████   ██████   ██████  ██      ███████  █████  ███    ██
# ██ ██          ██   ██ ██    ██ ██    ██ ██      ██      ██   ██ ████   ██
# ██ ███████     ██████  ██    ██ ██    ██ ██      █████   ███████ ██ ██  ██
# ██      ██     ██   ██ ██    ██ ██    ██ ██      ██      ██   ██ ██  ██ ██
# ██ ███████     ██████   ██████   ██████  ███████ ███████ ██   ██ ██   ████
 */
  /**
     * 檢查布林
     * @param {boolean} bool 要檢查的布林
     * @returns {boolean} true ：是  false：不是
     */
  static isBoolean (bool) {
    return cBooleanCheck[typeof (bool)] || false
  }

  /**
# ██ ███████      ██████  ██████       ██ ███████  ██████ ████████
# ██ ██          ██    ██ ██   ██      ██ ██      ██         ██
# ██ ███████     ██    ██ ██████       ██ █████   ██         ██
# ██      ██     ██    ██ ██   ██ ██   ██ ██      ██         ██
# ██ ███████      ██████  ██████   █████  ███████  ██████    ██
 */
  /**
     * 檢查物件
     * @param {object} obj 要檢查的物件
     * @returns {boolean} true ：是  false：不是
     */
  static isObject (obj) {
    return cObjectCheck[typeof (obj)] || false
  }

  /*
 ██ ███████ ███    ██ ██ ██
 ██ ██      ████   ██ ██ ██
 ██ ███████ ██ ██  ██ ██ ██
 ██      ██ ██  ██ ██ ██ ██
 ██ ███████ ██   ████ ██ ███████
*/
  /**
   * 檢查值是否null或undefined
   * @param {any} value
   */
  static isNil (value) {
    return value == null
  }

  /*
 ███████ ██   ██ ███████  ██████
 ██       ██ ██  ██      ██
 █████     ███   █████   ██
 ██       ██ ██  ██      ██
 ███████ ██   ██ ███████  ██████
*/
  /**
   *
   * @param {String} type
   * @param {any} value
   */
  static exec (type, value) {
    if (this.isNil(type)) {
      return this.isNil(value)
    }
    const typeUpperCase = type.toUpperCase()
    let bResult = false
    switch (typeUpperCase) {
      case 'STRING':
        bResult = this.isString(value)
        break
      case 'NUMBER':
        bResult = this.isNumber(value)
        break
      case 'BOOLEAN':
        bResult = this.isBoolean(value)
        break
      case 'OBJECT':
        bResult = this.isObject(value)
        break
      case 'ARRAY':
        bResult = Array.isArray(value)
        break
      default:
        break
    }
    return bResult
  }
}

module.exports = TypeCheck
