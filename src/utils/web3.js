import Config from '../config'
import Constants from '../constants'

const { CHAIN_ID } = Config
const { NETWORK } = Constants

export const getAccount = (callback) => {
  const { naka } = window
  if (naka) {
    naka.eth.getAccounts((err, accounts) => {
      if (err) {
        console.error(`Error getting NakaWallet accounts: ${err.message}`)
        callback()
      }

      const acct = accounts[0]
      if (acct) {
        console.log(`Found NakaWallet account: ${acct}`)
        callback(acct)
      }
    })
  } else {
    callback()
  }
}

export const getNetwork = (callback) => {
  const { naka } = window
  if (naka) {
    naka.version.getNetwork((err, network) => {
      if (err) {
        console.error(`Error getting NakaWallet network: ${err.message}`)
        callback()
      }

      if (network === CHAIN_ID.MAINNET) {
        callback(NETWORK.MAINNET)
      } else if (network === CHAIN_ID.TESTNET) {
        callback(NETWORK.TESTNET)
      }
    })
  } else {
    callback()
  }
}
