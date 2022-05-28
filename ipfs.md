## IPFS/Filecoin : We are Using Web3.Storage, to permanently store all the details of user invoices and subscription services.

```javascript

import { Web3Storage } from "web3.storage";

function getAccessToken() { 
    return process.env.REACT_APP_WEB3_STORAGE_API_KEY;
}

function makeStorageClient() {
    return new Web3Storage({ token: getAccessToken() });
  }

  function makeFileObjects(data) {  
    const blob = new Blob([JSON.stringify(data)], {
      type: "application/json",
    });

    const files = [new File([blob], "Invoice_Details.json")];
    return files;
  } 

```
