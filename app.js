'use strcit'

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(morgan());
app.use(bodyParser());

app.listen(7777, ()=>{
  console.log(`The server was start at :${new Date().toString()}`);
  
})