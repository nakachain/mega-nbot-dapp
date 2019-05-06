const axios = require('axios')
const logger = require('../utils/logger')
const { MAINNET, TESTNET } = require('../constants')
const { TESTNET_EXPLORER_API_HOST, MAINNET_EXPLORER_API_HOST } = require('../config')

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

  async tokentx(accountAddr, selectedTokenAddress) {
    if (!this.baseUrl) {
      return {
        result: [],
      }
    }
    const url = `${this.baseUrl}&module=account&action=tokentx&address=${accountAddr}&contractaddress=${selectedTokenAddress}`
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
