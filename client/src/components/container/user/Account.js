import { Box, Button, Divider, Grid, Modal, Skeleton, Typography } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import userActions from '../../../actions/userActions';
import API from '../../../constants/api/API';
import Storage from '../../../constants/storage';
import localStorageHelper from '../../../helpers/localStorageHelper';
import timeoutHelper from '../../../helpers/timeoutHelper';
import AlertMessage from '../../../messages/AlertMessage';
import { MyButton, MyDivider, MyTypography } from '../../custom/previewComponents';
import Loader from '../../layout/loader/Loader';
import AcountDetails from './AcountDetails';
import AcountDetailsUpdate from './AcountDetailsUpdate';

const Account = (props) => {

    const { isAuthenticated, user, loading, } = useSelector(state => state.user);

    const [messageData, setMessageData] = useState({});

    const dispatch = useDispatch();

    const [onUpdate, setOnUpdate] = useState(false);

    const [onPasswordChange, setOnPasswordChange] = useState();

    const [onDelete, setOnDelete] = useState(false);

    const TypographyAccount = (element, sx, variant) => (
        <MyTypography section="account" variant={variant} element={element} sx={sx} />
    );

    const handleDeleteAccount =() => {
        dispatch(userActions.deleteAccount());
        setOnDelete(false);
        localStorageHelper.saveItem(Storage.AUTH, false);

    };

    const handleDeleteClose = () => {
        setOnDelete(false);
    }

    useEffect(() => {
        // timeoutHelper(setMessageData({}), 5000);
    }, [onUpdate, onDelete])


    return (
        <Grid container maxWidth="xl" mx="auto" p={2}>
            <AlertMessage {...messageData} />

            <Grid item xs={12}>
                {TypographyAccount("profile", {}, "h4")}
                <MyDivider />
            </Grid>


            {!onUpdate &&
                <Grid item md={6} xs={12} sx={{ display: "flex", my: 2 }}>

                    {loading !== undefined && !loading ?
                        <Box component="img" src={user && user.avatar.url} alt="avatar"
                            sx={{ width: "250px", height: "250px", border: "2px solid", borderRadius: "50%", objectFit: "cover", mx: "auto" }} />

                        : <Skeleton sx={{ width: "250px", height: "250px", borderRadius: "50%", mx: "auto", transform: "scale(1,1)" }} />}

                </Grid>
            }


            {onUpdate ?
                <AcountDetailsUpdate
                    setOnUpdate={setOnUpdate}
                    setMessageData={setMessageData} /> :
                <AcountDetails
                    TypographyAccount={TypographyAccount}
                    user={user}
                    setOnUpdate={setOnUpdate}
                    setOnDelete={setOnDelete} />}

            {onDelete &&
                <Modal open={onDelete} onClose={handleDeleteClose} >
                   
                    <Box sx={{
                        position:"absolute", 
                        top:"15%", 
                        left:"50%",
                        transform:"translate(-50%, -50%)",
                        backgroundColor:"#000"
                    }}>
                        Are you sure you want to delete ?
                        <Button color="error" onClick={handleDeleteAccount}>Yes</Button>
                        <Button color="primary" onClick={handleDeleteClose}>No</Button>
                    </Box>
                
                    
                </Modal>}

        </Grid>

    );
};

export default Account;