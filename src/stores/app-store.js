import WalletStore from './wallet-store'
import ChainStore from './chain-store'
import NBOTStore from './nbot-store'
import MegaNBOTStore from './mega-nbot-store'
import TokenExchangeStore from './token-exchange-store'

export default class AppStore {
  constructor() {
    this.walletStore = new WalletStore(this)
    this.chainStore = new ChainStore(this)
    this.nbotStore = new NBOTStore(this)
    this.megaNBOTStore = new MegaNBOTStore(this)
    this.tokenExchangeStore = new TokenExchangeStore(this)

    // Wait for window to finish loading so we ensure web3 is injected first
    window.onload = () => {
      this.walletStore.init()
      this.chainStore.init()
    }
  }
}
