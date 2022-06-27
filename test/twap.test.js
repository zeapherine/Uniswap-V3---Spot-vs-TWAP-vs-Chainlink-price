const { getPrice } = require("../scripts/uniswapSpotPrice")
const { expect } = require("chai")
const { ethers } = require("hardhat")

const FACTORY = "0x1F98431c8aD98523631AE4a59f267346ea31F984"
// USDC
const TOKEN_0 = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"
const DECIMALS_0 = 6n
// WBTC
const TOKEN_1 = "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6"
const DECIMALS_1 = 18n
// 0.3%
const FEE = 3000

const BTC_USD_chainlink = "0xc907E116054Ad103354f2D350FD2514433D57F6f"

describe("Price Comaprison", () => {
  it("get price", async () => {
    const UniswapV3Twap = await ethers.getContractFactory("UniswapV3Twap")

    const twap = await UniswapV3Twap.deploy(FACTORY, TOKEN_0, TOKEN_1, FEE, {
      gasLimit: 3000000,
    })

    await twap.deployed()

    const priceTWAP = await twap.estimateAmountOut(
      TOKEN_1,
      ethers.utils.parseUnits("1", 8),
      10,
      {
        gasLimit: 300000,
      }
    )

    const ChainlinkOracle = await ethers.getContractFactory("ChainlinkOracle")

    const chainlinkPriceFeed = await ChainlinkOracle.deploy(BTC_USD_chainlink, {
      gasLimit: 3000000,
    })

    await chainlinkPriceFeed.deployed()

    const chainLinkPrice = await chainlinkPriceFeed.getLatestPrice()

    console.log("======== Uniswap V3 TWAP =========")
    console.log(`1 WBTC can be swapped for price of : ${priceTWAP / 10 ** 6}`)

    console.log("------------ X ------------")

    console.log("======== Uniswap V3 spot price =========")
    await getPrice(1)

    console.log("------------ X ------------")

    console.log("====== Chainlink Price Feed ======= ")
    console.log(`1 BTC is equal to ${chainLinkPrice} USD`)
  })
})
