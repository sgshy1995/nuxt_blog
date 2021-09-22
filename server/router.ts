// 此文件并非nuxt生成，它为演示项目提供数据服务接口
import Router from 'koa-router';

const router: Router = require("koa-router")({prefix: "/api"});
import infoIn from '@/server//api/info';
import register from '@/server//api/register';
import login from '@/server/api/login';
import posts from '@/server/api/posts'
import upload from '@/server/api/upload'

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

// 注册
register(router);

// 登录
login(router);

// 获取用户信息
infoIn(router);

// 博客
posts(router);

// 上传
upload(router);

export default router;

