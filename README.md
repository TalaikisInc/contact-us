<p align="center">
  <a href="https://talaikis.com/">
    <img alt="Talaikis Ltd." src="https://github.com/TalaikisInc/talaikis.com_react/blob/master/media/logo.png" width="220">
  </a>
</p>

# Contact Us API Microservice

## Features

* Contact us microservice (on Mailgun)
* Checks if email (really) exists
* Internationalized

## Install

```bash
npm i -S @talaikis/contact-us
```

## Usage

```js
import { start, config } from '@talaikis/contact-us'
// config(email, mailgunDomain, mailgunKey, recipient, serviceKey)
// for example:
const conf = config('test@test.com', 'talaikis.com', 'key-XXXXX', 'test2@test.com', 'blahblah')
start(3000, conf) // <- port
```

That's it, you can go to `http://localhost:3000/ping`

## Sample request

```js
import { post } from 'axios'

const contactApi = (name, email, message, done) => {
  const locale = 'en'
  const CONTACT_API_KEY = ''
  const CONTACT_API_URL = ''

  post(CONTACT_API_URL, {
    method: 'POST',
    msg: message,
    key: CONTACT_API_KEY,
    locale,
    name,
    email,
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((data) => {
      done(null, data.data)
    })
    .catch((err) => {
      done({ error: err.message })
    })
}
```

## API Responses

```json
{ "status": "sent" } // if email is sent successfully
{ "status": "<some error>" } // if some error occurs
```

## TODO

* translate strings to x languages
* more providers

## Licence

MIT
