import { observable, action, reaction, computed } from 'mobx'
import BN from 'bn.js'
import { isUndefined, each } from 'lodash'
import prettyMs from 'pretty-ms'
import MegaNBOTMeta from '../contracts/mega-nbot'
import NBOTMeta from '../contracts/nbot'
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
  @observable winners = []

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
        this.calculateBlocksLeft()
        this.fetchUserWonEvents()
      },
    )
  }

  @computed get drawButtonDisabled() {
    return isUndefined(this.blocksLeft)
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
      this.fetchUserWonEvents()
    }
  }

  @action
  fetchDrawingInterval = () => {
    if (!this.contract) return
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
    if (!this.contract) return
    this.contract.winningAmount((err, res) => {
      if (err) {
        console.error('Error fetching winningAmount.', err)
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
        console.error('Error fetching lastDrawingBlockNumber.', err)
        return
      }

      this.lastDrawingBlockNumber = res.toString()
    })
  }

  @action
  fetchUserWonEvents = () => {
    if (!this.contract) return
    this.contract.UserWon({}, { fromBlock: 0, toBlock: 'latest' })
      .get((err, res) => {
        if (err) {
          console.error('Error fetching UserWon events:', err)
          return
        }

        const winners = []
        each(res, (event) => {
          const { args: { winner, amount } } = event
          winners.push({
            address: winner,
            amount: this.toNBOTStr(amount.toString()),
          })
        })
        this.winners = winners
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
    this.contract.enterDrawingFromSender((err, res) => {
      if (err) {
        console.error('Error enterDrawingFromSender.', err)
        return
      }

      console.log(res)
    })
  }

  toNBOTStr = amount => formatNumberResponse(amount, {
    symbol: NBOT.symbol,
    decimals: NBOT.decimals,
  })
}
