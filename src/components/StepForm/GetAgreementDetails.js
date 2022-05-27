import { Box, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack, TextareaAutosize, TextField } from '@mui/material';
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';
import { AgreementContext } from 'src/context/AgreementContext';

function GetAgreementDetails() {
    const value = useContext(AgreementContext);
    const formdata = value.labelInfo.formData;
    
    return (
        <div>
            <Stack spacing={3} sx={{ margin: '10px' }}>
                <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    id="title"
                    type="title"
                    onChange={value.setFormdata("title")}
                    value={formdata.title}
                />
                <TextareaAutosize
                    fullWidth
                    name="description"
                    id="description"
                    type="text"
                    label="Description"
                    placeholder='Description'
                    aria-label="minimum height"
                    minRows={3} 
                    onChange={value.setFormdata("description")}
                    value={formdata.description}
                /> 
            </Stack>
        </div>
    )
}

export default GetAgreementDetails