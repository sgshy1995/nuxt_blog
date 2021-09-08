// 此文件并非nuxt生成，它为演示项目提供数据服务接口
import Router from 'koa-router';

const router: Router = require("koa-router")({prefix: "/api"});
const infoIn = require('./api/info');
const loginIn = require('./api/login');

// 设置cookie加密秘钥

const goods = [
  {id: 1, text: "衣服", price: 60},
  {id: 2, text: "鞋子", price: 200}
];

// 配置路由
// 获取产品列表
// http://localhost:8080/api/goods
router.get("/goods", ctx => {
  ctx.body = {
    ok: 1,
    goods
  };
});

// 产品详情
router.get("/detail", ctx => {
  ctx.body = {
    ok: 1,
    data: goods.find(good => good.id.toString() === ctx.query.id)
  };
});

// 登录
loginIn(router);

// 获取用户信息
infoIn(router);

module.exports = router;

