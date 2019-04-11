import { observable, action } from 'mobx'
import Config from '../config'

const { INTERVAL: { BLOCK_TIME } } = Config

export default class ChainStore {
  blockInterval = undefined
  @observable blockNumber = 0

  constructor(appStore) {
    this.appStore = appStore
    this.init()
  }

  @action
  init = () => {
    if (this.blockInterval) {
      clearInterval(this.blockInterval)
    }

    this.blockInterval = setInterval(() => {
      this.getBlockNumber()
    }, BLOCK_TIME)
  }

  @action
  getBlockNumber = () => {
    window.naka.eth.getBlockNumber((err, res) => {
      if (err) {
        console.error('Error getting block number:', err)
        return
      }

      this.blockNumber = res
    })
  }
}
