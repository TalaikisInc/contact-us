require('core-js/stable')
require('@babel/register')({
  presets: [
    '@babel/preset-env'
  ]
})

const app = require('./api')

module.exports.start = (port) => {
  app.listen(port, '0.0.0.0', (err) => {
    if (err) {
      console.log(err)
    }
    console.info(`==> listening on http://localhost:${PORT}.`)
  })
}

module.exports.config = require('./config.js')
