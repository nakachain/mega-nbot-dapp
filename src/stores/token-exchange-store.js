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
      () => this.appStore.walletStore.web3,
      () => this.initContract(),
    )

    reaction(
      () => this.appStore.chainStore.blockNumber,
      () => this.fetchExchangeRate(),
    )
  }

  @action
  initContract = () => {
    const { network, web3 } = this.appStore.walletStore
    if (!network || !web3) return

    const { abi, address } = TokenExchangeMeta
    this.contract = new web3.eth.Contract(abi, address)
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
