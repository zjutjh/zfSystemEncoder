const path = require('path')
const glob = require('glob')
const Router = require('koa-router')

const router = new Router()
const controllersDir = path.join(__dirname, './controllers')

glob.sync('**/*.js', {
  cwd: controllersDir
}).forEach((ctrPath) => {
  ctrPath = ctrPath.replace(/([\/\\]?index)?\.js$/, '')

  const controller = require(path.join(controllersDir, ctrPath))

  router.all('/' + ctrPath, controller)
})

module.exports = router
