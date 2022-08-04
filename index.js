const Koa = require('koa')
const Router = require('@koa/router')
const serve = require('koa-static')
const engine = require('./src/engine')
const config = require('./src/helpers/config')

const DEFAULT_PORT = 3000

const port = process.env.PORT || DEFAULT_PORT

const server = new Koa()
const router = new Router()

router.get('/:name/run', async (ctx) => {
  const conf = await config.load(ctx.params.name)
  console.log(conf)
  return conf
})

server.use(serve('public'))
server.use(router.routes())
server.use(router.allowedMethods())

server.listen(port, () => {
  engine.start('nap') // TODO: retrieve from config
  console.log('Game started on port', port)
})
