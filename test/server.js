process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

var fs = require('fs')
var https = require('https')
var path = require('path')

var utils = require('./utils')

function requestListener (req, res) {
  res.writeHead(200)
  res.end('OK')
}

var server = https.createServer({
  key: fs.readFileSync(path.resolve(__dirname, 'key.pem')),
  cert: fs.readFileSync(path.resolve(__dirname, 'cert.pem'))
}, requestListener)

module.exports = server

before(function () {
  return utils.listen(server)
})

after(function () {
  return utils.close(server)
})
