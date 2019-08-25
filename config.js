const { strictEqual } = require('assert')

module.exports.config = (email, domain, mailgunKey, to, serviceKey) => {
  strictEqual(typeof email, 'string')
  strictEqual(typeof mailgunKey, 'string')
  strictEqual(typeof to, 'string')
  strictEqual(typeof domain, 'string')
  strictEqual(typeof serviceKey, 'string')

  return {
    tlsEmail: email,
    domainName: domain,
    apiKey: mailgunKey,
    emailTo: to,
    clientKey: serviceKey,
    emailProvider: 'mailgun'
  }
}
