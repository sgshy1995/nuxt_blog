import {VuexModule, Module, Action, Mutation} from 'vuex-module-decorators'

@Module({
  name: 'useragent',
  stateFactory: true,
  namespaced: true
})
export default class Useragent extends VuexModule{

  info:Info = {};

  @Mutation
  commitUseragent(info: Info) {
    this.info = info;
  }

  @Action
  setUseragent(info: Info) {
    this.context.commit('commitUseragent', info)
  }
}
