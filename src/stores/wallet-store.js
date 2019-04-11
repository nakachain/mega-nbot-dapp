import { observable, action } from 'mobx'

export default class WalletStore {
  @observable account = undefined
  @observable network = undefined

  constructor(appStore) {
    this.appStore = appStore
  }

  @action
  setAccount = (account) => {
    this.account = account
  }

  @action
  setNetwork = (network) => {
    this.network = network
  }
}
