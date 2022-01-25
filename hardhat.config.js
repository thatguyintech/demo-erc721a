/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require('dotenv').config();

module.exports = {
  networks: {
    rinkeby: {
      url: process.env.ALCHEMY_URL,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  solidity: "0.8.6",
  paths: {
    sources: "./src",
    tests: "./test",
    artifacts: "./artifacts"
  },
}