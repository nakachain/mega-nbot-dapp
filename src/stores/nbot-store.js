import { observable, action, reaction } from 'mobx'
import logger from '../utils/logger'
import { getContractAddress } from '../utils'
import NBOTMeta from '../contracts/nbot'

const DEFAULT_VALUES = {
  address: undefined,
  contract: undefined,
  owner: undefined,
}

export default class NBOTStore {
  @observable address = undefined
  @observable contract = undefined
  @observable owner = undefined

  constructor(appStore) {
    this.appStore = appStore

    reaction(
      () => this.appStore.chainStore.web3,
      () => this.init(),
    )

    reaction(
      () => this.appStore.chainStore.blockNumber,
      () => this.fetchOwner(),
    )
  }

  @action
  init = () => {
    // Reset
    Object.assign(this, DEFAULT_VALUES)

    const { selectedNetwork, web3 } = this.appStore.chainStore
    this.address = getContractAddress(selectedNetwork, NBOTMeta)
    this.contract = new web3.eth.Contract(NBOTMeta.abi, this.address)
    this.fetchOwner()
  }

  @action
  fetchOwner = async () => {
    if (!this.contract) return

    try {
      this.owner = await this.contract.methods.owner().call()
    } catch (err) {
      logger.error(`Error NBOT.owner(): ${err.message}`)
    }
  }
}
