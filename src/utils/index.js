import { NETWORK } from '../constants'

export const getContractAddress = (network, metadata) => {
  if (network === NETWORK.MAINNET) return metadata.mainnet;
  if (network === NETWORK.TESTNET) return metadata.testnet;
  return undefined;
}
