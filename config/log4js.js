let config = {
  appenders: { console: { type: 'console' } },
  categories: { default: { appenders: ['console'], level: 'debug' }}
}
module.exports = config