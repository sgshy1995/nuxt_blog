import router from '~/server/router';

import Koa from 'koa';
import consola from 'consola';
import {Nuxt, Builder} from 'nuxt';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import dotenv from 'dotenv'
dotenv.config()

const session = require('koa-session');

const app = new Koa();

app.use(json());

app.use(bodyParser({
  enableTypes: ['json', 'form', 'text']
}));

app.keys = ["some secret", "another secret"];

// 注册路由
app.use(router.routes());

const CONFIG = {
  key: 'SESSION', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. default is false **/
};

app.use(session(CONFIG, app));



// Import and Set Nuxt.js options
let config = require('../nuxt.config');
config.dev = !(app.env === 'production');

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config);

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server;

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    await nuxt.ready();
  }

  // 监听所有路由
  app.use(ctx => {
    ctx.status = 200;
    ctx.respond = false; // Bypass Koa's built-in response handling
    //ctx.req.ctx = ctx; // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res);
  });

  app.listen(port, host);
  consola.ready({
    message: `☆☆☆☆☆ Server listening on http://${host}:${port} ☆☆☆☆☆${process.env.NEXT_PUBLIC_FRONT_KEY}`,
    badge: true
  });
}

start().then();
