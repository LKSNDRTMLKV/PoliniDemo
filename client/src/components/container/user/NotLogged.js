import { Grid } from '@mui/material';
import React from 'react';

const NotLogged = (props) => {
    return (
       <Grid container maxWidth="xl" m="auto" p={2}>
            <Grid item xs={12}>
                Please log in 
            </Grid>
       </Grid>
    );
};

export default NotLogged;