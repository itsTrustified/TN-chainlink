
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Dialog, DialogContent } from '@mui/material';
import GetChain from 'src/components/StepForm/GetChain';
import GetAgreementDetails from 'src/components/StepForm/GetAgreementDetails';
import GetStackPercent from 'src/components/StepForm/GetStackPercent';
import { AgreementAvaxAddress, AgreementBscAddress, AgreementMumbaiAddress, AgreementRopestenAddress } from 'src/contracts/contract';
import { AgreementAddress } from 'src/contracts/config';
import { AgreementContext } from 'src/context/AgreementContext';

const steps = ['Select Chain', 'Escrow Details', 'Create Agreement'];
 

export default function HorizontalLinearStepper() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set()); 

    const formdatavalue = React.useContext(AgreementContext);
    const formdata = formdatavalue.labelInfo.formData; 
    const btnDisbaled =
    formdata.title.length > 0 &&
    formdata.chain.length > 0 &&
    formdata.description.length > 0 &&
    formdata.price.length > 0 &&
    formdata.stakePercentBuyer.length > 0 &&
    formdata.stakePercentSeller.length > 0 &&
    formdata.buyer.length > 0;  

 
    const isStepOptional = (step) => {
        return step === 1;
    };
    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    }; 
    

    return (
        <React.Fragment>
            <Button
                variant="contained"
                onClick={formdatavalue.handleClickOpen}
                to="#"
            >
                Create Agreement
            </Button>
            <Dialog open={formdatavalue.open} onClose={formdatavalue.handleClose} fullWidth>
                <DialogContent style={{ overflowX: "hidden" }}>
                    <Box sx={{ width: '100%' }}>
                        <Stepper activeStep={activeStep}>
                            {steps.map((label, index) => {
                                const stepProps = {};
                                const labelProps = {};
                                if (isStepOptional(index)) {
                                    labelProps.optional;
                                }
                                if (isStepSkipped(index)) {
                                    stepProps.completed = false;
                                }
                                return (
                                    <Step key={label} {...stepProps}>
                                        <StepLabel {...labelProps}>{label}</StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                        {
                            activeStep === 0 && (
                                <GetChain />
                            )
                        }
                        {
                            activeStep === 1 && (
                                <GetAgreementDetails />
                            )
                        }
                        {
                            activeStep === 2 && (
                                <GetStackPercent />
                            )
                        }
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography sx={{ mt: 2, mb: 1 }}>
                                    All steps completed - you&apos;re finished
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    <Button onClick={handleReset}>Reset</Button>
                                </Box>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Button
                                        color="inherit"
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        sx={{ mr: 1 }}
                                    >
                                        Back
                                    </Button>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    {isStepOptional(activeStep) && (
                                        <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                            Skip
                                        </Button>
                                    )}
                                    {
                                        activeStep === steps.length - 1 ? 
                                        <Button
                                         disabled={!btnDisbaled}
                                         onClick={formdatavalue.createAgreement}
                                         
                                         >
                                          {formdatavalue.loading ? 'Create Agreement...' : 'Create Agreement' }  
                                        </Button> : <Button onClick={handleNext}>
                                            Next
                                        </Button>
                                    }
                                    {/* <Button onClick={handleNext}>
                                        {activeStep === steps.length - 1 ? 'Create Agreement' : 'Next'}
                                    </Button> */}
                                </Box>
                            </React.Fragment>
                        )}
                    </Box>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}







