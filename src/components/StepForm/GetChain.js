import { Box, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack, TextField } from '@mui/material';
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';
import { AgreementContext } from 'src/context/AgreementContext';

function GetChain() {
    const value = useContext(AgreementContext);
    const formdata = value.labelInfo.formData;
    const [creator, setCreator] = useState("");
    const [buyer, setBuyer] = useState("");
    const [seller, setSeller] = useState("");
    const [chain, setChain] = useState('');

    const handleChange = (event) => {
        setCreator(event.target.value);
    };

    return (
        <div>
            <Stack spacing={3} sx={{ margin: '20px' }}>
                <FormControl>
                    <FormLabel id="demo-controlled-radio-buttons-group">
                        I am a
                    </FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={formdata.buyer}
                        onChange={handleChange}
                    >
                        <Stack
                            direction="row"
                            justifyContent="start"
                            alignItems="center"
                            spacing={2}
                        >
                            <FormControlLabel
                                value="buyer"
                                control={<Radio />}
                                label="Buyer"
                                onChange={value.setFormdata("buyer")}
                            />
                            <FormControlLabel
                                value="seller"
                                control={<Radio />}
                                label="Seller"
                                onChange={value.setFormdata("buyer")}
                            />
                        </Stack>
                    </RadioGroup>
                </FormControl>

                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth >
                        <FormLabel id="demo-controlled-radio-buttons-group">Choose Your Network</FormLabel>
                        <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={formdata.chain} 
                        onChange={(e) => {
                            const networkId = window.ethereum.networkVersion;
                            if (e.target.value == 'bsc' && networkId !== '97') {
                                toast.error("Please connect to the BSC Testnet network in Metamask to continue!");
                            } else if (e.target.value == 'mumbai' && networkId !== '80001') {
                                toast.error("Please connect to the Polygon Mumbai Testnet network in Metamask to continue!");
                            } else if (e.target.value == 'ropsten' && networkId !== '3') {
                                toast.error("Please connect to the Ropsten Network in Metamask to continue!");
                            }   else if (e.target.value == 'avalanche' && networkId !== '43113') {
                                toast.error("Please connect to the AVAX FUJI network in Metamask to continue!");
                            }
                            setChain(e.target.value) 
                        }
                        }
                    >
                        <Stack
                            direction="row"
                            justifyContent="start"
                            alignItems="center"
                            spacing={2}
                        >
                            <FormControlLabel
                                value="mumbai"
                                control={<Radio />}
                                label="Mumbai"
                                onChange={value.setFormdata("chain")}
                            />
                            <FormControlLabel
                                value="ropsten"
                                control={<Radio />}
                                label="Ropsten"
                                onChange={value.setFormdata("chain")}
                            />
                             <FormControlLabel
                                value="avalanche"
                                control={<Radio />}
                                label="Avalanche"
                                onChange={value.setFormdata("chain")}
                            />
                             <FormControlLabel
                                value="bsc"
                                control={<Radio />}
                                label="BSC"
                                onChange={value.setFormdata("chain")}
                            />
                        </Stack>
                        </RadioGroup>
                        {/* <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={chain}
                            label="Chain"
                            onChange={(e) => {
                                const networkId = window.ethereum.networkVersion;
                                if (e.target.value == 'Binance' && networkId !== '97') {
                                    toast.error("Please connect to the BSC Testnet network in Metamask to continue!");
                                } else if (e.target.value == 'Polygon' && networkId !== '80001') {
                                    toast.error("Please connect to the Polygon Mumbai Testnet network in Metamask to continue!");
                                } else if (e.target.value == 'Ropsten' && networkId !== '3') {
                                    toast.error("Please connect to the Ropsten Network in Metamask to continue!");
                                } else if (e.target.value == 'Boba' && networkId !== '28') {
                                    toast.error("Please connect to the BOBA network in Metamask to continue!");
                                } else if (e.target.value == 'Avax' && networkId !== '43113') {
                                    toast.error("Please connect to the AVAX FUJI network in Metamask to continue!");
                                }
                                setChain(e.target.value) 
                            }
                            }
                        > 
                            <MenuItem value="Binance" onChange={value.setFormdata("chain")} >BSC</MenuItem>
                            <MenuItem value="Polygon" onChange={value.setFormdata("chain")} >Polygon Mumbai</MenuItem>
                            <MenuItem value="Ropsten" onChange={value.setFormdata("chain")} >Ropsten</MenuItem>
                            <MenuItem value="Avax" onChange={value.setFormdata("chain")} >Avalanche FUJI</MenuItem>
                        </Select> */}
                    </FormControl>
                </Box>
                {creator === "buyer" ? (
                    <TextField
                        fullWidth
                        name="sellerAddress"
                        id="sellerAddress"
                        type="text"
                        label="SellerAddress"
                        required
                        onChange={value.setFormdata("sellerAddress")}
                        value={formdata.sellerAddress}
                    />
                ) : (
                    <TextField
                        fullWidth
                        name="buyerAddress"
                        id="buyerAddress"
                        type="text"
                        label="BuyerAddress"
                        required
                        onChange={value.setFormdata("buyerAddress")}
                        value={formdata.buyerAddress}
                    />
                )}
            </Stack>
        </div>
    )
}

export default GetChain