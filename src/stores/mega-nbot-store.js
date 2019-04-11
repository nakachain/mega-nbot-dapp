import { observable, action } from 'mobx'
import MegaNBOTMeta from '../contracts/mega-nbot'
import NBOTMeta from '../contracts/nbot'
import { formatNumberResponse } from '../utils/format'
import Constants from '../constants'
import Config from '../config'

const { NETWORK } = Constants
const { TOKEN: { NBOT } } = Config

export default class MegaNBOTStore {
  contract = undefined
  nbotContract = undefined
  @observable deployed = false
  @observable winningAmount = undefined
  @observable lastDrawingBlockNumber = undefined
  @observable drawingInterval = undefined

  constructor(appStore) {
    this.appStore = appStore
  }

  @action
  initContracts = () => {
    let addr
    let nbotAddr
    const { network } = this.appStore.walletStore
    if (network === NETWORK.MAINNET) {
      addr = MegaNBOTMeta.mainnet
      nbotAddr = NBOTMeta.mainnet
    } else if (network === NETWORK.TESTNET) {
      addr = MegaNBOTMeta.testnet
      nbotAddr = NBOTMeta.testnet
    }

    if (addr && nbotAddr) {
      this.contract = window.naka.eth.contract(MegaNBOTMeta.abi).at(addr)
      this.nbotContract = window.naka.eth.contract(NBOTMeta.abi).at(nbotAddr)
      this.deployed = true

      this.fetchWinningAmount()
    }
  }

  @action
  fetchWinningAmount = () => {
    this.contract.winningAmount((err, res) => {
      if (err) {
        console.error('Error fetching winningAmount.', err)
        return
      }

      this.winningAmount = formatNumberResponse(res, {
        symbol: NBOT.symbol,
        decimals: NBOT.decimals,
      })
    })
  }
}
