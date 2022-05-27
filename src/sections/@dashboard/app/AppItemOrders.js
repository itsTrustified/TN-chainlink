// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
//
import Iconify from '../../../components/Iconify';
import { useMoralis, useMoralisCloudFunction } from 'react-moralis';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.main
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.warning.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.warning.dark, 0)} 0%, ${alpha(
    theme.palette.warning.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

const TOTAL = 1723315;

export default function AppItemOrders() {
  const {Moralis,user}=useMoralis();
  const [agree,setAgree]= useState(); 
  const { data, error, isLoading } = useMoralisCloudFunction("getAgreements"); 

  const Customer = Moralis.Object.extend("Agreementss");
  const query = new Moralis.Query(Customer);
  const networkId = window.ethereum.networkVersion; 


  useEffect(async()=>{  
    const data = await Moralis.Plugins.covalent?.getTokenBalancesForAddress({
        chainId: networkId,
        address: user && user.attributes.ethAddress,

       }); 
       console.log(data,"balance");
       setAgree(ethers.utils.formatUnits(data.data.items[0].balance, 18)); 
       
   
  },[]);
  
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Iconify icon="gridicons:multiple-users" width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3"  color="#000">{fShortenNumber(agree)} {networkId == 80001 && "MATIC"  || networkId == 3 &&  "ETH"  || networkId == 97 &&  "BNB"  || networkId == 43113 &&  "AVAX"}</Typography>
      <Typography variant="subtitle2"  color="#000" sx={{ opacity: 0.72 }}>
       Your Current Balance
      </Typography>
    </RootStyle>
  );
}
