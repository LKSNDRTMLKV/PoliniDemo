import { Box, Grid, Step, StepLabel, Stepper } from '@mui/material';
import React, { useState, useMemo, useEffect } from 'react';
import { MyButton, MyTypography } from '../../custom/previewComponents';
import Shipping from './Shipping';
import Payment from './Payment';
import ComfirmOrder from './ComfirmOrder';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentIcon from '@mui/icons-material/Payment';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import DoneIcon from '@mui/icons-material/Done';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import localStorageHelper from '../../../helpers/localStorageHelper';
import Storage from '../../../constants/storage';

const Checkout = (props) => {
    const [activeStep, setActiveStep] = useState(1);

    const [shippingInfo, setShippingInfo] = useState({
        city: "",
        municipality: "",
        address: "",
        postal: "",
        phone: "",
        message: "",
    })

    const [creditCardInfo, setCreditCardInfo] = useState({
        ccn: "",
        cch: "",
        expirationMM: "",
        expirationYY: "",
        cvv: "",
    })

    const [validationMessages, setValidationMessages] = useState({});

    const TypographyCheckout = (element, variant, sx) => {
        return <MyTypography section="checkout" element={element} variant={variant} sx={sx} />
    }

    const [steps, setSteps] = useState([
        {
            label: TypographyCheckout("shipping"),
            icon: <LocalShippingIcon color="toggledPrimarySecondary"/>,
        },
        {
            label: TypographyCheckout("payment"),
            icon: <PaymentIcon color="toggledPrimarySecondary"/>,
        },
        {
            label: TypographyCheckout("comfirm"),
            icon: <LibraryAddCheckIcon color="toggledPrimarySecondary"/>,
        },
    ]);

    const handlePrevStepper = () => {
        if (activeStep > 0) {
            setActiveStep(prevState => prevState - 1);
        }
    }
    const handleNextStepper = () => {
        if (activeStep < 2) {
            setActiveStep(prevState => prevState + 1);
        }
        if(activeStep === 0) {
            if(validationMessages === {}) {
                localStorageHelper.saveItem(Storage.SHIPPING_INFO, shippingInfo);
            }
        }
    }

    useEffect(() => {
        // localStorageHelper.exists(Storage.SHIPPING_INFO) &&
        // setShippingInfo(localStorageHelper.getItem(Storage.SHIPPING_INFO));
        // localStorage.setItem(Storage.CHECKOUT_STEP, parseInt(activeStep));
    },[]);

    // useMemo(() =>{
        
    // })

    return (
        <Grid container maxWidth="xl" sx={{ mx: "auto", p: 2 }}>
            <Grid item xs={12} sx={{ mb:2}}>
{/* 
                <Stepper color="error" activeStep={activeStep}>
                    <Step>
                        <StepLabel >
                            <LocalShippingIcon />
                        </StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>
                            <PaymentIcon />
                        </StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>
                            <LibraryAddCheckIcon />
                        </StepLabel>
                    </Step>
                </Stepper> */}

                <Stepper activeStep={activeStep}>
                    {steps.map((item, idx) => (
                        <Step key={idx} 
                        active={activeStep === idx}
                        // completed={activeStep >= idx}
                        onClick={() => setActiveStep(idx)}
                        sx={{cursor:"pointer"}}
                        >
                            <StepLabel
                            icon={activeStep <= idx ? item.icon : <DoneOutlineIcon color="toggledPrimarySecondary" />}
                            >
                                {item.label}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>


            </Grid>

                {activeStep === 0 && <Shipping 
                shippingInfo={shippingInfo} 
                setShippingInfo={setShippingInfo} 
                validationMessages={validationMessages}
                setValidationMessages={setValidationMessages}/>}

                {activeStep === 1 && <Payment 
                creditCardInfo={creditCardInfo}
                setCreditCardInfo={setCreditCardInfo}
                />}

                {activeStep === 2 && <ComfirmOrder />}
               

                <Grid item xs={12} sx={{display:"flex", justifyContent:"flex-end", }}>
                    <MyButton variant="outlined" text="prev" onClick={handlePrevStepper} sx={{mr:2, px:4}} />
                    <MyButton variant="outlined" text="next" onClick={handleNextStepper} sx={{ml:2, px:4}} />
                </Grid>
                


        </Grid>
    );
};

export default Checkout;