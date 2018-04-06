exports.listen = function listen (server) {
  return new Promise(function (resolve, reject) {
    server.listen(function (error) {
      if (error != null) {
        reject(error)
        return
      }
      resolve()
    })
  })
}

exports.close = function close (server) {
  return new Promise(function (resolve, reject) {
    server.close(function (error) {
      if (error != null) {
        reject(error)
        return
      }
      resolve()
    })
  })
}
