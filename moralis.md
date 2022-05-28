## Moralis: We have used Moralis for:

**Walletconnect with Moralis to enable users to connect with their wallet and access the dashboard**

https://github.com/Trustified-Network/TN-chainlink/blob/master/src/context/Web3Modal.js

```javascript

  const { authenticate, user, isAuthenticated, enableWeb3 } = useMoralis();

  const connectWallet = async () => {
    try {
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      const accounts = await library.listAccounts();
      const network = await library.getNetwork();
      setProvider(provider);
      await authenticate();
      await enableWeb3({ provider: provider });
      setLibrary(library);
      if (accounts) setAccount(accounts[0]);
      setChainId(network.chainId);
      if (accounts) navigate("/dashboard/app");
    } catch (error) {
      setError(error);
    }
  };
  
    {user == null ? (
            <Button onClick={() => authenticate()}>Connect</Button>
          ) : (
            <p style={{ color: "black", textOverflow: "ellipsis" }}>
              {user && user.attributes.username}
            </p>
     )}
  
```

**Moralis cloud function: To store data of user messages, product services details, user profiles details in Moralis Database**

```javascript

const { fetch, data, error, isLoading } = useMoralisCloudFunction(
    "getProducts",
    { autoFetch: true }
  );

  async function setData() {
    setLoading(true);
     const product = await JSON.parse(JSON.stringify(data));
     setProd(product); 
  }
  
  const { data, error, isLoading } = useMoralisCloudFunction("getAllUser");
  useEffect(() => {
    const fetchedContent = JSON.parse(JSON.stringify(data));
    setAllUsers(fetchedContent);
    if (error) {
      toast.error(error.message);
    }
  }, [data, error, isLoading]); 

```

**Moralis Covalent Plugin to showcase different statistics data in our Dashboard.**

https://github.com/Trustified-Network/TN-chainlink/blob/master/src/sections/%40dashboard/app/AppNewUsers.js

```javascript

  const { Moralis, user } = useMoralis();
  const [agree, setAgree] = useState();

  useEffect(async () => { 
    const networkId = window.ethereum.networkVersion; 
    const data = await Moralis.Plugins.covalent?.getTransactionsForAddress({
        chainId: networkId,
        address: user && user.attributes.ethAddress,

       }); 
       setAgree(data.data.items.length); 
  }, []);

```
