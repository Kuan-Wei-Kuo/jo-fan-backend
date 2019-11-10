const accountModel = require('../model/account.js')
const { UtilFormat, errorCode } = require('../lib/util/format.js')
class Account {
  static async passwordLogin (account, password) {
    let result = UtilFormat.resultFormat()
    let getUser = await accountModel.getUserByAccount(account, password)
    if (password !== getUser.password) {
      result.error = errorCode.Unauthorized
    } else {
      result.data = {
        access_token: '',
        token_type: "bearer",
        expires_in: 1551346350,
        scope: "admin"
      }
    }
    return result
  }
  static async register (account, password) {
    // TODO 檢查帳號密碼格式
    let result = await accountModel.insertUser(account, password)
    return result
  }
  static changeNickName (uuid, nickName) {

  }
}
module.exports = Account
