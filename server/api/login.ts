import Router from 'koa-router';

const login = (router: Router) => {
  router.post("/login", ctx => {
    const user = ctx.request.body;
    if (user.username === "jerry" && user.password === "123") {
      // 将token存入cookie
      const token = 'a mock token';
      ctx.cookies.set('token', token);
      ctx.body = {ok: 1, token};
    } else {
      ctx.body = {ok: 0};
    }
  });
};

module.exports = login;
