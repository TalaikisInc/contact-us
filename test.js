const { start, config } = require('./index.js')
// config(email, mailgunDomain, mailgunKey, recipient, serviceKey)
// for example:
const conf = config('test@test.com', 'talaikis.com', 'key-XXXXX', 'test2@test.com', 'blahblah')
start(3000, conf) // <- port
