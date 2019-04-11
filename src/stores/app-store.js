import WalletStore from './wallet-store'

export default class AppStore {
  constructor() {
    this.walletStore = new WalletStore(this)
  }
}
