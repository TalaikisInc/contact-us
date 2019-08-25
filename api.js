import { join } from 'path'
import express from 'express'
import legit from 'legit'

import { sendEmail } from './email'
import { t, setLocale } from './translations'
const app = express()

const appStart = (conf) => {
  if (typeof conf !== 'object') {
    throw 'Configuration is not an object'
  }

  app.use(require('compression')())
  app.use(require('body-parser').json())
  app.use(require('cors')())

  app.get('/favicon.ico', (req, res) => {
    res.sendFile(join(__dirname, 'static', 'favicon.ico'))
  })

  app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'static', 'index.html'))
  })

  app.post('/contactus', (req, res) => {
    const email = typeof req.body.email === 'string' ? req.body.email : false
    const msg = typeof req.body.msg === 'string' ? req.body.msg : false
    const name = typeof req.body.name === 'string' ? req.body.name : false
    const locale = typeof req.body.locale === 'string' ? req.body.locale : 'en'
    const validKey = req.body.key ? req.body.key === conf.clientKey : false
    if (validKey) {
      if (locale !== 'en') {
        setLocale(locale)
      }

      if (email && msg && name) {
        legit(email).then((response) => {
          if (response.isValid) {
            const subject = `Message from: ${name}`
            sendEmail(email, subject, msg, conf, (err) => {
              res.setHeader('Content-Type', 'application/json')
              if (!err.error) {
                res.end(JSON.stringify({ status: 'sent' })) // don't translate this
              } else {
                res.end(JSON.stringify({ status: t('send_error', { error: err.error }) }))
              }
            })
          } else {
            res.end(JSON.stringify({ status: t('email_error') }))
          }
        }).catch((err) => {
          res.end(JSON.stringify({ status: t('email_check_error', { error: err.message }) }))
        })
      } else {
        res.end(JSON.stringify({ status: t('error_required') }))
      }
    } else {
      res.end(JSON.stringify({ status: t('unauthorized') }))
    }
  })

  app.get('/ping', (req, res) => {
    res.send('OK')
  })

  return app
}
/*
process.on('uncaughtException', (err) => {
  console.log(`Caught exception: ${err.message}`)
})
*/
export default appStart
