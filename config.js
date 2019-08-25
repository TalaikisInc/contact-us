module.exports = (email, domain, mailgunKey, to, serviceKey) => {
  return {
    tlsEmail: email,
    domainName: domain,
    apiKey: mailgunKey,
    emailTo: to,
    clientKey: serviceKey,
    emailProvider: 'mailgun'
  }
}
