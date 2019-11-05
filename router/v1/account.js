'use strcit'

const express = require('express')
const Router = express.Router()
const AccountService = require('../../service/account.js')
Router.post('/login', (req, res) => {
  console.log(req.body)
  return res.sendStatus(200)
})
Router.post('/register', (req, res) => {
  return res.sendStatus(200)
})

module.exports = Router
