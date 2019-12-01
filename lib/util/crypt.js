
const config = require('../../config/index.js');
const CRYPTO_KEYS = config.get('secret.keys');
const { UtilFormat, errorCode } = require('../lib/util/format.js')
const log4js = require('../../lib/logger/index.js')
const logger = log4js.getLogger('UtilCrypt')

const fs = require('fs');
const crypto = require('crypto');
class Crypt {
  /**
   * 將Buffer轉為base64
   * @param  {Buffer} buf Buffer
   * @return {String}      [description]
   */
  static base64Encode (buf) {
    let bitmap = fs.readFileSync(buf);
    return Buffer.from(bitmap).toString('base64');
  };

  /**
   * 將base64轉回Buffer
   * @param  {String} base64String [description]
   * @return {Buffer}      [description]
   */
  static base64Deconde (base64String) {
    return Buffer.from(base64String, 'base64');
  };

  /**
   * aes256 加密
   * @param  {String} content        要加密的內容
   * @param  {String} key            加密金鑰
   * @param  {String} [iv=SECRET.iv] 加密向量
   * @param  {Object} [encode={from: 'utf8', to:'hex'}] 輸出入編碼格式
   * @return {String}                加密結果
   */
  static _aesEncrypt (content, key, iv = CRYPTO_KEYS.iv, encode = {
    from: 'utf8',
    to: 'hex'
  }) {
    let cipher = crypto.createCipheriv('aes256', key, iv);
    let result = cipher.update(content, encode.from, encode.to);
    result += cipher.final(encode.to);
    return result;
  };

  /**
   * aes256 解密
   * @param  {String} cryptData      要解密的內容
   * @param  {String} key            解密金鑰
   * @param  {String} [iv=SECRET.iv] 解密向量
   * @param  {Object} [encode={from: 'hex', to:'utf8'}] 輸出入編碼格式
   * @return {String}                解密結果
   */
  static _aesDecrypt (cryptData, key, iv = CRYPTO_KEYS.iv, encode = {
    from: 'hex',
    to: 'utf8'
  }) {
    let decipher = crypto.createDecipheriv('aes256', key, iv);
    let result = decipher.update(cryptData, encode.from, encode.to);
    result += decipher.final(encode.to);
    return result;
  };

  /**
   * 通用加密
   * @param {String} content  要加密的內容
   * @param {String} type     內容類型(對應不同金鑰)
   */
  static encrypt (content, type){
    if (CRYPTO_KEYS.hasOwnProperty(type)){
      const key = CRYPTO_KEYS[type]
      const result = this._aesEncrypt(content, key)
      return UtilFormat.resultFormat(errorCode.OK, result)
    } else {
      logger.error(`[encrypt] no such crypt key as ${type} found in config!`)
      return UtilFormat.resultFormat(errorCode.INTERNAL_ERROR)
    }
  };

  /**
   * 通用解密
   * @param {String} content  要解密的內容
   * @param {String} type     內容類型(對應不同金鑰)
   */
  static decrypt (content, type){
    if (CRYPTO_KEYS.hasOwnProperty(type)){
      const key = CRYPTO_KEYS[type]
      const result = this._aesDecrypt(content, key)
      return UtilFormat.resultFormat(errorCode.OK, result)
    } else {
      logger.error(`[decrypt] no such crypt key as ${type} found in config!`)
      return UtilFormat.resultFormat(errorCode.INTERNAL_ERROR)
    }
  };
}

module.exports = Crypt