import { observable, action } from 'mobx'
import { CHAIN_ID } from '../config'
import { NETWORK } from '../constants'
import logger from '../utils/logger'

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
        logger.error(`Error getting wallet accounts: ${err.message}`)
      }

      const acct = accounts[0]
      if (acct) this.account = acct
    })

    // Init network
    window.naka.version.getNetwork((err, network) => {
      if (err) {
        logger.error(`Error getting wallet network: ${err.message}`)
      }

      if (network === CHAIN_ID.MAINNET) {
        this.network = NETWORK.MAINNET
      } else if (network === CHAIN_ID.TESTNET) {
        this.network = NETWORK.TESTNET
      }
    })
  }
}
