import { observable, action, reaction, computed } from 'mobx'
import BN from 'bn.js'
import { isUndefined } from 'lodash'
import prettyMs from 'pretty-ms'
import MegaNBOTMeta from '../contracts/mega-nbot'
import logger from '../utils/logger'
import { getContractAddress } from '../utils'
import { formatNumberResponse } from '../utils/format'
import { TOKEN, INTERVAL } from '../config'

const { NBOT } = TOKEN
const { BLOCK_TIME } = INTERVAL

const DEFAULT_VALUES = {
  contract: undefined,
  owner: undefined,
  winningAmount: undefined,
  drawingInterval: undefined,
  lastDrawingBlockNumber: undefined,
  blocksLeft: undefined,
  timeLeft: undefined,
  previousWinner: undefined,
  currentTempWinner: undefined,
  noWalletDialogVisible: false,
  wrongNetworkDialogVisible: false,
}

export default class MegaNBOTStore {
  contract = undefined
  @observable owner = undefined
  @observable winningAmount = undefined
  drawingInterval = undefined
  lastDrawingBlockNumber = undefined
  @observable blocksLeft = undefined
  @observable timeLeft = undefined
  @observable previousWinner = undefined
  @observable currentTempWinner = undefined
  @observable noWalletDialogVisible = false
  @observable wrongNetworkDialogVisible = false

  constructor(appStore) {
    this.appStore = appStore

    reaction(
      () => this.appStore.chainStore.web3,
      () => this.init(),
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
    const {
      nbotStore: { address: nbotAddress, owner: nbotOwner },
      tokenExchangeStore: { exchangeRate },
    } = this.appStore

    return isUndefined(this.blocksLeft)
      || isUndefined(nbotAddress)
      || isUndefined(nbotOwner)
      || isUndefined(exchangeRate)
  }

  toNBOTStr = amount => formatNumberResponse(amount, {
    symbol: NBOT.symbol,
    decimals: NBOT.decimals,
  })

  @action
  init = () => {
    // Reset
    Object.assign(this, DEFAULT_VALUES)

    const { selectedNetwork, web3 } = this.appStore.chainStore
    const addr = getContractAddress(selectedNetwork, MegaNBOTMeta)
    if (addr) {
      this.contract = new web3.eth.Contract(MegaNBOTMeta.abi, addr)
      this.fetchOwner()
      this.fetchDrawingInterval()
      this.fetchWinningAmount()
      this.fetchLastDrawingBlockNumber()
      this.fetchPreviousWinner()
      this.fetchCurrentTempWinner()
    }
  }

  @action
  showNoWalletDialog = () => {
    this.noWalletDialogVisible = true
  }

  @action
  hideNoWalletDialog = () => {
    this.noWalletDialogVisible = false
  }

  @action
  showWrongNetworkDialog = () => {
    this.wrongNetworkDialogVisible = true
  }

  @action
  hideWrongNetworkDialog = () => {
    this.wrongNetworkDialogVisible = false
  }

  @action
  fetchOwner = async () => {
    if (!this.contract) return

    try {
      const res = await this.contract.methods.owner().call()
      this.owner = res
    } catch (err) {
      logger.error(`MegaNBOT.owner(): ${err.message}`)
    }
  }

  @action
  fetchDrawingInterval = async () => {
    if (!this.contract) return

    try {
      const res = await this.contract.methods.drawingInterval().call()
      this.drawingInterval = res.toString()
    } catch (err) {
      logger.error(`MegaNBOT.withdrawInterval(): ${err.message}`)
    }
  }

  @action
  fetchWinningAmount = async () => {
    if (!this.contract) return

    try {
      const res = await this.contract.methods.winningAmount().call()
      this.winningAmount = this.toNBOTStr(res)
    } catch (err) {
      logger.error(`MegaNBOT.winningAmount(): ${err.message}`)
    }
  }

  @action
  fetchLastDrawingBlockNumber = async () => {
    if (!this.contract) return

    try {
      const res = await this.contract.methods.lastDrawingBlockNum().call()
      this.lastDrawingBlockNumber = res.toString()
    } catch (err) {
      logger.error(`MegaNBOT.lastDrawingBlockNumber(): ${err.message}`)
    }
  }

  @action
  fetchPreviousWinner = async () => {
    if (!this.contract) return

    try {
      const res = await this.contract.methods.previousWinner().call()
      this.previousWinner = res.toLowerCase()
    } catch (err) {
      logger.error(`MegaNBOT.previousWinner(): ${err.message}`)
    }
  }

  @action
  fetchCurrentTempWinner = async () => {
    if (!this.contract) return

    try {
      const res = await this.contract.methods.currentTempWinner().call()
      this.currentTempWinner = res.toLowerCase()
    } catch (err) {
      logger.error(`MegaNBOT.currentTempWinner(): ${err.message}`)
    }
  }

  @action
  calculateBlocksLeft = () => {
    if (this.appStore.chainStore.blockNumber
      && this.drawingInterval
      && this.lastDrawingBlockNumber) {
      const blocksSinceLastDraw = new BN(this.appStore.chainStore.blockNumber)
        .sub(new BN(this.lastDrawingBlockNumber))

      if (blocksSinceLastDraw.gte(new BN(this.drawingInterval))) {
        console.log('ready')
        this.blocksLeft = '0'
        this.timeLeft = prettyMs(0)
      } else {
        console.log('not ready')
        const blocksRemaining = new BN(this.drawingInterval)
          .sub(blocksSinceLastDraw)
        this.blocksLeft = blocksRemaining.toString()
        this.timeLeft = prettyMs(blocksRemaining.toNumber() * BLOCK_TIME)
      }
    }
  }

  enterDrawing = () => {
    const {
      walletStore: { network },
      nbotStore: { address: nbotAddress, owner: nbotOwner },
      tokenExchangeStore: { exchangeRate },
    } = this.appStore

    if (
      !window.naka
      || !network
      || !nbotAddress
      || !nbotOwner
      || !exchangeRate
    ) return

    const address = getContractAddress(network, MegaNBOTMeta)
    const contract = window.naka.eth.contract(MegaNBOTMeta.abi).at(address)
    if (contract) {
      contract.enterDrawing({
        token: nbotAddress,
        exchanger: nbotOwner,
        exchangeRate,
      }, (err, res) => {
        if (err) {
          logger.error(`Error MegaNBOT.enterDrawing(): ${err.message}`)
          return
        }

        logger.info(`txid: ${res}`)
      })
    } else {
      logger.error('MegaNBOT contract not valid')
    }
  }
}
