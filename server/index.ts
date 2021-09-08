const routerIn = require('./router');

const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const json = require('koa-json');
const bodyParser = require('koa-bodyparser');

const app = new Koa()

app.use(json());

app.use(bodyParser({
  enableTypes:['json', 'form', 'text']
}))

app.keys = ["some secret", "another secret"];

// 注册路由
app.use(routerIn.routes());

// Import and Set Nuxt.js options
let config = require('../nuxt.config')
config.dev = !(app.env === 'production')

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // 监听所有路由
  app.use(ctx => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `☆☆☆☆☆ Server listening on http://${host}:${port} ☆☆☆☆☆`,
    badge: true
  })
}

start().then();
