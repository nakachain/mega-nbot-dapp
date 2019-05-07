const axios = require('axios')
const logger = require('../utils/logger')
const { NETWORK: { MAINNET, TESTNET } } = require('../constants')
const { LINKS: { TESTNET_EXPLORER_API_HOST, MAINNET_EXPLORER_API_HOST } } = require('../config')

class ExplorerAPIs {
  constructor({ type }) {
    this.setBaseUrl({ type })
  }

  setBaseUrl({ type }) {
    if (type === MAINNET) {
      this.baseUrl = MAINNET_EXPLORER_API_HOST;
    } else if (type === TESTNET) {
      this.baseUrl = TESTNET_EXPLORER_API_HOST;
    }
  }

  async getLogs(fromBlock, toBlock, address, topic0) {
    if (!this.baseUrl) {
      return {
        result: [],
      }
    }
    let url = `${this.baseUrl}&module=logs&action=getLogs&fromBlock=${fromBlock}&toBlock=${toBlock}&address=${address}`
    if (topic0) {
      url += `&topic0=${topic0}`
    }
    console.log(url)
    try {
      const { data } = await axios.get(url)
      return data
    } catch (error) {
      logger.error(`error fetch tokentx: ${error}`)
    }
    return undefined
  }
}

module.exports = ExplorerAPIs
