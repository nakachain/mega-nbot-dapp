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
        contract: nbotContract,
        address: nbotAddress,
      },
    } = this.appStore
    if (!this.contract || !nbotContract || !nbotAddress) return

    // Get owner of token
    let owner
    try {
      owner = await nbotContract.methods.owner().call()
    } catch (err) {
      logger.error(`Error NBOT.owner(): ${err.message}`)
    }
    if (!owner || owner === ADDRESS.INVALID) return

    // Get exchange rate of token owner
    try {
      const rate = await this.contract.methods.getRate(nbotAddress, owner).call()
      this.exchangeRate = rate._hex // eslint-disable-line
    } catch (err) {
      logger.error(`Error TokenExchange.getRate(): ${err.message}`)
    }
  }
}
