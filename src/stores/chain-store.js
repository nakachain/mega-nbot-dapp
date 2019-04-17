import { observable, action, reaction } from 'mobx'
import logger from '../utils/logger'
import Constants from '../constants'

const { NETWORK } = Constants

export default class ChainStore {
  @observable network = NETWORK.MAINNET
  @observable blockNumber = undefined

  constructor(appStore) {
    this.appStore = appStore

    reaction(
      () => this.appStore.walletStore.web3,
      () => this.init(),
    )
  }

  @action
  init = () => {
    const { web3 } = this.appStore.walletStore
    if (!web3) return

    web3.eth.subscribe('newBlockHeaders', (err, res) => {
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
  setNetwork = (network) => {
    this.network = network
  }
}
