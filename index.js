require('core-js/stable')
require('@babel/register')({
  presets: [
    '@babel/preset-env'
  ]
})

module.exports.start = (port) => {
  app.listen(port, '0.0.0.0', (err) => {
    if (err) {
      console.log(err)
    }
    console.info(`==> listening on http://localhost:${PORT}.`)
  })
}

module.exports = require('./api.js')
module.exports.config = require('./config.js')
