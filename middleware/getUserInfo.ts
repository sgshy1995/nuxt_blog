import {Middleware} from '@nuxt/types';

const getUserInfo:Middleware = async ({route, store, redirect,req,app })=>{
  // 登录用户信息
  const promise = await app.$axios.get('/api/userinfo',{withCredentials: true})
  if (promise){
    const userInfo = promise.data.data
    store.commit("user/commitUserInfo", userInfo)
  }
}

export default getUserInfo;
