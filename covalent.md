## Dashboard of Trustified is built by Covalent integration which includes:

**Fetch all the Escrow agreements active at a particular address (getLogEventsByContractAddress)**

https://github.com/Trustified-Network/TN-chainlink/blob/master/src/sections/%40dashboard/app/AppTotalAgreement.js

```javascript

  useEffect(async () => {

    const networkId = window.ethereum.networkVersion; 
      let contractAddresss;
      if (networkId == 97) {
        contractAddresss = AgreementBscAddress;
      } else if (networkId == 80001) {
        contractAddresss = AgreementMumbaiAddress;
      } else if (networkId == 3) {
        contractAddresss = AgreementRopestenAddress;
      } else if (networkId == 28) {
        contractAddresss = AgreementAddress;
      }  else if (networkId == 43113) {
        contractAddresss = AgreementAvaxAddress;
      } 

      const pBlock = "26456572";
      const aBlock ="";
      const rBlock = "";
      const bBlock = "";

    const logs = await Moralis.Plugins.covalent?.getLogEventsByContractAddress({
      chainId: networkId,
      contractAddress: contractAddresss,
      startingBlock:  networkId == 80001 && pBlock  || networkId == 3 && rBlock  || networkId == 97 && bBlock  || networkId == 43113 && aBlock ,
      endingBlock: networkId == 80001 && pBlock  || networkId == 3 && rBlock  || networkId == 97 && bBlock  || networkId == 43113 && aBlock ,
    }); 
       setAgree(logs.data.items.length); 
  }, []);

```

**Usied covalent check ERC20 token balances of the address**

https://github.com/Trustified-Network/TN-chainlink/blob/master/src/sections/%40dashboard/app/AppItemOrders.js

```javascript

useEffect(async()=>{  
    const data = await Moralis.Plugins.covalent?.getTokenBalancesForAddress({
        chainId: networkId,
        address: user && user.attributes.ethAddress,

       }); 
       console.log(data,"balance");
       setAgree(ethers.utils.formatUnits(data.data.items[0].balance, 18));  
  },[]);

```

**Get all the transactions done by the user address (fetching TransactionsForAddress)**

https://github.com/Trustified-Network/TN-chainlink/blob/master/src/sections/%40dashboard/app/AppNewUsers.js

```javascript

  useEffect(async () => {

    const networkId = window.ethereum.networkVersion; 
    const data = await Moralis.Plugins.covalent?.getTransactionsForAddress({
        chainId: networkId,
        address: user && user.attributes.ethAddress,

       }); 
       setAgree(data.data.items.length); 
  }, []);

```
