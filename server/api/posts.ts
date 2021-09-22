import Router from 'koa-router';
import {getDBConnection} from '@/lib/getDBConnection';
import {Post} from '@/src/entity/Post';
import {User} from '@/src/entity/User';

const posts = (router: Router) => {
  router.post("/posts", async (ctx) => {
    // 获取 Origin 请求头
    const fields = ctx.request.body;
    const requestOrigin = ctx.get('Origin');
    if (requestOrigin) {
      // 设置响应头
      ctx.set('Access-Control-Allow-Origin', requestOrigin);
      ctx.set('Access-Control-Allow-Credentials', 'true');
      ctx.set('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE');
      ctx.set('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Access-Control-Request-Headers, Access-Control-Request-Method, Authorization, X-Requested-With, User-Agent, Referer, Origin');
      ctx.set('Access-Control-Max-Age', '1728000');
      //ctx.set('Access-Control-Expose-Headers','Content-Type,Content-Length,Accept,Accept-Encoding,Accept-Language,Referer,Connection,X-Access-Token,Authorization,Origin,Cache-Control,X-Requested-With,X-Check-Result,Content-Disposition,Host')
    }

    const connection = await getDBConnection();
    const post = new Post();
    post.title = fields.title;
    post.content = fields.content;
    post.author = ctx.session.user;
    await connection.manager.save(post)

    ctx.status = 200;
    ctx.body = {
      code: 200,
      message: '保存成功',
      status: true
    };

  });

  router.put("/posts/:id", async (ctx) => {
    // 获取 Origin 请求头
    const fields = ctx.request.body;
    const requestOrigin = ctx.get('Origin');
    if (requestOrigin) {
      // 设置响应头
      ctx.set('Access-Control-Allow-Origin', requestOrigin);
      ctx.set('Access-Control-Allow-Credentials', 'true');
      ctx.set('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE');
      ctx.set('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Access-Control-Request-Headers, Access-Control-Request-Method, Authorization, X-Requested-With, User-Agent, Referer, Origin');
      ctx.set('Access-Control-Max-Age', '1728000');
      //ctx.set('Access-Control-Expose-Headers','Content-Type,Content-Length,Accept,Accept-Encoding,Accept-Language,Referer,Connection,X-Access-Token,Authorization,Origin,Cache-Control,X-Requested-With,X-Check-Result,Content-Disposition,Host')
    }

    const connection = await getDBConnection();
    const post = await connection.manager.findOne(Post,{
      id: parseInt(ctx.params.id)
    })
    post.title = fields.title;
    post.content = fields.content;
    post.author = ctx.session.user;
    await connection.manager.save(post)

    ctx.status = 200;
    ctx.body = {
      code: 200,
      message: '保存成功',
      status: true
    };

  });

  router.get("/posts", async (ctx) => {
    const connection = await getDBConnection();
    const postsList = await connection.manager.find(Post,{
      author: ctx.session.user
    })
    ctx.status = 200;
    ctx.body = {
      code: 200,
      data: postsList || [],
      status: true
    };
  })

  router.get("/all_posts", async (ctx) => {
    const connection = await getDBConnection();
    const userList = await connection.manager.find(User)
    let postsList= []
    await Promise.all(userList.map(async (item)=>{
      const postsListIn = await connection.manager.find(Post,{
        author: item
      })
      postsListIn.map(post=>{
        Object.defineProperty(post,'author',{
          value: item.nickname,
          configurable: true,
          enumerable: true,
          writable: true
        })
      })
      //console.log('postsListIn',postsListIn)
      postsList = [...postsList,...postsListIn]
    }))
    //const postsList = await connection.manager.find(Post)
    ctx.status = 200;
    ctx.body = {
      code: 200,
      data: postsList || [],
      status: true
    };
  })

  router.get("/posts/:id", async (ctx) => {
    const connection = await getDBConnection();
    const postInfo = await connection.manager.findOne(Post,{
      id: parseInt(ctx.params.id)
    })
    ctx.status = 200;
    ctx.body = {
      code: 200,
      data: postInfo,
      status: true
    };
  })
};

export default posts;
