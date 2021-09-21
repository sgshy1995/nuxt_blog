import {Middleware} from '@nuxt/types';
import Vue from 'vue'

const getUserInfo:Middleware = async ({route, store, redirect,req,app })=>{
  // 登录用户信息
  const promise = await app.$axios.get('/api/userinfo',{withCredentials: true})
  if (promise){
    const userInfo = promise.data.data
    console.log('userInfo',userInfo)
    if (userInfo){
      store.commit("user/commitUserInfo", userInfo)
    }else{
      if (route.path.indexOf('/posts')>-1){
        console.log('重新跳转')
        await redirect({path: '/login'})
      }
    }
  }
}

export default getUserInfo;
