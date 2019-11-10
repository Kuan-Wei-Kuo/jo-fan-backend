const MariaDBQuery = require('../lib/mariadb/index.js')
const uuidV1 = require('uuid/v1')
const squel = require('squel')
const log4js = require('../lib/logger/index.js')
const logger = log4js.getLogger('AccountModel')
const { UtilFormat, errorCode } = require('../lib/util/format.js')


class AccountModel {
  static async insertUser(account, password) {
    let result = UtilFormat.resultFormat()
    let uuid = uuidV1()
    let sql = squel.insert()
      .into('jofan.users')
      .set('uuid', uuid)
      .set('account', account)
      .set('password', password)
    try{
      result.data = await MariaDBQuery(sql.toString())
    } catch(e) {
      logger.warn(e)
      result.error = errorCode.INTERNAL_ERROR
    }
    return result
  }
  static async getUserByAccount(account) {
    let result = UtilFormat.resultFormat()
    let sql = squel.select()
      .field('uuid')
      .field('password')
      .from('jofan.users')
      .where('account = ?', account)
    try{
      let queryRes = await MariaDBQuery(sql.toString())
      if (queryRes.length) {
        result.data = queryRes[0]
      }
    } catch(e) {
      logger.warn(e)
      result.error = errorCode.INTERNAL_ERROR
    }
    return result
  }
}

/* (async () => {
  let res = await AccountModel.getUserByAccount('test')
  console.log(res.data);
  
})() */

module.exports = AccountModel