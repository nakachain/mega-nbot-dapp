import { observable, action, reaction } from 'mobx'
import Web3 from 'web3'
import logger from '../utils/logger'
import Config from '../config'
import Constants from '../constants'

const { URL } = Config
const { NETWORK } = Constants
const KEY_SELECTED_NETWORK = 'selectedNetwork'

export default class ChainStore {
  @observable selectedNetwork = NETWORK.MAINNET
  @observable web3 = undefined
  @observable blockNumber = undefined

  constructor(appStore) {
    this.appStore = appStore
    this.setWeb3()

    reaction(
      () => this.selectedNetwork,
      () => this.setWeb3(),
    )
  }

  @action
  loadSelectedNetworkFromStorage = () => {
    const storedNetwork = localStorage.getItem(KEY_SELECTED_NETWORK)
    if (storedNetwork) this.selectedNetwork = storedNetwork
    else localStorage.setItem(KEY_SELECTED_NETWORK, this.selectedNetwork)
  }

  @action
  setWeb3 = () => {
    if (this.selectedNetwork === NETWORK.MAINNET) {
      this.web3 = new Web3(URL.RPC_WS_MAINNET)
    } else {
      this.web3 = new Web3(URL.RPC_WS_TESTNET)
    }
  }

  @action
  init = () => {
    this.loadSelectedNetworkFromStorage()

    this.web3.eth.subscribe('newBlockHeaders', (err, res) => {
      if (err) {
        logger.error(`Error getting new block: ${err.message}`)
        return
      }
      logger.info(`Subscribed to newBlockHeaders: ${res}`)
    }).on('data', (blockHeader) => {
      this.blockNumber = blockHeader.number
    })
  }

  @action
  setSelectedNetwork = (network) => {
    this.selectedNetwork = network
    localStorage.setItem(KEY_SELECTED_NETWORK, network)
  }
}
