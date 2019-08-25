require('core-js/stable')
require('@babel/register')({
  presets: [
    '@babel/preset-env'
  ]
})

const appStart = require('./api').default

module.exports.start = (port, conf) => {
  appStart(conf).listen(port, '0.0.0.0', (err) => {
    if (err) {
      console.log(err)
    }
    console.info(`==> listening on http://localhost:${port}.`)
  })
}

module.exports.config = require('./config.js')
