import {Middleware} from '@nuxt/types';
import {UAParser} from 'ua-parser-js';

const useragent:Middleware = async ({route, store, redirect,req })=>{
  // 获取 user-agent
  const ua = req.headers['user-agent'];
  const info = new UAParser(ua).getResult();
  Object.keys(info).map(key => {
    const infoInner: any = (info as any)[key];
    Object.keys(infoInner).map(keyIn => {
      if (!infoInner[keyIn]) infoInner[keyIn] = null;
    });
  });
  await store.dispatch('useragent/setUseragent',info)
}

export default useragent;
