import Constants from '../constants'

const { NETWORK: { MAINNET, TESTNET } } = Constants

export const getContractAddress = (network, metadata) => {
  if (network === MAINNET) return metadata.mainnet;
  if (network === TESTNET) return metadata.testnet;
  return undefined;
}
