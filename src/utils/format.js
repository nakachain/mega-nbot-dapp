import { toBN } from 'web3-utils'

export const formatNumberResponse = (response, format) => {
  if (!format) return response

  const { symbol, decimals } = format
  const formatted = toBN(response.toString(10))
    .div(toBN(10).pow(toBN(decimals)))
    .toString()
  return `${formatted} ${symbol}`
}

export const toLowestDenom = (num, decimals) => {
  if (!decimals) return num

  return toBN(num).mul(toBN(10).pow(toBN(decimals))).toString(10)
}
