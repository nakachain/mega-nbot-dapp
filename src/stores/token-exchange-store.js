import { observable, action, reaction } from 'mobx'
import logger from '../utils/logger'
import TokenExchangeMeta from '../contracts/token-exchange'

export default class TokenExchangeStore {
  contract = undefined
  @observable exchangeRate = undefined

  constructor(appStore) {
    this.appStore = appStore

    reaction(
      () => this.appStore.walletStore.network,
      () => this.initContract(),
    )

    reaction(
      () => this.appStore.chainStore.blockNumber,
      () => this.fetchExchangeRate(),
    )
  }

  @action
  initContract = () => {
    const { abi, address } = TokenExchangeMeta
    this.contract = window.naka.eth.contract(abi).at(address)
  }

  @action
  fetchExchangeRate = () => {
    const { nbotAddress, owner } = this.appStore.megaNBOTStore

    if (nbotAddress && owner) {
      this.contract.getRate(nbotAddress, owner, (err, res) => {
        if (err) {
          logger.error(`Error getRate: ${err.message}`)
          return
        }

        this.exchangeRate = res.toString(16)
      })
    }
  }
}
