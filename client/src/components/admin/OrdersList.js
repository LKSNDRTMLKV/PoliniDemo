import { Grid, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import userActions from '../../actions/userActions';
import { MyDivider } from '../custom/previewComponents';

const OrdersList = (props) => {
    return (
        <Grid container maxWidth="xl" mx="auto" px={2}>
            <Typography variant="h4">Charts</Typography>
            <MyDivider />
            {/* <Grid item>
                <LineElement data={lineState} />
            </Grid> */}
            {/* <Grid item>
                <Doughnut data={doughnutState} />
            </Grid> */}
        </Grid>
    );
};

export default OrdersList;