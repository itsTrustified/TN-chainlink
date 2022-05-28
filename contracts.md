
# Deploy Smart contracts on BSC chain, Polygon mumbai, Avalanche, and Ropsten 

https://github.com/Trustified-Network/TN-chainlink/blob/master/hardhat.config.js

```javascript
require("dotenv").config({ path: "./.env" });
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

const privateKey = process.env.REACT_APP_PRIVATE_KEY;
const projectId = process.env.REACT_APP_ROPSTEN_KEY; 


module.exports = {
  networks: { 
    matic:{
      url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_KEY}`,
      accounts:[privateKey],
      gas: 2100000,
      gasPrice: 8000000000
    }, 
    ropsten:{
      url:`https://ropsten.infura.io/v3/${projectId}`,
      accounts:[privateKey],
      gas: 2100000,
      gasPrice: 8000000000
    },
    bsc: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      gasPrice: 20000000000,
      accounts:[privateKey]
    },
    avalancheTest: {
      url: 'https://api.avax-test.network/ext/bc/C/rpc',
      gasPrice: 225000000000,
      chainId: 43113,
      accounts:[privateKey],
    },
  },

  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};


```

# contract Address

**Polygon Address** : 0xA3d54Ebb4cDeDb9C35d53a119fce7D707E2853F0

**BSC Address** : 0x85B6eE037A8E183C502E8Ff17FcC069dd4D5712E

**Avalanche Address** : 0x85B6eE037A8E183C502E8Ff17FcC069dd4D5712E

**Ropsten Address** : 0x85B6eE037A8E183C502E8Ff17FcC069dd4D5712E
