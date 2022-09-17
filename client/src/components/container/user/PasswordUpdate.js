import React, { useEffect, useState } from 'react';
import { Box, Divider, Grid, SvgIcon, Typography } from '@mui/material';
import { MyDivider, MyTextField, MyButton, MyTypography } from '../../custom/previewComponents';
import { useDispatch, useSelector } from 'react-redux';
import userActions from '../../../actions/userActions';
import Loader from '../../layout/loader/Loader';
import { useNavigate } from 'react-router-dom';
import API from '../../../constants/api/API';
import User from '../../../constants/user';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import timeoutHelper from '../../../helpers/timeoutHelper';
import Text from '../../custom/Text';
// 
// 

const PasswordUpdate = (props) => {
    const [credentials, setCredentials] = useState({
        oldPassword: "",
        newPassword: "",
        comfirmPassword: "",
    });

    const { oldPassword, newPassword, comfirmPassword } = credentials;

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const {error, isUpdated, loading} = useSelector(state => state.account);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prevState => ({ ...prevState, [name]: value }));
    };

    const handlePasswordUpdate = () => {
        dispatch(userActions.updatePassword(credentials));
    }

    useEffect(() => {
        if(error) {
            console.log(error)
        }
        if(isUpdated) {
            dispatch({type: User.UPDATE_PASSWORD_RESET});
            // navigate(API.paths.app.account);

        }
    },[dispatch, error, isUpdated]);

    return (
        <Grid container
            justifyContent="center"
            alignItems="center"
            sx={{ m: "auto", px: 2 }}>


            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                <Grid item lg={4} md={6} xs={12}>
                    <MyTextField
                        section="password"
                        element="old"
                        required
                        type="password"
                        name="oldPassword"
                        value={oldPassword}
                        onChange={handleChange}
                    />
                </Grid>
            </Grid>


            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>

                <Grid item lg={4} md={6} xs={12}>
                    <MyTextField
                        section="password"
                        element="new"
                        required
                        type="password"
                        name="newPassword"
                        value={newPassword}
                        onChange={handleChange}
                    />
                </Grid>
            </Grid>

            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>

                <Grid item lg={4} md={6} xs={12}>
                    <MyTextField
                        section="password"
                        element="comfirm"
                        value={comfirmPassword}
                        required
                        type="password"
                        name="comfirmPassword"
                        onChange={handleChange}
                    />
                </Grid>
            </Grid>

            <Grid item lg={4} md={6} xs={12} sx={{display:"flex", my: 2, justifyContent:"center"}}>

                <MyButton section="password" element="save" variant="outlined" onClick={handlePasswordUpdate} sx={{px:4}}  />
            </Grid>


        </Grid>
    );
};

export default PasswordUpdate;