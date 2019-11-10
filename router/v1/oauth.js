'use strcit'

const express = require('express')
const Router = express.Router()
const accountService = require('../../service/account.js')
const log4js = require('../../lib/logger/index.js')
const logger = log4js.getLogger('OauthRoute')
Router.post('/token', async (req, res) => {
  let result = {
    error: 0,
    data: {}
  }
  const grantType = req.body.grant_type || ''
  switch (grantType) {
    case 'password':
      const { username, password } = req.body
      result = await accountService.passwordLogin(username, password)
      break
    default:
      result.error = 400
      logger.warn(`unregnized grant type:${grantType}`)
  }
  res.set({
    'Cache-Control': 'no-store',
    Pragma: 'no-cache'
  })
  return res.status(result.error ? result.error : 200).send(result.data)
})

module.exports = Router
