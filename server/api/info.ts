import Router from 'koa-router';

const info = (router: Router) => {
  router.post("/userinfo", ctx => {
    ctx.status = 200;
    ctx.body = {
      code: 200,
      data: {
        username: 'sgs_zyn_0808'
      },
      status: true
    };
  });
};

module.exports = info;
