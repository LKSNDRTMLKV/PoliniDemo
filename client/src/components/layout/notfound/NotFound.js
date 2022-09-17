import { Grid, Paper} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import API from '../../../constants/api/API';
import { MyButton, MyTypography } from '../../custom/previewComponents';
import { LoadingButton } from '@mui/lab';
import Loader from '../loader/Loader';

const NotFound = (props) => {
    return (
    //    <Paper sx={{height:"100vh", pt:16}}>
    //     NOT FOUND 404
    //    </Paper>
    <Grid container maxWidth="xl" m="auto" px={2}>
        <Grid item  sx={{display:"flex",flexFlow:"column wrap"}}>
            <MyTypography 
            variant="h6"
            section="not_found"
            element="content"

            />
            <Link to={API.paths.app.home}>
            <MyButton 
            variant="outlined"
            color="toggledPrimarySecondary"
            section="not_found"
            element="home"
            sx={{ my:2}}
            />
            </Link>
        </Grid>
    </Grid>
    );
};

export default NotFound;