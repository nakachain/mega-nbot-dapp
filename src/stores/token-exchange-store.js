import { observable, action, reaction } from 'mobx'
import logger from '../utils/logger'
import TokenExchangeMeta from '../contracts/token-exchange'

const DEFAULT_VALUES = {
  contract: undefined,
  exchangeRate: undefined,
}

export default class TokenExchangeStore {
  contract = undefined
  @observable exchangeRate = undefined

  constructor(appStore) {
    this.appStore = appStore

    reaction(
      () => this.appStore.chainStore.web3,
      () => this.init(),
    )

    reaction(
      () => this.appStore.chainStore.blockNumber,
      () => this.fetchExchangeRate(),
    )
  }

  @action
  init = () => {
    // Reset
    Object.assign(this, DEFAULT_VALUES)

    const { web3 } = this.appStore.chainStore
    const { abi, address } = TokenExchangeMeta
    this.contract = new web3.eth.Contract(abi, address)
    this.fetchExchangeRate()
  }

  @action
  fetchExchangeRate = async () => {
    const { nbotAddress, owner } = this.appStore.megaNBOTStore
    if (!this.contract || !nbotAddress || !owner) return

    try {
      const res = await this.contract.methods.getRate(nbotAddress, owner).call()
      this.exchangeRate = res._hex // eslint-disable-line
    } catch (err) {
      logger.error(`Error getRate: ${err.message}`)
    }
  }
}
