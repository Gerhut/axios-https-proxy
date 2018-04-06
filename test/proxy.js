var http = require('http')
var setup = require('proxy')

var utils = require('./utils')

var server = setup(http.createServer())

module.exports = server

before(function () {
  return utils.listen(server)
})

after(function () {
  return utils.close(server)
})
