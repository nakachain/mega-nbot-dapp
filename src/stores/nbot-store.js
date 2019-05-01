import { observable, action, reaction } from 'mobx'
import { getContractAddress } from '../utils'
import NBOTMeta from '../contracts/nbot'

const DEFAULT_VALUES = {
  address: undefined,
  contract: undefined,
}

export default class NBOTStore {
  @observable address = undefined
  @observable contract = undefined

  constructor(appStore) {
    this.appStore = appStore

    reaction(
      () => this.appStore.chainStore.web3,
      () => this.init(),
    )
  }

  @action
  init = () => {
    // Reset
    Object.assign(this, DEFAULT_VALUES)

    const { selectedNetwork, web3 } = this.appStore.chainStore
    this.address = getContractAddress(selectedNetwork, NBOTMeta)
    this.contract = new web3.eth.Contract(NBOTMeta.abi, this.address)
  }
}
