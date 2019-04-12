import { observable, action } from 'mobx'
import Config from '../config'
import Constants from '../constants'

const { CHAIN_ID } = Config
const { NETWORK } = Constants

export default class WalletStore {
  @observable account = undefined
  @observable network = undefined

  constructor(appStore) {
    this.appStore = appStore
  }

  @action
  init = () => {
    if (!window.naka) return

    // Init account
    window.naka.eth.getAccounts((err, accounts) => {
      if (err) {
        console.error(`Error getting NakaWallet accounts: ${err.message}`)
      }

      const acct = accounts[0]
      if (acct) this.account = acct
    })

    // Init network
    window.naka.version.getNetwork((err, network) => {
      if (err) {
        console.error(`Error getting NakaWallet network: ${err.message}`)
      }

      if (network === CHAIN_ID.MAINNET) {
        this.network = NETWORK.MAINNET
      } else if (network === CHAIN_ID.TESTNET) {
        this.network = NETWORK.TESTNET
      }
    })
  }
}
