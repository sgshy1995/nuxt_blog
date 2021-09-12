import router from '~/server/router';

import Koa from 'koa';
import consola from 'consola';
import {Nuxt, Builder} from 'nuxt';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import dotenv from 'dotenv'
dotenv.config()

import session from 'koa-session';

const app = new Koa();

app.use(json());

app.use(bodyParser({
  enableTypes: ['json', 'form', 'text']
}));

// 使用 session

app.keys = ["some secret", "another secret"];

const CONFIG = {
  key: 'BLOG_GLOBAL_SESSION', /**  cookie的key。 (默认是 koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000, /**  session 过期时间，以毫秒ms为单位计算 。*/
  autoCommit: true, /** 自动提交到响应头。(默认是 true) */
  overwrite: true, /** 是否允许重写 。(默认是 true) */
  httpOnly: true, /** 是否设置HttpOnly，如果在Cookie中设置了"HttpOnly"属性，那么通过程序(JS脚本、Applet等)将无法读取到Cookie信息，这样能有效的防止XSS攻击。  (默认 true) */
  signed: true, /** 是否签名。(默认是 true) */
  rolling: true, /** 是否每次响应时刷新Session的有效期。(默认是 false) */
  renew: false, /** 是否在Session快过期时刷新Session的有效期。(默认是 false) */
};

app.use(session(CONFIG, app));

// 注册路由
app.use(router.routes());

// Import and Set Nuxt.js options
let config = require('../nuxt.config');
config.dev = !(app.env === 'production');

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config);

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 8000
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
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
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
