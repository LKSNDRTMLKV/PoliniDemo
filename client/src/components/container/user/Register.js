import React, { useState, useEffect, } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../../../constants/api/API';
import { MyButton, MyTextField } from '../../custom/previewComponents';
import AlertMessage from '../../../messages/AlertMessage';
import { Button, Grid, Icon, IconButton, InputAdornment, InputLabel, Tooltip } from '@mui/material';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import PasswordIcon from '@mui/icons-material/Password';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Text from '../../custom/Text';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useDispatch, useSelector } from 'react-redux';
import userActions from '../../../actions/userActions';
import Loader from '../../layout/loader/Loader';
import localStorageHelper from '../../../helpers/localStorageHelper';
import Storage from '../../../constants/storage';


const Register = ({location, history}) => {

    const dispatch = useDispatch();
    const { error, loading, isAuthenticated } = useSelector(state => state.user);
  

    const [credentials, setCredentials] = useState({
        name: "",
        email:"",
        phone: "",
        password: "",
        avatar:"",
    });

    const {name, email, phone, password, avatar} = credentials;

    const [messageData, setMessageData] = useState({});

    const [validationMessages, setValidationMessages] = useState([]);

    const [passwordVisibility, setPasswordVisibility] = useState(false);

    let navigate = useNavigate();

    const handleNavigation = () => {
        navigate(API.paths.app.home);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prevState => ({ ...prevState, [name]: value }));
        setMessageData({});
    };

    const handleAvatar = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState === 1 || reader.readyState === 2) {
                setCredentials(prevState => ({...prevState, avatar: reader.result}));
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    const handleRegister = () => {
        dispatch(userActions.register(credentials));
        if(error){
            setMessageData({Message:error, HasError:true})
        }
        else {
            localStorageHelper.saveItem(Storage.AUTH, true);
        }
    }

    useEffect(() => {
        isAuthenticated && navigate(API.paths.app.home);
    }, [dispatch, error, isAuthenticated])

    return (
        <Grid container
            justifyContent="center"
            alignItems="center"
            sx={{ m: "auto", px:2 }}
        >
            {loading && <Loader openLoader />}

            <AlertMessage {...messageData} />

            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                <Grid item lg={4} md={6} xs={12} >

                    <MyTextField

                       
                        label={<Text section="register" element="name" />}
                        name="name"
                        value={name}
                        onChange={handleChange}
                        message={validationMessages}
                        required
                        inputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <AccountCircle color='toggledPrimarySecondary' />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
            </Grid>

            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                <Grid item lg={4} md={6} xs={12} >

                    <MyTextField

                        
                        label={<Text section="login" element="email" />}
                        name="email"
                        type="email"
                        value={email}
                        onChange={handleChange}
                        message={validationMessages}
                        required
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
                <Grid item lg={4} md={6} xs={12} >

                    <MyTextField

                       
                        label={<Text section="register" element="phone" />}
                        name="phone"
                        type="tel"
                        value={phone}
                        onChange={handleChange}
                        message={validationMessages}
                        required
                        inputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <PhoneIcon color='toggledPrimarySecondary' />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
            </Grid>



            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                <Grid item lg={4} md={6} xs={12}>

                    <MyTextField

                        
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

            <Grid item lg={4} md={6} xs={12}>

            <Button variant='outlined' component="label" color="toggledPrimarySecondary" sx={{width:"100%",my:2, border:"1px solid ", position:"relative",}}>
                <AddAPhotoIcon color="toggledPrimarySecondary" sx={{mr:"auto",mb:1.5, mt:1}} />
                <input 
                accept='image/*'
                type="file"
                hidden
                onChange={handleAvatar}
                />
              
                <Text section="register" element={avatar === "" ? "avatar" : "avatar_success"}/>
                
            </Button>

            {/* <MyTextField 
            name="avatar"
            type="file"
            onChange={handleAvatar}
            value={avatar.url}
            /> */}
    
            </Grid>



            <Grid container direction="column" alignItems="center">


                <Grid item lg={4} md={6} xs={12} sx={{ my: 2 }}>
                    <Button variant='outlined' color="toggledPrimarySecondary" onClick={handleRegister}>
                        <Text section="register" element="button" />
                    </Button>


                </Grid>

                <Grid item lg={4} md={6} xs={12}>
                    <Link to={API.paths.app.login} color="primary">
                        <Button color="toggledPrimarySecondary">
                            <Text section="register" element="login" />
                        </Button>

                    </Link>

                </Grid>
            </Grid>
        </Grid>

    );
};

export default Register;