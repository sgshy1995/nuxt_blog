import Router from 'koa-router';
import {frontCreateDecipher} from '~/lib/frontSecurity';
import {SignIn} from '~/src/module/SignIn';

const login = (router: Router) => {
  router.post("/login", async (ctx) => {
    const fields = ctx.request.body;
    console.log('ctx.session', ctx.session);


    if (!fields.username || !fields.password || !fields.passwordTag){
      ctx.status = 422;
      ctx.body = {
        code: 422,
        message: '参数错误',
        status: false
      };
    }else{
      // 获取公钥，公钥的环境变量要暴露给浏览器
      const publicKey = process.env.NEXT_PUBLIC_FRONT_KEY;

      // 解密
      const {passwordOut: password} = frontCreateDecipher(fields.password, publicKey, fields.passwordTag);

      //const {username, password, passwordConfirm} = req.body as { [key: string]: string };
      const username: string = fields.username;

      const signIn = new SignIn();
      signIn.username = username;
      signIn.password = password;

      await signIn.validate()

      if (!signIn.hasError) {
        signIn.result.code = 200;
        signIn.result.message = '登录成功';
        signIn.result.status = true;
        ctx.session.user = signIn.user
        ctx.status = 200;
      } else {
        ctx.status = 422;
      }
      ctx.body = signIn.result;
    }

    ctx.header['content-type'] = 'application/json'

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

export default login;
