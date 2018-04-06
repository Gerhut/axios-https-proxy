var url = require('url')

var httpsProxyAgent = require('https-proxy-agent')

function proxy (config) {
  /* istanbul ignore if */
  if (config.socketPath != null) return config

  var parsed = url.parse(config.url)
  var protocol = parsed.protocol
  /* istanbul ignore if */
  if (protocol !== 'https:') return config

  var proxy = config.proxy
  /* istanbul ignore if */
  if (proxy === false) return config

  var proxyOptions
  if (proxy != null) {
    proxyOptions = {
      hostname: proxy.host,
      port: proxy.port
    }
    if (proxy.auth != null) {
      proxyOptions.auth = proxy.auth.username + ':' + proxy.auth.password
    }
  } else {
    var proxyUrl = process.env['HTTPS_PROXY'] || process.env['https_proxy']
    /* istanbul ignore if */
    if (!proxyUrl) return config

    parsed = url.parse(proxyUrl)
    proxyOptions = {
      hostname: parsed.hostname,
      port: parsed.port
    }
    if (parsed.auth) {
      proxyOptions.auth = parsed.auth
    }
  }

  // HTTPS request must use tunnel proxy protocol
  config.httpsAgent = httpsProxyAgent(proxyOptions)

  // Disable direct proxy protocol in axios http adapter
  config.proxy = false

  return config
}

module.exports = proxy
