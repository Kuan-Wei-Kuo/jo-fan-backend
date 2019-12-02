'use strcit'

const express = require('express')
const Router = express.Router()
const accountService = require('../../service/account.js')
Router.post('/register', async (req, res) => {
  const { username, password } = req.body
  const result = await accountService.register(username, password)
  res.set({
    'Cache-Control': 'no-store',
    Pragma: 'no-cache'
  })
  return res.status(result.error ? result.error : 200).send(result.data)
})

module.exports = Router
