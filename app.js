'use strcit';

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use('/account', require('./route/account.js'));
app.use((req, res, next) => {
  return res.sendStatus(404);
});
app.listen(3000, () => {
  console.log(`The server starts at :${new Date().toString()}`);
});
