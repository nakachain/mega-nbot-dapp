import { observable, action, reaction } from 'mobx'
import Web3 from 'web3'
import logger from '../utils/logger'
import { URL, STORAGE_KEY } from '../config'
import { NETWORK } from '../constants'

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
    const storedNetwork = localStorage.getItem(STORAGE_KEY.NETWORK)
    if (storedNetwork) this.selectedNetwork = storedNetwork
    else localStorage.setItem(STORAGE_KEY.NETWORK, this.selectedNetwork)
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

    this.web3.eth.clearSubscriptions()
    this.web3.eth.subscribe('newBlockHeaders', (err, res) => {
      if (err) {
        logger.error(`Error subscribing to newBlockHeaders: ${err.message}`)
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
    localStorage.setItem(STORAGE_KEY.NETWORK, network)
  }
}
