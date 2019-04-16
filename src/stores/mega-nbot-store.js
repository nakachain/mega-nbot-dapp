import { observable, action, reaction, computed } from 'mobx'
import BN from 'bn.js'
import { isUndefined } from 'lodash'
import prettyMs from 'pretty-ms'
import MegaNBOTMeta from '../contracts/mega-nbot'
import NBOTMeta from '../contracts/nbot'
import logger from '../utils/logger'
import { formatNumberResponse } from '../utils/format'
import Constants from '../constants'
import Config from '../config'

const { NETWORK } = Constants
const { TOKEN: { NBOT }, INTERVAL: { BLOCK_TIME } } = Config

export default class MegaNBOTStore {
  contract = undefined
  nbotContract = undefined
  @observable deployed = false
  @observable winningAmount = undefined
  drawingInterval = undefined
  lastDrawingBlockNumber = undefined
  @observable blocksLeft = undefined
  @observable timeLeft = undefined
  @observable previousWinner = undefined
  @observable currentTempWinner = undefined

  constructor(appStore) {
    this.appStore = appStore

    reaction(
      () => this.appStore.walletStore.network,
      () => this.initContracts(),
    )

    reaction(
      () => this.appStore.chainStore.blockNumber,
      () => {
        this.fetchDrawingInterval()
        this.fetchWinningAmount()
        this.fetchLastDrawingBlockNumber()
        this.fetchPreviousWinner()
        this.fetchCurrentTempWinner()
        this.calculateBlocksLeft()
      },
    )
  }

  @computed get drawButtonDisabled() {
    return isUndefined(this.blocksLeft)
  }

  toNBOTStr = amount => formatNumberResponse(amount, {
    symbol: NBOT.symbol,
    decimals: NBOT.decimals,
  })

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
      this.fetchPreviousWinner()
      this.fetchCurrentTempWinner()
    }
  }

  @action
  fetchDrawingInterval = () => {
    if (!this.contract) return
    this.contract.drawingInterval((err, res) => {
      if (err) {
        logger.error(`Error fetching withdrawInterval: ${err.message}`)
        return
      }

      this.drawingInterval = res.toString()
    })
  }

  @action
  fetchWinningAmount = () => {
    if (!this.contract) return
    this.contract.winningAmount((err, res) => {
      if (err) {
        logger.error(`Error fetching winningAmount: ${err.message}`)
        return
      }

      this.winningAmount = this.toNBOTStr(res)
    })
  }

  @action
  fetchLastDrawingBlockNumber = () => {
    if (!this.contract) return
    this.contract.lastDrawingBlockNum((err, res) => {
      if (err) {
        logger.error(`Error fetching lastDrawingBlockNumber: ${err.message}`)
        return
      }

      this.lastDrawingBlockNumber = res.toString()
    })
  }

  @action
  fetchPreviousWinner = () => {
    if (!this.contract) return
    this.contract.previousWinner((err, res) => {
      if (err) {
        logger.error(`Error fetching previousWinner: ${err.message}`)
        return
      }

      this.previousWinner = res
    })
  }

  @action
  fetchCurrentTempWinner = () => {
    if (!this.contract) return
    this.contract.currentTempWinner((err, res) => {
      if (err) {
        logger.error(`Error fetching currentTempWinner: ${err.message}`)
        return
      }

      this.currentTempWinner = res
    })
  }

  @action
  calculateBlocksLeft = () => {
    if (this.appStore.chainStore.blockNumber
      && this.drawingInterval
      && this.lastDrawingBlockNumber) {
      const nextDrawing = new BN(this.lastDrawingBlockNumber)
        .add(new BN(this.drawingInterval))
      const blocksLeft = nextDrawing.sub(
        new BN(this.appStore.chainStore.blockNumber),
      )

      if (blocksLeft.isZero() || blocksLeft.isNeg()) {
        this.blocksLeft = '0'
        this.timeLeft = prettyMs(0)
      } else {
        this.blocksLeft = blocksLeft.toString()
        this.timeLeft = prettyMs(blocksLeft.toNumber() * BLOCK_TIME)
      }
    }
  }

  enterDrawing = () => {
    if (!this.contract) return
    this.contract.enterDrawing((err, res) => {
      if (err) {
        logger.error(`Error enterDrawing: ${err.message}`)
        return
      }

      logger.info(`txid: ${res}`)
    })
  }
}
