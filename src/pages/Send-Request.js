import { Card, TableBody } from "@mui/material";
import {
  Button,
  Container,
  Stack,
  Box,
  Typography,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useMoralis, useMoralisCloudFunction, useMoralisWeb3Api } from "react-moralis";
import { toast } from "react-toastify";
import Iconify from "src/components/Iconify";
import { Web3Context } from "src/context/Web3Context";
import { factoryAbi, factoryAddress } from "src/contracts/contract";
import CreatePaymentModal from "src/modal/CreatePaymentModal";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import Page from "../components/Page";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SendTable from "src/components/payments/SendTable";
import RequestTable from "src/components/payments/RequestTable";
import Web3 from "web3";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

function SendRequest() {
  const { Moralis, account, user } = useMoralis();
  const Web3Api = useMoralisWeb3Api();
  const web3Context = React.useContext(Web3Context);
  const { connectWallet, web3Auth, address } = web3Context;

  const [status, setStatus] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const { fetch, data, error, isLoading } = useMoralisCloudFunction(
    "getPayments",
    { autoFetch: true }
  );
  const [sendData, setSendData] = useState([]);
  const [requestData, setRequestData] = useState([]);
  const [isUpdated, setIsUpdated] = useState([]);
  const [balance, setBalance] = useState([]);

  const [bal, setBal] = useState();
  const [eth, setEth] = useState();
  const [bsc, setBsc] = useState();
  const [mtk, setMtk] = useState();
  const [avax, setAvax] = useState();
  const [chain, setChain] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getWalletBalence = async () => {
    const networkId = window.ethereum.networkVersion;
    setChain(networkId);

    let web3 = new Web3("https://rinkeby.boba.network");
    let balance = await web3.eth.getBalance(user && user.attributes.ethAddress);
    setBal(ethers.utils.formatUnits(balance, 18));

    let opt = new Web3(`https://ropsten.infura.io/v3/${process.env.REACT_APP_ROPSTEN_KEY}`);
    let add = opt.utils.toChecksumAddress(user && user.attributes.ethAddress);
    let tmetadata = await opt.eth.getBalance(user && user.attributes.ethAddress);
    setEth(ethers.utils.formatUnits(tmetadata, 18));

    const mtk = { chain: "mumbai", address: user.attributes.ethAddress };
    const mtkdata = Moralis.Web3.getAllERC20(mtk).then((res) => {
      setMtk(ethers.utils.formatUnits(res[0].balance, 18));
    });

    let web = new Web3(`https://data-seed-prebsc-1-s1.binance.org:8545`);
    let bscdata = await web.eth.getBalance(user && user.attributes.ethAddress);
    setBsc(ethers.utils.formatUnits(bscdata, 18));

    let options = new Web3(`https://api.avax-test.network/ext/bc/C/rpc`);
    let tokenMetadata = await options.eth.getBalance(user && user.attributes.ethAddress);
    setAvax(ethers.utils.formatUnits(tokenMetadata, 18)); 
  };

  useEffect(() => {
    getWalletBalence();
    setData();
  }, [data, isUpdated, user]);

  useEffect(() => {
    fetch();
  }, [isUpdated, user]);

  async function setData() {
    const paymentData = await JSON.parse(JSON.stringify(data));
    const sended =
      paymentData &&
      paymentData.filter(
        (pay) =>
          pay.type == "send" &&
          (pay.from == user?.attributes.username ||
            pay.to == user?.attributes.username)
      );
    const requested =
      paymentData &&
      paymentData.filter(
        (pay) =>
          pay.type == "request" &&
          (pay.from == user?.attributes.username ||
            pay.to == user?.attributes.username)
      );

    setSendData(sended);
    setRequestData(requested);
  }

  return (
    <Page title="Payments |  TrustifiedNetwork">
      <CreatePaymentModal
        open={handleClickOpen}
        close={handleClose}
        op={open}
        acc={address}
        setIsUpdated={setIsUpdated}
        isUpdated={isUpdated}
      />
      <Container pl={0} pr={0}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Typography variant="h4" gutterBottom>
            Send/Request Payment
          </Typography>
          <Button
            variant="contained"
            onClick={handleClickOpen}
            to="#"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Create Send/Request
          </Button>
        </Stack>
        <Stack
          direction="row"
          alignItems="flex-end"
          justifyContent="flex-end"
          mb={2}
        >
          {
            chain === 80001 && <Button variant="outlined">
              <img
                src="/images/logo1.png"
                width={20}
                height={20}
                alt=""
                style={{ marginRight: "10px" }}
              />{" "}
              {mtk} MATIC
            </Button>
          }
          {
            chain == 3 && <Button variant="outlined">
              <img
                src="/images/eth.png"
                width={20}
                height={20}
                alt=""
                style={{ marginRight: "10px" }}
              />{" "}
              {eth} ETH
            </Button>
          }

          {
            chain == 97 && <Button variant="outlined">
              <img
                src="/images/bnb.png"
                width={20}
                height={20}
                alt=""
                style={{ marginRight: "10px" }}
              />{" "}
              {bsc} BNB
            </Button>
          }
          {
            chain == 28 && <Button variant="outlined">
              <img
                src="/images/boba.png"
                width={20}
                height={20}
                alt=""
                style={{ marginRight: "10px" }}
              />{" "}
              {bal} BOBA
            </Button>
          }

          {
            chain == 43113 && <Button variant="outlined">
              <img
                src="/images/avax.png"
                width={20}
                height={20}
                alt=""
                style={{ marginRight: "10px" }}
              />{" "}
              {avax} AVAX
            </Button>
          }
        </Stack>

        <Stack>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Send" {...a11yProps(0)} />
            <Tab label="Request" {...a11yProps(1)} />
          </Tabs>

          <TabPanel value={value} index={0}>
            <Card>
              <SendTable sendData={sendData} />
            </Card>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Card>
              <RequestTable requestData={requestData} />
            </Card>
          </TabPanel>
        </Stack>
      </Container>
    </Page>
  );
}

export default SendRequest;
