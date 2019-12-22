'use strcit'

const express = require('express')
const middleware = require('./mod/middleware/index.js')
const router = require('./router/index.js')
const app = express()
middleware(app)
router(app)

app.use((req, res, next) => {
  return res.sendStatus(404)
})

app.use((err, req, res, next) => {
  return res.sendStatus(err)
})
app.listen(3000, () => {
  console.log(`The server start up at :${new Date().toISOString()}`)
})
