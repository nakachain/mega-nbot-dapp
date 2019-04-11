import WalletStore from './wallet-store'
import ChainStore from './chain-store'
import MegaNBOTStore from './mega-nbot-store'

export default class AppStore {
  constructor() {
    this.walletStore = new WalletStore(this)
    this.chainStore = new ChainStore(this)
    this.megaNBOTStore = new MegaNBOTStore(this)
  }
}
