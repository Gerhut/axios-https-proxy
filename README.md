# axios-https-proxy

[![Build Status](https://travis-ci.org/Gerhut/axios-https-proxy.svg?branch=master)](https://travis-ci.org/Gerhut/axios-https-proxy)
[![Coverage Status](https://coveralls.io/repos/github/Gerhut/axios-https-proxy/badge.svg?branch=master)](https://coveralls.io/github/Gerhut/axios-https-proxy?branch=master)
[![dependencies Status](https://david-dm.org/Gerhut/axios-https-proxy/status.svg)](https://david-dm.org/Gerhut/axios-https-proxy)
[![devDependencies Status](https://david-dm.org/Gerhut/axios-https-proxy/dev-status.svg)](https://david-dm.org/Gerhut/axios-https-proxy?type=dev)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![Greenkeeper badge](https://badges.greenkeeper.io/Gerhut/axios-https-proxy.svg)](https://greenkeeper.io/)

HTTPS proxy support interceptor of axios.

## Install

    $ npm install --save axios-https-proxy
    
## Usage

```JavaScript
const axios = require('axios')
const axiosHttpsProxy = require('axios-https-proxy')
axios.interceptors.request.use(axiosHttpsProxy)
```

## Caveats

- Isomorphic use is supported since `browser` field is set in `package.json`.
- Only HTTPS request through HTTP proxy (by CONNECT) is supported. HTTPS proxy
is still not, because HTTP request cannot use `follow-redirect#https` with
`maxRedirect` option in axios http adapter :(
  
## License

MIT
