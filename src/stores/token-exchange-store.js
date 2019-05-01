import { observable, action, reaction } from 'mobx'
import logger from '../utils/logger'
import TokenExchangeMeta from '../contracts/token-exchange'
import { ADDRESS } from '../constants'

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
    const {
      nbotStore: {
        address: nbotAddress,
        owner: nbotOwner,
      },
    } = this.appStore

    if (
      !this.contract
      || !nbotAddress
      || !nbotOwner
      || nbotOwner === ADDRESS.INVALID
    ) return

    try {
      const rate = await this.contract.methods.getRate(nbotAddress, nbotOwner).call()
      this.exchangeRate = rate._hex // eslint-disable-line
    } catch (err) {
      logger.error(`Error TokenExchange.getRate(): ${err.message}`)
    }
  }
}
