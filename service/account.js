const accountModel = require('../model/account.js')
const { UtilFormat, errorCode } = require('../lib/util/format.js')
const cryptHelper = require('../lib/util/crypt.js')
const log4js = require('../lib/logger/index.js')
const logger = log4js.getLogger('ServiceAccount')
const config = require('../config/index.js');
const CRYPTO_KEYS = config.get('secret.keys');

let jwt = require('jsonwebtoken');

const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

class Account {
  static async passwordLogin (account, password) {
    // 取得使用者資訊
    let getUser = await accountModel.getUserByAccount(account)
    if (getUser.error) {
      return getUser
    }
    // 密碼加密
    let cryptPassword = cryptHelper.encrypt(password, 'password').data
    if (cryptPassword.error) {
      return cryptPassword
    }
    // 比對密碼
    if (cryptPassword !== getUser.data.password) {
      logger.warn(`User ${account} use the wrong password.`)
      return UtilFormat.resultFormat(errorCode.Unauthorized)
    }
    // jwt 內容
    let payload = {
      uuid:getUser.data.uuid,
      expires_in: Math.floor(Date.now() / 1000) + (60 * 15)
    }
    // 簽發token
    let token = jwt.sign(payload, CRYPTO_KEYS.jwt)
    let result = {
      access_token: token,
      token_type: "bearer",
      expires_in: payload.expires_in,
      scope: 0
    }
    return UtilFormat.resultFormat(errorCode.OK, result)
  }
  static async register (account, password) {
    // 檢查帳號格式為e-mail
    if (!emailRegex.test(account)) {
      return UtilFormat.resultFormat(errorCode.BAD_REQUEST)
    }
    // 檢查重複註冊
    let getUser = await accountModel.getUserByAccount(account)
    if (getUser.error) {
      return getUser
    }
    if (getUser.data) {
      return UtilFormat.resultFormat(errorCode.BAD_REQUEST)
    }
    // TODO 檢查帳號密碼格式
    let cryptPassword = cryptHelper.encrypt(password, 'password').data
    let result = await accountModel.insertUser(account, cryptPassword)
    
    if (result) {

    }
    return UtilFormat.resultFormat(errorCode.OK)
  }
  static changeNickName (uuid, nickName) {

  }
}
module.exports = Account
