import { observable, action, reaction, computed } from 'mobx'
import BN from 'bn.js'
import { isUndefined } from 'lodash'
import prettyMs from 'pretty-ms'
import MegaNBOTMeta from '../contracts/mega-nbot'
import NBOTMeta from '../contracts/nbot'
import logger from '../utils/logger'
import { getContractAddress } from '../utils'
import { formatNumberResponse } from '../utils/format'
import Constants from '../constants'
import Config from '../config'

const { NETWORK } = Constants
const { TOKEN: { NBOT }, INTERVAL: { BLOCK_TIME } } = Config

export default class MegaNBOTStore {
  contract = undefined
  nbotContract = undefined
  nbotAddress = undefined
  @observable deployed = false
  @observable owner = undefined
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
      () => this.appStore.walletStore.web3,
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
    const { network, web3 } = this.appStore.walletStore
    if (!network || !web3) return

    let addr
    let nbotAddr
    if (network === NETWORK.MAINNET) {
      addr = MegaNBOTMeta.mainnet
      nbotAddr = NBOTMeta.mainnet
    } else if (network === NETWORK.TESTNET) {
      addr = MegaNBOTMeta.testnet
      nbotAddr = NBOTMeta.testnet
    }

    if (addr && nbotAddr && web3) {
      this.contract = new web3.eth.Contract(MegaNBOTMeta.abi, addr)
      this.nbotContract = new web3.eth.Contract(NBOTMeta.abi, nbotAddr)
      this.nbotAddress = nbotAddr
      this.deployed = true

      this.fetchOwner()
      this.fetchDrawingInterval()
      this.fetchWinningAmount()
      this.fetchLastDrawingBlockNumber()
      this.fetchPreviousWinner()
      this.fetchCurrentTempWinner()
    }
  }

  @action
  fetchOwner = async () => {
    if (!this.contract) return

    try {
      const res = await this.contract.methods.owner().call()
      this.owner = res
    } catch (err) {
      logger.error(`Error fetching owner: ${err.message}`)
    }
  }

  @action
  fetchDrawingInterval = async () => {
    if (!this.contract) return

    try {
      const res = await this.contract.methods.drawingInterval().call()
      this.drawingInterval = res.toString()
    } catch (err) {
      logger.error(`Error fetching withdrawInterval: ${err.message}`)
    }
  }

  @action
  fetchWinningAmount = async () => {
    if (!this.contract) return

    try {
      const res = await this.contract.methods.winningAmount().call()
      this.winningAmount = this.toNBOTStr(res)
    } catch (err) {
      logger.error(`Error fetching winningAmount: ${err.message}`)
    }
  }

  @action
  fetchLastDrawingBlockNumber = async () => {
    if (!this.contract) return

    try {
      const res = await this.contract.methods.lastDrawingBlockNum().call()
      this.lastDrawingBlockNumber = res.toString()
    } catch (err) {
      logger.error(`Error fetching lastDrawingBlockNumber: ${err.message}`)
    }
  }

  @action
  fetchPreviousWinner = async () => {
    if (!this.contract) return

    try {
      const res = await this.contract.methods.previousWinner().call()
      this.previousWinner = res
    } catch (err) {
      logger.error(`Error fetching previousWinner: ${err.message}`)
    }
  }

  @action
  fetchCurrentTempWinner = async () => {
    if (!this.contract) return

    try {
      const res = await this.contract.methods.currentTempWinner().call()
      this.currentTempWinner = res
    } catch (err) {
      logger.error(`Error fetching currentTempWinner: ${err.message}`)
    }
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
    const { network } = this.appStore.walletStore
    if (!window.naka || !network) return

    const { exchangeRate } = this.appStore.tokenExchangeStore
    const address = getContractAddress(MegaNBOTMeta)
    const contract = window.naka.eth.contract(MegaNBOTMeta.abi).at(address)
    if (contract) {
      contract.enterDrawing({
        token: this.nbotAddress,
        exchanger: this.owner,
        exchangeRate,
      }, (err, res) => {
        if (err) {
          logger.error(`Error enterDrawing: ${err.message}`)
          return
        }

        logger.info(`txid: ${res}`)
      })
    }
  }
}
