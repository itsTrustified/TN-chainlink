import { Box, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack, TextField } from '@mui/material';
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';
import { AgreementContext } from 'src/context/AgreementContext';

function GetStackPercent(props) {
    const value = useContext(AgreementContext);
    const formdata = value.labelInfo.formData;
    const [creator, setCreator] = useState("buyer");
    const [buyer, setBuyer] = useState("");
    const [seller, setSeller] = useState("");
    const [chain, setChain] = useState('');

    const handleChange = (event) => {
        setCreator(event.target.value);
    };
    return (
        <div>
            <Stack spacing={3} sx={{ margin: '10px' }}>
            <TextField
                fullWidth
                name="price"
                id="price"
                type="number"
                label={ formdata.chain === 'binance' &&  "Price (in BNB)" ||
                 formdata.chain === 'mumbai' &&  "Price (in MATIC)" ||
                 formdata.chain === 'ropsten' &&  "Price (in ETH)" ||
                 formdata.chain === 'avalanche' &&  "Price (in AVAX)" ||
                 formdata.chain === '' &&  "Price" 
                 }  
                 onChange={value.setFormdata("price")}
                    value={formdata.price}
              />
              <TextField
                fullWidth
                name="stakePercentBuyer"
                id="stakePercentBuyer"
                type="number"
                label="Stake Percentage Buyer %"
                onChange={value.setFormdata("stakePercentBuyer")}
                value={formdata.stakePercentBuyer}
              />
              <TextField
                fullWidth
                name="stakePercentSeller"
                id="stakePercentSeller"
                type="number"
                label="Stake Percentage Seller %"
                onChange={value.setFormdata("stakePercentSeller")}
                value={formdata.stakePercentSeller}
              />
            </Stack>
        </div>
    )
}

export default GetStackPercent