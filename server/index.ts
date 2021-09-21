import router from '~/server/router';

import path from 'path'

import Koa from 'koa';
import consola from 'consola';
import {Nuxt, Builder} from 'nuxt';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import dotenv from 'dotenv'
dotenv.config()

import session from 'koa-session';
//import cors from '@koa/cors'

import https from 'https'

const app = new Koa();

app.use(json());

app.use(bodyParser({
  enableTypes: ['json', 'form', 'text']
}));

/*import koaBody from 'koa-body'

app.use(koaBody({
  // 支持文件格式
  multipart: true,
  formidable: {
    // 上传目录
    uploadDir: path.join(__dirname, 'uploads'),
    // 保留文件扩展名
    keepExtensions: true,
  }
}));*/

// cors
//app.use(cors({credentials: true, allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS', origin: ctx=> ctx.header.origin}))

// 使用 session

app.keys = ["some secret", "another secret"];

const CONFIG = {
  key: 'BLOG_GLOBAL_SESSION', /**  cookie的key。 (默认是 koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 'session', /**  session 过期时间，以毫秒ms为单位计算 。*/
  autoCommit: true, /** 自动提交到响应头。(默认是 true) */
  overwrite: true, /** 是否允许重写 。(默认是 true) */
  httpOnly: true, /** 是否设置HttpOnly，如果在Cookie中设置了"HttpOnly"属性，那么通过程序(JS脚本、Applet等)将无法读取到Cookie信息，这样能有效的防止XSS攻击。  (默认 true) */
  signed: true, /** 是否签名。(默认是 true) */
  rolling: true, /** 是否每次响应时刷新Session的有效期。(默认是 false) */
  renew: false, /** 是否在Session快过期时刷新Session的有效期。(默认是 false) */
  secure: true,
};

app.use(session({...CONFIG,sameSite: "none",maxAge: 'session'}, app));

// 注册路由
app.use(router.routes());

// Import and Set Nuxt.js options
let config = require('../nuxt.config');
config.dev = !(app.env === 'production');

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config);

  // 实际上这些配置已经被 nuxt.config.ts 中的 host 覆盖
  /*const {
    host = process.env.HOST || '0.0.0.0',
    port = process.env.PORT || 8000
  } = nuxt.options.server;*/

  const {
    host = process.env.NODE_ENV === "production" ? '0.0.0.0' : 'localhost',
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

  app.use(async (ctx,next) => {

    // 获取 Origin 请求头
    const requestOrigin = ctx.get('Origin');
    const method = ctx.request.method
    console.log('method',method)

    // 不管有没有跨域都要设置 Vary: Origin
    ctx.set('Vary', 'Origin')

    if (method==='OPTIONS'){
      ctx.response.status = 200
      ctx.res.statusCode = 200
      ctx.body = 200
      await next()
    }else{
      if (requestOrigin) {
        // 设置响应头
        ctx.set('Access-Control-Allow-Origin',requestOrigin)
        ctx.set('Access-Control-Allow-Credentials','true')
        ctx.set('Access-Control-Allow-Methods','OPTIONS, GET, PUT, POST, DELETE')
        ctx.set('Access-Control-Allow-Headers','Content-Type, Access-Control-Allow-Headers, Access-Control-Request-Headers, Access-Control-Request-Method, Authorization, X-Requested-With, User-Agent, Referer, Origin')
        ctx.set('Access-Control-Max-Age','1728000')
        //ctx.set('Access-Control-Expose-Headers','Content-Type,Content-Length,Accept,Accept-Encoding,Accept-Language,Referer,Connection,X-Access-Token,Authorization,Origin,Cache-Control,X-Requested-With,X-Check-Result,Content-Disposition,Host')
      }
      ctx.status = 200;
      ctx.respond = false; // Bypass Koa's built-in response handling
      nuxt.render(ctx.req, ctx.res);
    }

    // 登录注册清空session
    if (ctx.path.indexOf('/login')>-1 || ctx.path.indexOf('/register')>-1){
      ctx.session = null
    }

  });

  /*app.listen(port, host);
  consola.ready({
    message: `☆☆☆☆☆ Server listening on http://${host}:${port} ☆☆☆☆☆${process.env.NEXT_PUBLIC_FRONT_KEY}`,
    badge: true
  });*/
  https.createServer(nuxt.options.server.https, app.callback()).listen(port, host);
  consola.ready({
    message: `☆☆☆☆☆ Server listening on https://${host}:${port} ☆☆☆☆☆${process.env.NEXT_PUBLIC_FRONT_KEY}`,
    badge: true
  })
}

start().then();
