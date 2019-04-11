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
  @observable drawingInterval = undefined
  @observable lastDrawingBlockNumber = undefined

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

      this.fetchDrawingInterval()
      this.fetchWinningAmount()
      this.fetchLastDrawingBlockNumber()
    }
  }

  @action
  fetchDrawingInterval = () => {
    this.contract.withdrawInterval((err, res) => {
      if (err) {
        console.error('Error fetching withdrawInterval.', err)
        return
      }

      this.drawingInterval = res.toString()
    })
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

  @action
  fetchLastDrawingBlockNumber = () => {
    this.contract.lastDrawingBlockNum((err, res) => {
      if (err) {
        console.error('Error fetching lastDrawingBlockNumber.', err)
        return
      }

      this.lastDrawingBlockNumber = res.toString()
    })
  }
}
