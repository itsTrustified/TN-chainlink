## Trustified Network is a platform to Sell Digital Services Globally and Accept Crypto Payments without paying Hefty Commissions.

## Inspiration

“Trust” is a key factor for successful transactions between parties. To ensure trust, we involve third party freelancing platforms or middlemen and pay hefty commissions which highly affect the overall profit margins of parties involved in a transaction.

## What it does

Trustified.network is a smart contract assured Escrow Agreement and Payment platform which helps individuals and businesses to grow globally and increase profit margins in four simple steps:

1) List Products, Services, or subscription packages.
2) Create Escrow agreements with personalized terms as per customers.
3) Send/Receive crypto payments in a reliable and secure way without paying hefty commissions to third parties.  


# Bounty Integration
# deploy contract on BSC chain , Polygon, Avalanche, Ropsten 

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

**Chainlink** : We have used Chainlink 1) Price Feed 2) Chainlink VRF
```javascript

 window.ethereum.enable();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const priceFeed = new ethers.Contract(
    chainLinkPriceFeed,
    chainlinkABI,
    signer
  );
  const randomNumberCon = new ethers.Contract(
    RandomNumberGeneratorContract,
    chainlinkVRFABI.abi,
    signer
  );

 await randomNumberCon.getRandomNumber(1000);
        const randNo = await randomNumberCon.getRandom();
        setLoading(true);
        const formData = {
          invoiceNumber: parseInt(randNo._hex, 16),
          created: values.cdate,
          dueDate: values.ddate,
          description: values.description,
          quantity: values.quantity,
          price: values.price,
          token: selectedToken,
          network: values.network,
          name: values.name,
          address: values.address,
          taxName: values.taxName,
          taxPercentage: values.taxPercentage,
          note: values.note,
        };
        const files = makeFileObjects(formData);
        await storage(files, formData);

```

# Homepage
![Screenshot 2022-05-28 at 12 28 50 AM](https://user-images.githubusercontent.com/45895007/170774584-6ddd4ecb-f1e0-4103-b022-e1adb94be905.png)

# Escrow Agreement
![Screenshot 2022-05-28 at 12 30 00 AM](https://user-images.githubusercontent.com/45895007/170774870-0ec06af6-4150-43b5-a5d9-814f3e4210c9.png)


# Login With Unstoppable, coinbase wallet, Wallet connect , Metamask

![Screenshot 2022-05-28 at 12 29 01 AM](https://user-images.githubusercontent.com/45895007/170774631-59dc2814-f714-43b6-a550-a89e6e5df00a.png)

# Create Agreement
![Screenshot 2022-05-28 at 12 30 13 AM](https://user-images.githubusercontent.com/45895007/170774944-b6ddb39e-53b9-4e95-94f3-ca02798597a2.png)

# Crypto Payment
![Screenshot 2022-05-28 at 12 30 28 AM](https://user-images.githubusercontent.com/45895007/170775002-053d46c7-5c39-4e1a-8e1d-602b2b9eff22.png)

# EPNS Notifications 
![Screenshot 2022-05-28 at 12 30 49 AM](https://user-images.githubusercontent.com/45895007/170775071-f950d9b0-abd0-432f-9ae1-ad2d2b514e3a.png)

# Invoice 
![Screenshot 2022-05-28 at 12 31 01 AM](https://user-images.githubusercontent.com/45895007/170775157-11b1fe6c-14b9-473c-951b-1954dea88038.png)

# Invoice Details

![Screenshot 2022-05-28 at 12 39 53 AM](https://user-images.githubusercontent.com/45895007/170775400-28b37072-db89-4ffb-be90-aaf1860db732.png)








