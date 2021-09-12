import Router from 'koa-router';

const info = (router: Router) => {
  router.get("/userinfo", ctx => {
    ctx.status = 200;
    ctx.body = {
      code: 200,
      data: ctx.session.user,
      status: true
    };
  });
};

export default info;
