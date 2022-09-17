import { Grid, InputAdornment, TextField } from '@mui/material';
import React, { useState } from 'react';
import { MySelect, MyTextField } from '../../custom/previewComponents';
import HomeIcon from '@mui/icons-material/Home';
import PhoneIcon from '@mui/icons-material/Phone';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import NumbersIcon from '@mui/icons-material/Numbers';

const Payment = ({creditCardInfo, setCreditCardInfo}) => {

   const { ccn, cch, expirationMM, expirationYY, cvv, } = creditCardInfo;

    const currentYear = parseInt(new Date().getFullYear().toString().slice(-2))

    const [validationMessages, setValidationMessages] = useState({});

    const handleChange = (e) => {
        const { name, value, id } = e.target;
        setCreditCardInfo(prevState => ({ ...prevState, [name]: value }));
    }

    const months = Array.from({length:12}, (e, i) => (
        new Date(null, i + 1, null).toLocaleDateString("en", {month:"short"})
    ));

    const years = Array.from({length:10}, (e, i) => (
        new Date(i + currentYear + 1, null, null).toLocaleDateString("en", {year:"2-digit"})
    ));

    return (
        <Grid container sx={{minHeight:"60vh"}}>

            

            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                <Grid item lg={4} md={6} xs={12}>
                    <MyTextField
                        label="Card Number"
                        required
                        name="ccn"
                        value={ccn}
                        type="tel"
                        inputMode="numeric"
                        autoComplete="cc-number"
                        onChange={handleChange}
                        inputProps={{
                            pattern:"^(?:4[0-9]{12}(?:[0-9]{3})?"
                        }}
                        placeHolder="XXXX XXXX XXXX XXXX"
                        message={validationMessages}
                        icon={<CreditCardIcon color='toggledPrimarySecondary' />}
                    />
                </Grid>
            </Grid>

            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                <Grid item lg={4} md={6} xs={12}>
                    <MyTextField
                        label="Card Holder"
                        required
                        name="cch"
                        value={cch}
                        onChange={handleChange}
                        message={validationMessages}
                        icon={<CreditCardIcon color='toggledPrimarySecondary' />}

                    />
                </Grid>
            </Grid>
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                <Grid item lg={4} md={6} xs={12}>

                    <MySelect 
                    fullWidth
                    required
                    labelId="expirationMM"
                    label="Expiration MM"
                    id="expirationMM"
                    name="expirationMM"
                    value={expirationMM}
                    menuItems={months}
                    onChange={handleChange}
                    icon={<CreditCardIcon color="toggledPrimarySecondary" />}

                    />
                </Grid>
            </Grid>
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                <Grid item lg={4} md={6} xs={12}>
                 
                     <MySelect 
                    fullWidth
                    required
                    labelId="expirationYY"
                    label="Expiration YY"
                    id="expirationYY"
                    name="expirationYY"
                    value={expirationYY}
                    menuItems={years}
                    onChange={handleChange}
                    icon={<CreditCardIcon color="toggledPrimarySecondary" />}

                    />
                </Grid>
            </Grid>
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                <Grid item lg={4} md={6} xs={12}>
                    <MyTextField
                        label="CVV"
                        required
                        name="cvv"
                        value={cvv}
                        type="tel"
                        onChange={handleChange}
                        message={validationMessages}
                        icon={<CreditCardIcon color="toggledPrimarySecondary" />}

                    />
                </Grid>
            </Grid>

    

        </Grid>
    );
};

export default Payment;