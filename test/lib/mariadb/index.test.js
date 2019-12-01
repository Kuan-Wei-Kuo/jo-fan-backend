
const db = require('../../../lib/mariadb/index.js');

(async () => {
  let res = await db('SELECT * From jofan.users')
  console.log(res.length);
  console.log(res);
})();
