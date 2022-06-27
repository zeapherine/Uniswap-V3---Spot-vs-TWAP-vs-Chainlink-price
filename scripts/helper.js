const { default: axios } = require("axios")

require("dotenv").config()

const POLYSCAN_API_KEY = process.env.POLYSCAN_API_KEY

exports.getAbi = async (address) => {
  const url = `https://api.polygonscan.com/api?module=contract&action=getabi&address=${address}&apikey=${POLYSCAN_API_KEY}`
  const res = await axios.get(url)
  const abi = JSON.parse(res.data.result)

  return abi
}

exports.getPoolImmutables = async (poolContract) => {
  const [token0, token1, fee] = await Promise.all([
    poolContract.token0(),
    poolContract.token1(),
    poolContract.fee(),
  ])

  const immutables = {
    token0,
    token1,
    fee,
  }

  return immutables
}
