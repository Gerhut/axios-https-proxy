var axios = require('axios')
var basicAuth = require('basic-auth')
var proxy = require('./proxy')
var server = require('./server')

before(function () {
  axios.interceptors.request.use(require('..'))
})

it('Make a HTTPS request', function () {
  return axios.get('https://127.0.0.1:' + server.address().port + '/', {
    proxy: {
      host: '127.0.0.1',
      port: proxy.address().port
    }
  })
})

describe('Authenticated proxy', function () {
  before(function () {
    proxy.authenticate = function (req, callback) {
      callback(null, basicAuth.parse(req.headers['proxy-authorization']))
    }
  })
  it('Make a HTTPS request w/ authorization', function () {
    return axios.get('https://127.0.0.1:' + server.address().port + '/', {
      proxy: {
        host: '127.0.0.1',
        port: proxy.address().port,
        auth: {
          username: 'foo',
          password: 'bar'
        }
      }
    }).catch(error => console.error(error))
  })
  it('Make a HTTPS request w/o authorization', function () {
    return axios.get('https://127.0.0.1:' + server.address().port + '/', {
      proxy: {
        host: '127.0.0.1',
        port: proxy.address().port
      }
    }).should.be.rejected()
  })
  after(function () {
    delete proxy.authenticate
  })
})

describe('Using environment proxy config', function () {
  it('w/o authorization', function () {
    process.env.HTTPS_PROXY = 'http://127.0.0.1:' + proxy.address().port

    proxy.authenticate = function (req, callback) {
      callback(null, false)
    }
    return axios.get('https://127.0.0.1:' + server.address().port + '/')
      .should.be.rejected()
  })

  it('w/ authorization', function () {
    process.env.HTTPS_PROXY = 'http://user:pass@127.0.0.1:' + proxy.address().port

    proxy.authenticate = function (req, callback) {
      callback(null, false)
    }
    return axios.get('https://127.0.0.1:' + server.address().port + '/')
      .should.be.rejected()
  })

  it('use small letter environment variable', function () {
    process.env.https_proxy = 'http://127.0.0.1:' + proxy.address().port

    proxy.authenticate = function (req, callback) {
      callback(null, false)
    }
    return axios.get('https://127.0.0.1:' + server.address().port + '/')
      .should.be.rejected()
  })

  afterEach(function () {
    delete proxy.authenticate
    delete process.env.HTTPS_PROXY
  })
})
