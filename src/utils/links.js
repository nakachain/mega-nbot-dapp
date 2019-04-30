import Constants from '../constants'
import Config from '../config'

const { NETWORK } = Constants
const { LINKS } = Config

export const getExplorerLink = (network) => {
  switch (network) {
    case NETWORK.MAINNET: return LINKS.EXPLORER_MAINNET
    case NETWORK.TESTNET: return LINKS.EXPLORER_TESTNET
    default: return ''
  }
}

export const getExplorerAddressLink = (network, address) => {
  switch (network) {
    case NETWORK.MAINNET: return `${LINKS.EXPLORER_MAINNET}/address/${address}`
    case NETWORK.TESTNET: return `${LINKS.EXPLORER_TESTNET}/address/${address}`
    default: return ''
  }
}

export const getDocumentationLink = () => LINKS.DOCUMENTATION

export const getNakaWalletChromeLink = () => LINKS.NAKA_WALLET_CHROME
