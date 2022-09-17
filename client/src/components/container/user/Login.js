import React, { useState, useEffect, } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../../../constants/api/API';
import { MyTextField } from '../../custom/previewComponents';
import AlertMessage from '../../../messages/AlertMessage';
import { Button, Grid, Icon, IconButton, InputAdornment, Tooltip } from '@mui/material';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import PasswordIcon from '@mui/icons-material/Password';
import EmailIcon from '@mui/icons-material/Email';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Text from '../../custom/Text';
import userActions from '../../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../layout/loader/Loader';
import timeoutHelper from '../../../helpers/timeoutHelper';
import localStorageHelper from '../../../helpers/localStorageHelper';
import Storage from '../../../constants/storage';


const Login = (props) => {

    const dispatch = useDispatch();

    let navigate = useNavigate();
    
    const { error, loading, isAuthenticated, success } = useSelector(state => state.user);
    
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    const {email, password} = credentials;

    const [messageData, setMessageData] = useState({});

    const [validationMessages, setValidationMessages] = useState([]);

    const [passwordVisibility, setPasswordVisibility] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prevState => ({ ...prevState, [name]: value }));
        setMessageData({});
    };

    const handleLogin = () => {
        dispatch(userActions.login(credentials));
    }

    useEffect(() => {
        if (error) {
            setMessageData({ Message: error, HasError: true });
            const reset = () => {
                setMessageData({});
                dispatch(userActions.clearErrors());
            }
            timeoutHelper(reset, 6000)
        }
      
        if(isAuthenticated) {
            navigate(API.paths.app.home);
            localStorageHelper.saveItem(Storage.AUTH, true);
        }
       
        
    }, [dispatch, error, navigate, isAuthenticated])

    return (
        <Grid container
            justifyContent="center"
            alignItems="center"
            sx={{ m: "auto", px: 2 }}
        >
            {/* {loading && <Loader openLoader />} */}

            <AlertMessage {...messageData} />

            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                <Grid item lg={4} md={6} xs={12} sx={{ px: 2 }}>

                    <MyTextField
                        // id="email"
                        label={<Text section="login" element="email" />}
                        required
                        name="email"
                        type="email"
                        value={email}
                        onChange={handleChange}
                        message={validationMessages}

                        inputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <EmailIcon color='toggledPrimarySecondary' />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
            </Grid>



            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                <Grid item lg={4} md={6} xs={12} sx={{ px: 2 }}>

                    <MyTextField
                        // id="password"
                        label={<Text section="login" element="password" />}
                        name="password"
                        value={password}
                        onChange={handleChange}
                        message={validationMessages}
                        required
                        type={passwordVisibility ? "text" : "password"}
                        inputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <PasswordIcon color="toggledPrimarySecondary" />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton onClick={() => setPasswordVisibility(!passwordVisibility)} color="toggledPrimarySecondary">
                                        <Tooltip title={passwordVisibility ? "Hide Password" : "Show Password"} placement="top">
                                            {passwordVisibility ? <VisibilityOff /> : <Visibility />}
                                        </Tooltip>
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
            </Grid>



            <Grid container direction="column" alignItems="center">


                <Grid item lg={4} md={6} xs={12} sx={{ my: 1 }}>
                    <Button variant='outlined' color="toggledPrimarySecondary" onClick={handleLogin}>
                        <Text section="login" element="button" />
                    </Button>


                </Grid>

                <Grid item lg={4} md={6} xs={12} sx={{ my: 1 }}>
                    <Link to={API.paths.app.password.forgot} color="primary">
                        <Button color="toggledPrimarySecondary">
                            <Text section="login" element="forgot" />
                        </Button>

                    </Link>

                </Grid>
                <Grid item lg={4} md={6} xs={12} sx={{ my: 1 }}>
                    <Link to={API.paths.app.register} color="primary">
                        <Button color="toggledPrimarySecondary">
                            <Text section="login" element="register" />
                        </Button>

                    </Link>

                </Grid>
            </Grid>
        </Grid>

    );
};

export default Login;