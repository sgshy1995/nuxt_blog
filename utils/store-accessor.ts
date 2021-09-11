import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import User from '~/store/user'

let UserModule: User

function initialiseStores(store: Store<any>): void {
  UserModule = getModule(User, store)
}

export { initialiseStores, UserModule }
