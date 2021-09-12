import Router from 'koa-router';
import crypto from 'crypto';
import {stringToUint8Array} from '@/lib/bufferSwitchString';
import {getDBConnection} from '@/lib/getDBConnection';
import {User} from '@/src/entity/User';
import _ from 'lodash';

const register = (router: Router) => {
  router.post("/register", async (ctx) => {
    const fields = ctx.request.body;
    console.log('ctx.session', ctx.session);


    if (!fields.username || !fields.nickname || !fields.password || !fields.passwordConfirm || !fields.passwordTag || !fields.passwordConfirmTag){
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
      const decipherP = crypto.createDecipher("aes-256-gcm", publicKey);
      decipherP.setAuthTag(stringToUint8Array(fields.passwordTag || ''));
      const decipherPIn = decipherP.update(fields.password || '', "hex", "utf8");
      const password = decipherPIn + decipherP.final("utf8");

      const decipherPC = crypto.createDecipher("aes-256-gcm", publicKey);
      decipherPC.setAuthTag(stringToUint8Array(fields.passwordConfirmTag || ''));
      const decipherPCIn = decipherPC.update(fields.passwordConfirm || '', "hex", "utf8");
      const passwordConfirm = decipherPCIn + decipherPC.final("utf8");

      //const {username, password, passwordConfirm} = req.body as { [key: string]: string };
      const username: string = fields.username;
      const nickname: string = fields.nickname;
      const connection = await getDBConnection();

      const user = new User();
      user.username = username;
      user.password = password;
      user.nickname = nickname;
      user.passwordConfirm = passwordConfirm;

      await user.validate()

      if (!user.hasError) {
        user.result.code = 200;
        user.result.message = '注册成功';
        user.result.status = true;
        ctx.status = 200;
        await connection.manager.save(user)
        const userGet = await connection.manager.findOne(User, {where: {username: user.username}});
        ctx.session.user = _.pickBy(userGet, (value, key) => {
          return ['username', 'id', 'avatar', 'nickname'].indexOf(key) > -1;
        });
      } else {
        ctx.status = 422;
      }
      ctx.body = user.result;
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

export default register;
