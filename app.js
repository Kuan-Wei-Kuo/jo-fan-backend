'use strcit';

const express = require('express');
const middleware = require('./mod/middleware/index.js');
const router = require('./route/index.js');
const app = express();
middleware(app);
router(app);

app.use((req, res, next) => {
  return res.sendStatus(404);
});
app.listen(3000, () => {
  console.log(`The server starts at :${new Date().toString()}`);
});
