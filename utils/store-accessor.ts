import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import User from '~/store/user'
import Useragent from '~/store/useragent';
import {UAParser} from 'ua-parser-js';

let UserModule: User
let UseragentModule: Useragent

const actions = {
  async nuxtServerInit({commit},{req,app}){
    // 获取 user-agent
    const ua = req.headers['user-agent'];
    const info = new UAParser(ua).getResult();
    Object.keys(info).map(key => {
      const infoInner: any = (info as any)[key];
      Object.keys(infoInner).map(keyIn => {
        if (!infoInner[keyIn]) infoInner[keyIn] = null;
      });
    });
    commit("useragent/commitUseragent", info)
  }
}

function initialiseStores(store: Store<any>): void {
  UserModule = getModule(User, store)
  UseragentModule = getModule(Useragent, store)
}

export { initialiseStores, UserModule, UseragentModule, actions }
