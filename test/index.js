process.env.NODE_ENV = 'test'
require('chai').use(require('chai-as-promised')).should()
const sinon = require('sinon')
const request = require('request')
const faker = require('faker')

const data = require('./fixtures/data.json')
const url = 'http://localhost:3001'

describe('contact us', () => {
  beforeEach(() => {
    this.post = sinon.stub(request, 'post')
  })

  afterEach(() => {
    request.post.restore()
  })

  it('should send emails', (done) => {
    const options = {
      body: {
        msg: 'message',
        key: 'key',
        locale: 'en',
        name: 'test',
        email: 'test@test.com'
      },
      json: true,
      url: `${url}/contactus`
    }

    const obj = data.contactus.success
    this.post.yields(null, obj.res, JSON.stringify(obj.body))
    request.post(options, (err, res, body) => {
      res.statusCode.should.equal(200)
      res.headers['content-type'].should.contain('application/json')
      body = JSON.parse(body)
      body.status.should.eql('sent')
      done()
    })
  })

  it('should decline if no api key provided', (done) => {
    const options = {
      body: {
        msg: 'message',
        key: '',
        locale: 'en',
        name: 'test',
        email: 'test@test.com'
      },
      json: true,
      url: `${url}/contactus`
    }

    const obj = data.contactus.failure
    this.post.yields(null, obj.res, JSON.stringify(obj.body))
    request.post(options, (err, res, body) => {
      res.statusCode.should.equal(403)
      res.headers['content-type'].should.contain('application/json')
      body = JSON.parse(body)
      body.status.should.eql('error')
      done()
    })
  })
})
