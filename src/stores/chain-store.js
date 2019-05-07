/* eslint-disable */
import { observable, action, reaction } from 'mobx'
import Web3 from 'web3'
import logger from '../utils/logger'
import ExplorerAPIs from '../utils/explorerAPIs'
import { URL, STORAGE_KEY } from '../config'
import { NETWORK } from '../constants'
import abi from '../contracts/mega-nbot'
export default class ChainStore {
  @observable selectedNetwork = undefined
  @observable web3 = undefined
  @observable blockNumber = undefined
  @observable explorerAPIs = undefined
  newBlockHeadersSubscription = undefined
  constructor(appStore) {
    this.appStore = appStore

    reaction(
      () => this.selectedNetwork,
      () => {
        this.unsubscribeToBlockHeaders()
        this.setWeb3()
        this.subscribeToBlockHeaders()
      },
    )

    reaction(
      () => this.blockNumber,
      async () => {
        console.log('block changes')
        const data = await this.explorerAPIs.getLogs(0, 'latest', '0x0d04564444df4e52832f185aab2a019f69c72fb4', "0x686a25b238841254ec7d1d7788183f5cd09a2b80ea78993c598e123768914fba")
        console.log(this.appStore.megaNbotStore.contract.jsonInterface)
        console.log("TCL: ChainStore -> constructor -> data", data)
        console.log(abi.abi)
        const eventJsonInterface = _.find(
          abi.abi,
          o => o.name === "EntrySubmitted" && o.type === 'event',
        )
        console.log(eventJsonInterface)


				console.log("TCL: ChainStore -> constructor -> data.result[0].data", typeof data.result[0].data)
				console.log("TCL: ChainStore -> constructor -> data.result[0].topics", data.result[0].topics.slice(1))
        console.log(this.web3.eth.abi.decodeLog(eventJsonInterface.inputs, data.result[0].data,data.result[0].topics.slice(1) ))
      }
    )
  }

  @action
  init = () => {
    // Try to load selected network from storage
    const storedNetwork = localStorage.getItem(STORAGE_KEY.NETWORK)
    this.explorerAPIs = new ExplorerAPIs({ type: storedNetwork || NETWORK.TESTNET })
    if (storedNetwork) {
      this.selectedNetwork = storedNetwork
    } else {
      this.setSelectedNetwork(NETWORK.TESTNET)
    }
  }

  @action
  setSelectedNetwork = (network) => {
    this.selectedNetwork = network
    this.explorerAPIs.setBaseUrl({ type: network })
    localStorage.setItem(STORAGE_KEY.NETWORK, network)
  }

  @action
  unsubscribeToBlockHeaders = () => {
    if (!this.newBlockHeadersSubscription) return

    this.newBlockHeadersSubscription.unsubscribe((err, res) => {
      if (err) {
        logger.error(`Error unsubscribing newBlockHeaders: ${err.message}`)
        return
      }
      logger.info(`Unsubscribed newBlockHeaders: ${res}`)
    })
  }

  @action
  subscribeToBlockHeaders = () => {
    if (!this.web3) return

    this.newBlockHeadersSubscription = this.web3.eth.subscribe(
      'newBlockHeaders',
      (err, res) => {
        if (err) {
          logger.error(`Error subscribing newBlockHeaders: ${err.message}`)
          return
        }
        logger.info(`Subscribed newBlockHeaders: ${res}`)
      },
    ).on('data', (blockHeader) => {
      this.blockNumber = blockHeader.number
    })
  }

  @action
  setWeb3 = () => {
    if (this.selectedNetwork === NETWORK.MAINNET) {
      this.web3 = new Web3(URL.RPC_WS_MAINNET)
    } else if (this.selectedNetwork === NETWORK.TESTNET) {
      this.web3 = new Web3(URL.RPC_WS_TESTNET)
      const a = this.web3.eth.abi.decodeLog([{
        type: 'string',
        name: 'myString'
      },{
          type: 'uint256',
          name: 'myNumber',
          indexed: true
      },{
          type: 'uint8',
          name: 'mySmallNumber',
          indexed: true
      }],
      '0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000748656c6c6f252100000000000000000000000000000000000000000000000000',
      ['0x000000000000000000000000000000000000000000000000000000000000f310', '0x0000000000000000000000000000000000000000000000000000000000000010']);
			console.log("TCL: ChainStore -> a", a)
    }
  }
}
