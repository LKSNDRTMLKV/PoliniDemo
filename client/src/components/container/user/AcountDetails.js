import React from 'react';
import { Box, Divider, Grid, Typography } from '@mui/material';
import { MyDivider, MyButton } from '../../custom/previewComponents';
import { Link } from 'react-router-dom';
import API from '../../../constants/api/API';

const AcountDetails = ({ TypographyAccount, user, setOnUpdate, setOnDelete }) => {

    return (
        <Grid item md={6} xs={12} sx={{ m: "auto" }}>

            <Grid item xs={12}>
                {TypographyAccount("name", { my: 1.5 }, "h5")}
                <Typography>{user && user.name}</Typography>
                <MyDivider />
            </Grid>

            <Grid item xs={12}>
                {TypographyAccount("email", { my: 1.5 }, "h5")}
                <Typography>{user && user.email}</Typography>
                <MyDivider />
            </Grid>
            <Grid item xs={12}>
                {TypographyAccount("phone", { my: 1.5 }, "h5")}
                <Typography>{user && user.phone}</Typography>
                <MyDivider />
            </Grid>

            {/* <Grid item xs={12}>
                {TypographyAccount("joined", { my: 0.5 }, "h5")}
                <Typography>{user && user.createdAt}</Typography>
                <MyDivider />
            </Grid> */}

            <Grid container sx={{textAlign:"center", justifyContent:"center"}} columnSpacing={4}>
                <Grid item lg={4} xs={12} sx={{my:1, }}>
                    <MyButton 
                    variant="outlined" 
                    section="account" 
                    element="edit" 
                    sx={{width:"100%"}} 
                    onClick={() => setOnUpdate(prevState => !prevState)} />
                </Grid>

                <Grid item lg={4} xs={12} sx={{my:1, }}>
                    <MyButton 
                    variant="outlined" 
                    section="account" 
                    element="orders" 
                    sx={{width:"100%"}} />
                </Grid>

                <Grid item lg={4} xs={12} sx={{my:1, }}>
                    <Link to={API.paths.app.password.update}>
                    <MyButton 
                    variant="outlined" 
                    section="account" 
                    element="change_password" 
                    sx={{width:"100%"}} />
                    </Link>
                </Grid>

                <Grid item lg={4} xs={12} sx={{my:2}}>
                    <MyButton 
                    variant="outlined" 
                    color="error" 
                    section="account" 
                    element="delete"
                    onClick={() => setOnDelete(true)} 
                    sx={{width:"100%", mx:"auto"}}/>
                </Grid>
            </Grid>


        </Grid>
    );
};

export default AcountDetails;