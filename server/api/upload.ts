import Router from 'koa-router';

const upload = (router: Router) => {
  router.post("/upload", async (ctx) => {
    const fields = ctx.request.body;
    const files = ctx.request.files
    console.log('files-------upload',files instanceof Array,files)

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

    ctx.header['content-type'] = 'application/json'

    const file = files.file

    if (files.file){
      ctx.status = 200
      ctx.body = {
        status: true,
        code: 200,
        message: '上传成功',
        data: {
          filePath: (<any>file).path.split('/static/')[1]
        }
      }
    }else{
      ctx.status = 500
      ctx.body = {
        status: false,
        code: 500,
        message: '上传失败'
      }
    }



    /*if (user.username === "jerry" && user.password === "123") {
      // 将token存入cookie
      const token = 'a mock token';
      ctx.cookies.set('token', token);
      ctx.body = {ok: 1, token};
    } else {
      ctx.body = {ok: 0};
    }*/
  });
};

export default upload;
