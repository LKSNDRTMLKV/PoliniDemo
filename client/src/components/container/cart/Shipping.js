import { Grid, InputAdornment } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { MyTextField } from '../../custom/previewComponents';
import HomeIcon from '@mui/icons-material/Home';
import PhoneIcon from '@mui/icons-material/Phone';
import CommentIcon from '@mui/icons-material/Comment';
import localStorageHelper from '../../../helpers/localStorageHelper';
import Storage from '../../../constants/storage';


const Shipping = ({shippingInfo, setShippingInfo, validationMessages}) => {

    const { city, municipality, address, postal,  message, } = shippingInfo;
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setShippingInfo(prevState => ({...prevState, [name]: value}));
    }

    return (
        <Grid container sx={{minHeight:"60vh"}}>

            <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-start" }}>
                <Grid item lg={4} md={6} xs={12}>
                    <MyTextField
                        label="City"
                        required
                        autoFocus
                        name="city"
                        value={city}
                        onChange={handleChange}
                        message={validationMessages}

                        inputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <HomeIcon color='toggledPrimarySecondary' />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
            </Grid>
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-start" }}>
                <Grid item lg={4} md={6} xs={12}>
                    <MyTextField
                        label="Municipality"
                        required
                        name="municipality"
                        value={municipality}
                        onChange={handleChange}
                        message={validationMessages}

                        inputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <HomeIcon color='toggledPrimarySecondary' />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
            </Grid>
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-start" }}>
                <Grid item lg={4} md={6} xs={12}>
                    <MyTextField
                        label="Address"
                        required
                        name="address"
                        type="address"
                        value={address}
                        onChange={handleChange}
                        message={validationMessages}

                        inputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <HomeIcon color='toggledPrimarySecondary' />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
            </Grid>
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-start" }}>
                <Grid item lg={4} md={6} xs={12}>
                    <MyTextField
                        label="Postal"
                        required
                        name="postal"
                        value={postal}
                        onChange={handleChange}
                        message={validationMessages}

                        inputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <HomeIcon color='toggledPrimarySecondary' />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
            </Grid>

            {/* <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-start" }}>
                <Grid item lg={4} md={6} xs={12}>
                    <MyTextField
                        label="Phone"
                        required
                        name="phone"
                        type="tel"
                        value={phone}
                        onChange={handleChange}
                        message={validationMessages}
                        inputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <PhoneIcon color='toggledPrimarySecondary' />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
            </Grid> */}
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-start" }}>
                <Grid item lg={4} md={6} xs={12}>
                    <MyTextField
                        label="Message (Optional)"
                        name="message"
                        value={message}
                        onChange={handleChange}
                        message={validationMessages}
                        multiline={3}
                        inputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <CommentIcon color='toggledPrimarySecondary' />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
            </Grid>

        </Grid>
    );
};

export default Shipping;