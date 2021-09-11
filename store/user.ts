import {VuexModule, Module, Action, Mutation} from 'vuex-module-decorators'

export interface UserState {
  userInfo: {
    username:string
    avatar: string
    nickname: string
    id: number
  }
}

@Module({
  name: 'user',
  stateFactory: true,
  namespaced: true
})
export default class User extends VuexModule implements UserState{

  userInfo = {
    username: '',
    avatar: '',
    nickname: '',
    id: 0
  };

  @Mutation
  commitUserInfo(info: {
    username:string
    avatar: string
    nickname: string
    id: number
  }) {
    this.userInfo = info;
  }

  @Action
  setUserInfo(info: {
    username:string
    avatar: string
    nickname: string
    id: number
  }) {
    this.context.commit('commitUserInfo', info)
  }
}
