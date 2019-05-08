import { observable, action, reaction } from 'mobx'
import Web3 from 'web3'
import logger from '../utils/logger'
import ExplorerAPIs from '../utils/explorerAPIs'
import { URL, STORAGE_KEY } from '../config'
import { NETWORK } from '../constants'

export default class ChainStore {
  @observable selectedNetwork = undefined
  @observable web3 = undefined
  @observable blockNumber = undefined
  @observable explorerAPIs = undefined
  newBlockHeadersSubscription = undefined
  constructor(appStore) {
    this.appStore = appStore

    reaction(
      () => this.selectedNetwork,
      () => {
        this.unsubscribeToBlockHeaders()
        this.setWeb3()
        this.subscribeToBlockHeaders()
      },
    )
  }

  @action
  init = () => {
    // Try to load selected network from storage
    const storedNetwork = localStorage.getItem(STORAGE_KEY.NETWORK)
    this.explorerAPIs = new ExplorerAPIs({ type: storedNetwork || NETWORK.TESTNET })
    if (storedNetwork) {
      this.selectedNetwork = storedNetwork
    } else {
      this.setSelectedNetwork(NETWORK.TESTNET)
    }
  }

  @action
  setSelectedNetwork = (network) => {
    this.selectedNetwork = network
    this.explorerAPIs.setBaseUrl({ type: network })
    localStorage.setItem(STORAGE_KEY.NETWORK, network)
  }

  @action
  unsubscribeToBlockHeaders = () => {
    if (!this.newBlockHeadersSubscription) return

    this.newBlockHeadersSubscription.unsubscribe((err, res) => {
      if (err) {
        logger.error(`Error unsubscribing newBlockHeaders: ${err.message}`)
        return
      }
      logger.info(`Unsubscribed newBlockHeaders: ${res}`)
    })
  }

  @action
  subscribeToBlockHeaders = () => {
    if (!this.web3) return

    this.newBlockHeadersSubscription = this.web3.eth.subscribe(
      'newBlockHeaders',
      (err, res) => {
        if (err) {
          logger.error(`Error subscribing newBlockHeaders: ${err.message}`)
          return
        }
        logger.info(`Subscribed newBlockHeaders: ${res}`)
      },
    ).on('data', (blockHeader) => {
      this.blockNumber = blockHeader.number
    })
  }

  @action
  setWeb3 = () => {
    if (this.selectedNetwork === NETWORK.MAINNET) {
      this.web3 = new Web3(URL.RPC_WS_MAINNET)
    } else if (this.selectedNetwork === NETWORK.TESTNET) {
      this.web3 = new Web3(URL.RPC_WS_TESTNET)
    }
  }
}
