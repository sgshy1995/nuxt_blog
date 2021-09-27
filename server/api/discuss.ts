import Router from 'koa-router';
import {getDBConnection} from '@/lib/getDBConnection';
import {Post} from '@/src/entity/Post';
import {Discussion} from '@/src/entity/Discussion';
import {User} from '~/src/entity/User';

const discuss = (router: Router) => {
  router.post("/discuss", async (ctx) => {
    const fields = ctx.request.body;
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

    const discussion = new Discussion();
    const connection = await getDBConnection();
    const post = await connection.manager.findOne(Post,{
      id: parseInt(fields.id)
    })
    discussion.user = ctx.session.user
    discussion.post = post
    discussion.content = fields.content
    await connection.manager.save(discussion)
    ctx.status = 200;
    ctx.body = {
      code: 200,
      status: true,
      message: '提交评论成功'
    };

    ctx.header['content-type'] = 'application/json'

  });

  router.get("/discuss/:id", async (ctx) => {
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
    const post = await connection.manager.findOne(Post,{
      id: parseInt(ctx.params.id)
    })
    const discussionList = await connection.manager.find(Discussion,{
      relations: ['user'],
      where: {
        post
      }
    })
    ctx.status = 200;
    ctx.body = {
      code: 200,
      status: true,
      data: {
        discussionList
      }
    };

    ctx.header['content-type'] = 'application/json'

  });
};

export default discuss;
