import WalletStore from './wallet-store'
import MegaNBOTStore from './mega-nbot-store'

export default class AppStore {
  constructor() {
    this.walletStore = new WalletStore(this)
    this.megaNBOTStore = new MegaNBOTStore(this)
  }
}
