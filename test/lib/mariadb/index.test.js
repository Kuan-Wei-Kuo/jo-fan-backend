
const db = require('../../../lib/mariadb/index.js');

(async () => {
  console.log(await db('SELECT * From jofan.test'));
})();
