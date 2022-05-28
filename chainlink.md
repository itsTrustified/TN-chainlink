## Chainlink : We have used Chainlink 1) Price Feed 2) Chainlink VRF

https://github.com/Trustified-Network/TN-chainlink/blob/master/src/modal/CreateInvoiceModal.js

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
