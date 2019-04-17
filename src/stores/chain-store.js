import { observable, action, reaction } from 'mobx'
import logger from '../utils/logger'

export default class ChainStore {
  blockInterval = undefined
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
}
