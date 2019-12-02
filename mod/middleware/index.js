'use strict'
const morgan = require('morgan')
const bodyParser = require('body-parser')
const filter = require('./filter/index.js')

module.exports = (app) => {
  app.use(morgan('common'))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: false
  }))
  // app.use(filter());
}
