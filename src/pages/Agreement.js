import { Card } from "@mui/material";
import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { ethers } from "ethers";
import React, { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { toast } from "react-toastify";
import TableView from "src/components/agreements/TableView";
import Iconify from "src/components/Iconify";
import { Web3Context } from "src/context/Web3Context";
import { NotificationContext } from "src/context/Notification";
import { AgreementContractAbi, biconomyAddress } from "src/contracts/config";
import CreateAgreementModal from "src/modal/CreateAgreementModal";
import Page from "../components/Page";
import Web3 from "web3"; 
import { AgreementAddress ,AgreementBscAddress,AgreementMumbaiAddress,AgreementRopestenAddress,AgreementAvaxAddress} from "src/contracts/contract";
import HorizontalLinearStepper from "src/modal/AgreementStepper";
  

function Agreement() {
  const { Moralis, account, user } = useMoralis();
  const web3Context = React.useContext(Web3Context);
  const { connectWallet, web3Auth, address } = web3Context;

  const notificationContext = React.useContext(NotificationContext);
  const { sendNotifications } = notificationContext;

  const [status, setStatus] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [contract, setContract] = React.useState();
  const [isUpdate, setIsUpdate] = React.useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setStatus(event.target.value);
  };


  const createAgreement = async (data) => { 
    let contractAddresss ;
     if(data.chain == "Binance"){
      contractAddresss = AgreementBscAddress;
     } else if(data.chain == "Polygon"){
      contractAddresss =AgreementMumbaiAddress;
     } else if(data.chain == "Ropsten"){
      contractAddresss =AgreementRopestenAddress;
     } else if(data.chain == "Boba") {
      contractAddresss = AgreementAddress;
     } else if(data.chain == "Avax") {
      contractAddresss = AgreementAvaxAddress;
     }
 

    setLoading(true);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const agreementContract = new ethers.Contract(
      contractAddresss,
      AgreementContractAbi,
      signer
    );

    let txn;

    try {
      const formattedPrice = ethers.utils.parseEther(data.price.toString());
      txn = await agreementContract.agreementCreate(
        data.buyerAddress,
        data.sellerAddress,
        formattedPrice,
        data.stakePercentBuyer.toString(),
        data.stakePercentSeller.toString(),
        data.title,
        data.description
      );
      await txn.wait();

      await sendNotifications({
        to: user.attributes.ethAddress,
        message: `You Create ${data.title} Agreement Successfully! on ${data.chain} Network`,
      })
      console.log(txn, "transaction");
      toast.success("success");
      setLoading(false);
      handleClose();
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error("error");
    }
  };

  return (
    <Page title="Agreement |  Trustified Network">
      {/* <CreateAgreementModal
        submitForm={createAgreement}
        open={handleClickOpen}
        close={handleClose}
        op={open}
        acc={user && user.attributes.ethAddress}
        loading={loading}
      /> */} 
      
      <Container pl={0} pr={0}>
      
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Typography variant="h4" gutterBottom>
            Agreements
          </Typography>
          {/* <Button
            variant="contained"
            onClick={handleClickOpen}
            to="#"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Create Agreement
          </Button> */}
          <HorizontalLinearStepper/>
        </Stack> 

        <Stack sx={{ marginTop: '30px' }}>
          <Card>
            <TableView currentAccount={user && user.attributes.ethAddress} />
          </Card>
        </Stack> 
      </Container> 
    </Page>
  );
}

export default Agreement;