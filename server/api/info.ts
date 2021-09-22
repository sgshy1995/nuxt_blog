import Router from 'koa-router';
import {getDBConnection} from '~/lib/getDBConnection';
import {User} from '@/src/entity/User';
import {getModule} from 'vuex-module-decorators';

const info = (router: Router) => {
  router.get("/userinfo", ctx => {
    // 获取 Origin 请求头
    const requestOrigin = ctx.get('Origin');
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
    ctx.body = {
      code: 200,
      data: ctx.session.user,
      status: true
    };
  });

  router.post("/userinfo", async (ctx) => {
    // 获取 Origin 请求头
    const requestOrigin = ctx.get('Origin');
    if (requestOrigin) {
      // 设置响应头
      ctx.set('Access-Control-Allow-Origin',requestOrigin)
      ctx.set('Access-Control-Allow-Credentials','true')
      ctx.set('Access-Control-Allow-Methods','OPTIONS, GET, PUT, POST, DELETE')
      ctx.set('Access-Control-Allow-Headers','Content-Type, Access-Control-Allow-Headers, Access-Control-Request-Headers, Access-Control-Request-Method, Authorization, X-Requested-With, User-Agent, Referer, Origin')
      ctx.set('Access-Control-Max-Age','1728000')
      //ctx.set('Access-Control-Expose-Headers','Content-Type,Content-Length,Accept,Accept-Encoding,Accept-Language,Referer,Connection,X-Access-Token,Authorization,Origin,Cache-Control,X-Requested-With,X-Check-Result,Content-Disposition,Host')
    }

    const connection = await getDBConnection();
    const user = await connection.manager.findOne(User,{
      id: parseInt(ctx.session.user.id)
    })
    const fields = ctx.request.body;
    user.avatar = fields.avatar;
    user.nickname = fields.nickname;
    await connection.manager.save(user)
    ctx.session.user = user

    ctx.status = 200;
    ctx.body = {
      code: 200,
      message: '保存成功',
      data: user,
      status: true
    };
  });
};

export default info;
