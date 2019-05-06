const NAKABASE_URL = 'https://base.nakachain.org'

export const STORAGE_KEY = {
  LANGUAGE: 'language',
  NETWORK: 'network',
}

export const CHAIN_ID = {
  MAINNET: '2019',
  TESTNET: '2018',
}

export const URL = {
  RPC_WS_MAINNET: 'wss://api.nakachain.org/ws',
  RPC_WS_TESTNET: 'wss://testnet.api.nakachain.org/ws',
}

export const LINKS = {
  EXPLORER_MAINNET: 'https://explorer.nakachain.org',
  EXPLORER_TESTNET: 'https://testnet.explorer.nakachain.org',
  DOCUMENTATION: 'https://docs.nakachain.org',
  NAKA_WALLET_CHROME: 'https://chrome.google.com/webstore/detail/naka-wallet/leopeeejkinfegnjkhpmpkaddnicjlll',
  NAKA_WALLET_APP_STORE: 'https://itunes.apple.com/us/app/naka-wallet/id1448562757',
  NAKA_WALLET_PLAY_STORE: 'https://play.google.com/store/apps/details?id=com.nakachain.wallet',
  TESTNET_EXPLORER_API_HOST: `${NAKABASE_URL}/testnet/explorer?apikey=${process.env.APIKEY}`,
  MAINNET_EXPLORER_API_HOST: `${NAKABASE_URL}/mainnet/explorer?apikey=${process.env.APIKEY}`,
}

export const TOKEN = {
  NBOT: {
    symbol: 'NBOT',
    decimals: 8,
    mainnet: '0x1a4f4787d4e2382c3d2259ccdf587cc11b3ba7d9',
    testnet: '0x809388c8770c578cb87df1d1e84e3436d8156fda',
  },
}

export const INTERVAL = {
  BLOCK_TIME: 3000,
}
