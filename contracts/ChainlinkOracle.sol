// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract ChainlinkOracle {
    AggregatorV3Interface internal priceFeed;

    constructor(address dataFeed) {
        //ETH / USD

        priceFeed = AggregatorV3Interface(
            dataFeed //BTC / USD
        );
    }

    function getLatestPrice() public view returns (int) {
        (
            uint80 roundId,
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();

        return price / 1e8;
    }
}

// interface AggregatorV3Interface {
//     function latestRoundData()
//         external
//         view
//         returns (
//             uint80 roundId,
//             int answer,
//             uint startedAt,
//             uint updatedAt,
//             uint80 answeredInRound
//         );
// }
