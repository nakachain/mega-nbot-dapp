import { observable, action } from 'mobx'
import Web3 from 'web3'
import Config from '../config'
import Constants from '../constants'
import logger from '../utils/logger'

const { CHAIN_ID, URL } = Config
const { NETWORK } = Constants

export default class WalletStore {
  @observable account = undefined
  @observable network = undefined
  web3 = undefined

  constructor(appStore) {
    this.appStore = appStore
  }

  @action
  init = () => {
    if (!window.naka) return

    // Init account
    window.naka.eth.getAccounts((err, accounts) => {
      if (err) {
        logger.error(`Error getting NakaWallet accounts: ${err.message}`)
      }

      const acct = accounts[0]
      if (acct) this.account = acct
    })

    // Init network
    window.naka.version.getNetwork((err, network) => {
      if (err) {
        logger.error(`Error getting NakaWallet network: ${err.message}`)
      }

      if (network === CHAIN_ID.MAINNET) {
        this.web3 = new Web3(URL.RPC_WS_MAINNET)
        this.network = NETWORK.MAINNET
      } else if (network === CHAIN_ID.TESTNET) {
        this.web3 = new Web3(URL.RPC_WS_TESTNET)
        this.network = NETWORK.TESTNET
      }
    })
  }
}
