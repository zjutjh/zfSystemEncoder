const {
  hex2b64,
  b64tohex
} = require('../rsa/base64')

const RSAKey = require('../rsa/rsa')

module.exports = async (ctx) => {
  const rsaKey = new RSAKey()
  //获得url
  let url = ctx.url
  let request = ctx.request
  let req_query = request.query
  let enPassword = null
  let password = req_query.password
  let exponent = req_query.exponent
  let modules = req_query.modules
  if (password && exponent && modules) {
    rsaKey.setPublic(b64tohex(modules),b64tohex(exponent))
    enPassword = hex2b64(rsaKey.encrypt(password))
  } else {
    enPassword = 'no enough params'
  }
  ctx.body = {
    url,
    req_query,
    enPassword
  }
}
