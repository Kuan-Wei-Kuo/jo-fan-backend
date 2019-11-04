'use strict';

const mariaDB = require('mariadb');
const config = require('../../config/index.js');
const SETTING_INFO = config.get('secret.servers').mariadb;
const pool = mariaDB.createPool({
  host: SETTING_INFO.host,
  port: SETTING_INFO.port,
  user: SETTING_INFO.user,
  password: SETTING_INFO.password
});

module.exports = async (sql) => {
  let connection = null;
  try {
    connection = await pool.getConnection();
    const result = await pool.query(sql);
    return result;
  } catch (err) {
    throw new Error(err);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
